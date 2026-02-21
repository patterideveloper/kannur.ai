import * as cheerio from "cheerio";

const WIKI_URL = "https://en.wikipedia.org/wiki/Places_of_worship_in_Kannur_district";
const TRAVEL_KANNUR_URL = "https://travelkannur.com/temple-list/";

const TEMPLE_KEYWORDS = ["Temple", "Kavu", "Kshethram", "Kshetram"];

function cleanHeading(text) {
  return text.replace("[edit]", "").trim();
}

function isTempleHeading(text) {
  return TEMPLE_KEYWORDS.some((keyword) => text.includes(keyword));
}

export async function fetchTemplesFromWiki() {
  const response = await fetch(WIKI_URL, { headers: { "User-Agent": "KannurAI" } });
  if (!response.ok) return [];
  const html = await response.text();
  const $ = cheerio.load(html);

  const headings = [];
  $("#mw-content-text .mw-parser-output > h2, #mw-content-text .mw-parser-output > h3").each((_, el) => {
    const text = cleanHeading($(el).text());
    if (!text || text === "References") return;
    if (isTempleHeading(text)) headings.push(text);
  });

  const unique = Array.from(new Set(headings));
  return unique.map((name) => ({ name, source: "Wikipedia", sourceUrl: WIKI_URL }));
}

export async function fetchTemplesFromTravelKannur() {
  const response = await fetch(TRAVEL_KANNUR_URL, { headers: { "User-Agent": "KannurAI" } });
  if (!response.ok) return [];
  const html = await response.text();
  const $ = cheerio.load(html);

  const items = [];
  $("h3").each((_, el) => {
    const title = cleanHeading($(el).text());
    if (!title) return;
    if (!title.toLowerCase().includes("temple") && !title.toLowerCase().includes("kavu")) return;
    items.push({ name: title, source: "Travel Kannur", sourceUrl: TRAVEL_KANNUR_URL });
  });

  const unique = Array.from(new Set(items.map((item) => item.name)));
  return unique.map((name) => ({ name, source: "Travel Kannur", sourceUrl: TRAVEL_KANNUR_URL }));
}
