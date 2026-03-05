import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { fetchTheyyamEvents } from "./server/theyyam.js";
import { fetchTemplesFromTravelKannur, fetchTemplesFromWiki } from "./server/temples.js";
import { buildExplorePlaces, getExplorePlaceById } from "./server/explore.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5174;

app.use(express.json());
app.get("/api/theyyam", async (req, res) => {
  try {
    const { start, end } = req.query;
    const events = await fetchTheyyamEvents({ startDate: start, endDate: end });
    res.json({
      strict: true,
      sources: [
        {
          name: "DTPC Kannur",
          url: "https://www.dtpckannur.com/theyyam-calendar",
        },
        {
          name: "Kerala Tourism Theyyam Calendar",
          url: "https://www.keralatourism.org/theyyamcalendar/index.php",
        },
      ],
      events,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch calendar data" });
  }
});

app.get("/api/temples", async (req, res) => {
  try {
    const [wikiTemples, travelTemples] = await Promise.all([
      fetchTemplesFromWiki(),
      fetchTemplesFromTravelKannur(),
    ]);
    const merged = new Map();
    [...wikiTemples, ...travelTemples].forEach((item) => {
      if (!merged.has(item.name)) merged.set(item.name, item);
    });
    res.json({
      sources: [
        { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Places_of_worship_in_Kannur_district" },
        { name: "Travel Kannur", url: "https://travelkannur.com/temple-list/" },
      ],
      items: Array.from(merged.values()),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch temples" });
  }
});

app.get("/api/explore", (req, res) => {
  try {
    const items = buildExplorePlaces();
    return res.json({ items });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch explore places" });
  }
});

app.get("/api/explore/:id", (req, res) => {
  try {
    const item = getExplorePlaceById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Place not found" });
    }
    return res.json({ item });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch place detail" });
  }
});

app.post("/api/distances", async (req, res) => {
  try {
    const { origin, destinations } = req.body || {};
    if (!origin || !destinations || destinations.length === 0) {
      return res.status(400).json({ error: "Missing origin or destinations" });
    }
    const apiKey = process.env.ORS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "ORS_API_KEY not set" });
    }

    const locations = [
      [origin.lng, origin.lat],
      ...destinations.map((dest) => [dest.lng, dest.lat]),
    ];
    const body = {
      locations,
      metrics: ["distance"],
      sources: [0],
      destinations: destinations.map((_, index) => index + 1),
    };

    const response = await fetch("https://api.openrouteservice.org/v2/matrix/driving-car", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: "ORS request failed", details: text });
    }

    const data = await response.json();
    const distances = data.distances?.[0] || [];
    const result = {};
    destinations.forEach((dest, index) => {
      const meters = distances[index];
      if (typeof meters === "number") {
        result[dest.id] = Math.round((meters / 1000) * 10) / 10;
      }
    });

    return res.json({ distances: result });
  } catch (error) {
    return res.status(500).json({ error: "Failed to calculate distances" });
  }
});

app.get("/api/place-rating", async (req, res) => {
  try {
    const query = req.query.query?.toString().trim();
    if (!query) {
      return res.status(400).json({ error: "Missing query" });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ error: "GOOGLE_PLACES_API_KEY not set" });
    }

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query
    )}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.status === "REQUEST_DENIED") {
      return res.status(500).json({ error: "Google Places request failed", details: data });
    }

    const result = data.results?.[0];
    if (!result) {
      return res.json({ rating: null, userRatingsTotal: null });
    }

    return res.json({
      rating: result.rating ?? null,
      userRatingsTotal: result.user_ratings_total ?? null,
      name: result.name ?? null,
      placeId: result.place_id ?? null,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch place rating" });
  }
});

const distDir = path.join(__dirname, "dist");
app.use(express.static(distDir));

app.get("*", (req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Kannur AI server running on port ${port}`);
});
