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
const placeImagesCache = new Map();

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

app.get("/api/place-images", async (req, res) => {
  try {
    const query = req.query.query?.toString().trim();
    if (!query) {
      return res.status(400).json({ error: "Missing query" });
    }

    const cacheKey = query.toLowerCase();
    const now = Date.now();
    const cached = placeImagesCache.get(cacheKey);
    if (cached && now - cached.ts < 24 * 60 * 60 * 1000) {
      return res.json({ items: cached.items });
    }

    const searchTerms = [
      `${query} Kannur`,
      `${query} Kerala`,
      query,
    ];

    const collected = [];
    for (const term of searchTerms) {
      if (collected.length >= 4) break;
      const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=10&gsrsearch=${encodeURIComponent(
        term
      )}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1400&origin=*`;

      const response = await fetch(url);
      if (!response.ok) continue;
      const data = await response.json();
      const pages = Object.values(data?.query?.pages || {});

      for (const page of pages) {
        if (collected.length >= 4) break;
        const info = page?.imageinfo?.[0];
        if (!info?.url) continue;
        if (!/\.(jpe?g|png|webp)$/i.test(info.url)) continue;
        const already = collected.some((item) => item.url === info.url);
        if (already) continue;

        const artist = info?.extmetadata?.Artist?.value
          ?.replace(/<[^>]+>/g, "")
          ?.trim();
        const license = info?.extmetadata?.LicenseShortName?.value?.trim();
        const credit = [artist, license].filter(Boolean).join(" · ") || "Wikimedia Commons";

        collected.push({
          url: info.thumburl || info.url,
          alt: page.title?.replace(/^File:/, "") || `${query} image`,
          credit,
          creditUrl: info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`,
        });
      }
    }

    const items = collected.slice(0, 4);
    placeImagesCache.set(cacheKey, { ts: now, items });
    return res.json({ items });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch place images" });
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
