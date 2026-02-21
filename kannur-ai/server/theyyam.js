import * as cheerio from "cheerio";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthMap = monthNames.reduce((acc, month, index) => {
  acc[month.toLowerCase()] = index;
  return acc;
}, {});

const sources = [
  {
    id: "dtpc-kannur",
    name: "DTPC Kannur",
    url: "https://www.dtpckannur.com/theyyam-calendar",
    type: "official",
  },
  {
    id: "kerala-tourism",
    name: "Kerala Tourism Theyyam Calendar",
    url: "https://www.keralatourism.org/theyyamcalendar/index.php",
    type: "official",
  },
];

function normalizeDate(date) {
  if (!date || Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function parseDateFromParts(day, monthName, year) {
  if (!day || !monthName || !year) return null;
  const monthIndex = monthMap[monthName.toLowerCase()];
  if (monthIndex === undefined) return null;
  return new Date(Date.UTC(Number(year), monthIndex, Number(day)));
}

function parseRangeFromLine(line) {
  const yearMatch = line.match(/(\d{4})/g);
  const year = yearMatch ? yearMatch[yearMatch.length - 1] : null;
  if (!year) return { start: null, end: null };

  if (line.includes("-")) {
    const [rawStart, rawEnd] = line.split("-").map((part) => part.trim());
    const startTokens = rawStart.split(/\s+/);
    const endTokens = rawEnd.replace(year, "").trim().split(/\s+/);
    const startDate = parseDateFromParts(startTokens[0], startTokens[1], year);
    const endDate = parseDateFromParts(endTokens[0], endTokens[1], year) || startDate;
    return { start: startDate, end: endDate };
  }

  const tokens = line.split(/\s+/);
  const startDate = parseDateFromParts(tokens[0], tokens[1], year);
  return { start: startDate, end: startDate };
}

function parseDtpc(html) {
  const $ = cheerio.load(html);
  const text = $("body").text();
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const events = [];
  let current = null;

  const dateRegex =
    /^(\d{1,2}\s+[A-Za-z]+\s+-\s+\d{1,2}\s+[A-Za-z]+\s+\d{4}|\d{1,2}\s+[A-Za-z]+\s+\d{4})/;

  for (const line of lines) {
    if (line === "Theyyam Calendar") continue;
    if (line.startsWith("Choose Month") || line.startsWith("Choose Year")) continue;

    if (dateRegex.test(line)) {
      if (current) events.push(current);
      const range = parseRangeFromLine(line);
      current = {
        name: "",
        dateText: line,
        startDate: normalizeDate(range.start),
        endDate: normalizeDate(range.end),
        taluk: "",
        panchayath: "",
        timing: "",
        contact: "",
        location: "",
        source: "DTPC Kannur",
        sourceUrl: "https://www.dtpckannur.com/theyyam-calendar",
      };
      continue;
    }

    if (!current) continue;

    if (!current.name) {
      current.name = line.replace(/^#+\s*/, "");
      continue;
    }

    if (line.startsWith("Taluk")) {
      current.taluk = line.replace("Taluk : ", "");
      continue;
    }

    if (line.startsWith("Panchayath")) {
      current.panchayath = line.replace("Panchayath : ", "");
      continue;
    }

    if (line.startsWith("Timing")) {
      current.timing = line.replace("Timing: ", "");
      continue;
    }

    if (line.startsWith("Contact No")) {
      current.contact = line.replace("Contact No: ", "");
      continue;
    }

    if (!current.location && (line.includes(",") || line.toLowerCase().includes("kerala"))) {
      current.location = line;
    }
  }

  if (current) events.push(current);

  return events.filter((event) => event.name && event.startDate);
}

function parseKeralaTourism(html) {
  const $ = cheerio.load(html);
  const text = $("body").text();
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const events = [];

  for (const line of lines) {
    const rangeMatch = line.match(/^\d+\s+(.+?)\s+(\d{1,2})\s+to\s+(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
    if (rangeMatch) {
      const [, name, startDay, endDay, monthName, year] = rangeMatch;
      const startDate = normalizeDate(parseDateFromParts(startDay, monthName, year));
      const endDate = normalizeDate(parseDateFromParts(endDay, monthName, year));
      events.push({
        name: name.trim(),
        dateText: line,
        startDate,
        endDate,
        location: "Kannur district",
        source: "Kerala Tourism",
        sourceUrl: "https://www.keralatourism.org/theyyamcalendar/index.php",
      });
      continue;
    }

    const singleMatch = line.match(/^\d+\s+(.+?)\s+(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
    if (singleMatch) {
      const [, name, day, monthName, year] = singleMatch;
      const date = normalizeDate(parseDateFromParts(day, monthName, year));
      events.push({
        name: name.trim(),
        dateText: line,
        startDate: date,
        endDate: date,
        location: "Kannur district",
        source: "Kerala Tourism",
        sourceUrl: "https://www.keralatourism.org/theyyamcalendar/index.php",
      });
    }
  }

  return events.filter((event) => event.name && event.startDate);
}

function inRange(event, start, end) {
  if (!start && !end) return true;
  const eventStart = event.startDate ? new Date(event.startDate) : null;
  const eventEnd = event.endDate ? new Date(event.endDate) : eventStart;
  if (!eventStart) return false;
  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;

  if (startDate && endDate) {
    return eventEnd >= startDate && eventStart <= endDate;
  }
  if (startDate) return eventEnd >= startDate;
  if (endDate) return eventStart <= endDate;
  return true;
}

export async function fetchTheyyamEvents({ startDate, endDate }) {
  const results = [];

  for (const source of sources) {
    const response = await fetch(source.url, { headers: { "User-Agent": "KannurAI" } });
    if (!response.ok) continue;
    const html = await response.text();

    if (source.id === "dtpc-kannur") {
      results.push(...parseDtpc(html));
    }
    if (source.id === "kerala-tourism") {
      results.push(...parseKeralaTourism(html));
    }
  }

  const deduped = new Map();
  results.forEach((event) => {
    const key = `${event.name}-${event.startDate}-${event.source}`;
    if (!deduped.has(key)) deduped.set(key, event);
  });

  return Array.from(deduped.values()).filter((event) => inRange(event, startDate, endDate));
}
