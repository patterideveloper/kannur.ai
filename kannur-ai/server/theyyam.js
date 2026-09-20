import * as cheerio from "cheerio";

const BASE = "https://www.keralatheyyam.com";
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const CACHE_MS = 15 * 60 * 1000;
const cache = new Map();

export function currentMonthInKannur(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const get = (type) => parts.find((part) => part.type === type)?.value;
  return { month: `${get("year")}-${get("month")}`, today: `${get("year")}-${get("month")}-${get("day")}` };
}

export function isAllowedMonth(value, now = new Date()) {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value || "")) return false;
  const current = currentMonthInKannur(now).month;
  const [year, month] = current.split("-").map(Number);
  const [selectedYear, selectedMonth] = value.split("-").map(Number);
  const offset = (selectedYear - year) * 12 + selectedMonth - month;
  return offset >= 0 && offset <= 6;
}

function parseDate(text) {
  const match = text.trim().match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (!match) return null;
  const date = new Date(`${match[1]} ${match[2]}, ${match[3]} 00:00:00 GMT`);
  if (Number.isNaN(date.getTime()) || date.getUTCFullYear() !== Number(match[3]) || date.getUTCDate() !== Number(match[2])) return null;
  return date.toISOString().slice(0, 10);
}

export function parseKeralaTheyyam(html, sourceUrl) {
  const $ = cheerio.load(html);
  const events = [];
  $(".theyyam-card").each((_, element) => {
    const card = $(element);
    const venue = card.find(".kavu-name").first().text().replace(/\s+/g, " ").trim();
    const district = /^(Kannur|Kasaragod|Kasargod|Kozhikode)\b/i.exec(venue)?.[1];
    if (!district) return;
    const dateText = card.find(".theyyam-dates").first().text().trim();
    const [rawStart, rawEnd] = dateText.split(/\s+-\s+/);
    const startDate = parseDate(rawStart || "");
    const endDate = parseDate(rawEnd || rawStart || "");
    if (!startDate || !endDate || endDate < startDate) return;
    const heading = card.find(".theyyam-title").first().text();
    const headingYears = [...heading.matchAll(/\b20\d{2}\b/g)].map((match) => Number(match[0]));
    const dateConflict = headingYears.length > 0 && !headingYears.includes(Number(startDate.slice(0, 4)));
    const rituals = card.find(".theyyam-name").map((__, entry) => ({
      name: $(entry).find(".theyyam-link").first().text().replace(/\s+/g, " ").trim(),
      time: $(entry).find(".theyyam-time").first().text().trim(),
    })).get().filter((item) => item.name);
    const venueLink = card.find(".kavu-name a").first().attr("href");
    const source = venueLink && /^https:\/\/(www\.)?keralatheyyam\.com\//i.test(venueLink) ? venueLink : sourceUrl;
    events.push({
      name: venue.replace(/^(Kannur|Kasaragod|Kasargod|Kozhikode)\s+/i, ""),
      location: venue,
      district: district === "Kasargod" ? "Kasaragod" : district,
      startDate, endDate, rituals,
      dateConflict,
      source: "Kerala Theyyam",
      sourceUrl: source,
    });
  });
  return events;
}

export async function fetchTheyyamEvents({ month, now = new Date() }) {
  if (!isAllowedMonth(month, now)) throw new RangeError("Month must be within the next six months");
  const monthIndex = Number(month.slice(5, 7)) - 1;
  const sourceUrl = `${BASE}/category/${MONTHS[monthIndex]}/`;
  const cached = cache.get(monthIndex);
  let events;
  if (cached && Date.now() - cached.time < CACHE_MS) {
    events = cached.events;
  } else {
    const response = await fetch(sourceUrl, { headers: { "User-Agent": "Mozilla/5.0 (compatible; Kannur.io calendar)" }, signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(`Kerala Theyyam returned ${response.status}`);
    events = parseKeralaTheyyam(await response.text(), sourceUrl);
    cache.set(monthIndex, { time: Date.now(), events });
  }
  const { today } = currentMonthInKannur(now);
  const deduped = new Map();
  events.filter((event) => event.startDate.slice(0, 7) === month && event.endDate >= today)
    .forEach((event) => deduped.set(`${event.startDate}-${event.name}`, event));
  return {
    events: [...deduped.values()].sort((a, b) => a.startDate.localeCompare(b.startDate) || a.name.localeCompare(b.name)),
    sources: [{ name: "Kerala Theyyam", url: sourceUrl }],
    checkedAt: new Date().toISOString(),
  };
}
