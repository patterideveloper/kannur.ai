import { buildExplorePlaces, getExplorePlaceById } from "./explore.js";
import { getAutomobileById, getAutomobiles } from "./automobiles.js";
import { events, personalities } from "../src/data/extras.js";
import { restaurants, institutions } from "../src/data/localDirectory.js";
import { hospitals } from "../src/data/hospitals.js";
import { getResorts } from "./resorts.js";

const BASE = "https://kannur.io";
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
const page = (title, description, items = [], image = "/og-image.svg") => ({ title, description, items, image });
const placeItems = buildExplorePlaces();
const allPlaces = placeItems.map((place) => ({ name: place.name, path: `/explore/place/${place.id}`, description: place.description }));
const simpleItems = (items) => items.map((item) => ({ name: item.name, description: item.description }));
const staticPages = {
  "/": page("Kannur Tourism: Beaches, Theyyam & Places to Visit | Kannur.io", "Explore Kannur, Kerala: beaches, Theyyam rituals, heritage, local food, resorts and practical travel information. A bilingual guide to North Malabar.", [
    { name: "Explore places in Kannur", path: "/explore" }, { name: "Theyyam calendar", path: "/theyyam" }, { name: "Kannur beaches", path: "/explore/beaches" }, { name: "Restaurants in Kannur", path: "/eats" }, { name: "Resorts and stays", path: "/resorts" }, { name: "Plan a day in Kannur", path: "/plan" },
  ], "/images/hero/kannur_premium-1200.jpg"),
  "/explore": page("Places to Visit in Kannur: Beaches, Forts & Temples | Kannur.io", "Browse Kannur's beaches, historic forts, temples, islands, hills and local shopping places, with photos and map links.", allPlaces),
  "/theyyam": page("Theyyam Calendar in Kannur & North Malabar | Kannur.io", "Browse upcoming Theyyam rituals by month and year in Kannur and nearby districts. Confirm dates with each shrine before visiting."),
  "/plan": page("Plan a Day in Kannur | Kannur.io", "Build a day trip around Kannur's beaches, heritage, nature, Theyyam culture and local food."),
  "/resorts": page("Resorts and Stays in Kannur | Kannur.io", "Find beach resorts, homestays and hill retreats in Kannur and nearby Kasaragod, with locations and map directions.", simpleItems(getResorts())),
  "/eats": page("Restaurants and Local Food in Kannur | Kannur.io", "Explore Kannur restaurants, Thalassery biryani, seafood and Malabar food stops.", simpleItems(restaurants)),
  "/education": page("Colleges and Schools in Kannur | Kannur.io", "Find universities, colleges and educational institutions across Kannur district.", simpleItems(institutions)),
  "/events": page("Festivals and Annual Events in Kannur | Kannur.io", "Discover Kannur's annual festivals, Theyyam season and cultural events.", simpleItems(events)),
  "/people": page("Famous People from Kannur | Kannur.io", "Meet notable artists, leaders, athletes and public figures from Kannur district.", simpleItems(personalities)),
  "/hospitals": page("Hospitals and Healthcare in Kannur | Kannur.io", "Find private, public and specialist hospitals across Kannur district.", simpleItems(hospitals)),
  "/temples": page("Temples and Pilgrimage in Kannur | Kannur.io", "Explore Kannur temples and places of worship, with locations and travel details.", allPlaces.filter((item) => item.path.includes("/place/temple-"))),
  "/automobiles": page("Automobile Showrooms in Kannur | Kannur.io", "Find car and motorcycle brands and showroom locations in Kannur district."),
  "/directory": page("Kannur Local Directory | Kannur.io", "Useful local places and services across Kannur district."),
};
const filters = {
  beaches: ["beach", "Beaches"], heritage: ["heritage", "Heritage"], hills: ["hill", "Hills"], wildlife: ["wildlife", "Wildlife"], nature: ["nature", "Nature"], islands: ["island", "Islands"], shopping: ["shopping", "Shopping"], temples: ["temple", "Temples"], churches: ["church", "Churches"], mosques: ["mosque", "Mosques"],
};

export function getSeoPage(pathname) {
  const path = decodeURIComponent(pathname).replace(/\/$/, "") || "/";
  if (staticPages[path]) return staticPages[path];
  const filter = path.match(/^\/explore\/([a-z-]+)$/)?.[1];
  if (filter && filters[filter]) {
    const [tag, name] = filters[filter];
    return page(`${name} in Kannur | Kannur.io`, `Discover ${name.toLowerCase()} in Kannur, Kerala, with photos, local details and map links.`, placeItems.filter((place) => place.tags?.includes(tag)).map((place) => ({ name: place.name, description: place.description, path: `/explore/place/${place.id}` })));
  }
  const placeId = path.match(/^\/explore\/place\/([a-z0-9-]+)$/)?.[1];
  if (placeId) {
    const place = getExplorePlaceById(placeId);
    if (!place) return null;
    return page(`${place.name} | Places to Visit in Kannur | Kannur.io`, place.description || `Visit ${place.name} in Kannur, Kerala. Find photos, travel details and directions.`, [
      { name: "Explore more places in Kannur", path: "/explore" },
    ], place.images?.[0]?.url || "/og-image.svg");
  }
  const automobileId = path.match(/^\/automobiles\/([a-z0-9-]+)$/)?.[1];
  if (automobileId) {
    const automobile = getAutomobileById(automobileId);
    if (!automobile) return null;
    return page(`${automobile.name} Showroom in Kannur | Kannur.io`, `Find ${automobile.name} showroom information and vehicle models available in Kannur.`, [{ name: "Automobile brands in Kannur", path: "/automobiles" }]);
  }
  return null;
}

export function renderSeoHtml(template, pathname) {
  const data = getSeoPage(pathname);
  if (!data) return null;
  const canonical = `${BASE}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
  const imageUrl = data.image.startsWith("http") ? data.image : `${BASE}${data.image}`;
  const itemMarkup = data.items.length ? `<ul>${data.items.map((item) => `<li>${item.path ? `<a href="${escapeHtml(item.path)}">${escapeHtml(item.name)}</a>` : `<strong>${escapeHtml(item.name)}</strong>`}${item.description ? ` — ${escapeHtml(item.description)}` : ""}</li>`).join("")}</ul>` : "";
  const content = `<main><h1>${escapeHtml(data.title.split(" | ")[0])}</h1><p>${escapeHtml(data.description)}</p>${itemMarkup}<p><a href="/">Kannur.io home</a></p></main>`;
  const schema = { "@context": "https://schema.org", "@type": pathname === "/" ? "WebSite" : "WebPage", name: pathname === "/" ? "Kannur.io" : data.title, description: data.description, url: canonical, inLanguage: ["en", "ml"] };
  const tags = `<title>${escapeHtml(data.title)}</title><meta name="description" content="${escapeHtml(data.description)}"><link rel="canonical" href="${escapeHtml(canonical)}"><meta property="og:type" content="website"><meta property="og:title" content="${escapeHtml(data.title)}"><meta property="og:description" content="${escapeHtml(data.description)}"><meta property="og:url" content="${escapeHtml(canonical)}"><meta property="og:image" content="${escapeHtml(imageUrl)}"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`;
  const serverTags = tags.replace(/<(title|meta|link|script)\b/g, '<$1 data-ssr-seo=""');
  return template.replace(/<title>.*?<\/title>/, "").replace("</head>", `${serverTags}</head>`).replace('<div id="root"></div>', `<div id="root">${content}</div>`);
}

export function getSitemapPaths() {
  const dynamic = allPlaces.map((item) => item.path);
  const automobilePaths = getAutomobiles().map((item) => `/automobiles/${item.id}`);
  return [...new Set([...Object.keys(staticPages), ...Object.keys(filters).map((filter) => `/explore/${filter}`), ...dynamic, ...automobilePaths])];
}
