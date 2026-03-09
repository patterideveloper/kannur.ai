import * as cheerio from "cheerio";

const OFFICIAL_SITE = "https://kannurcorporation.lsgkerala.gov.in/";
const DISTRICT_SITE = "https://kannur.nic.in/en/";

function cleanText(text) {
  return (text || "").replace(/\s+/g, " ").trim();
}

function absoluteUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return new URL(url, OFFICIAL_SITE).toString();
}

function extractOfficials($) {
  const officials = [];
  $(".region-administrative-heads .team-card").each((_, node) => {
    const role = cleanText($(node).find(".team-name").first().text());
    const name = cleanText($(node).find(".team-position.text-bold").first().text());
    const phoneText = cleanText($(node).find(".team-position").eq(1).text());
    const phone = (phoneText.match(/(\+91[-\s]?)?\d{10}|\d{3,5}[-\s]\d{5,8}/) || [""])[0];
    const image = absoluteUrl($(node).find("img").first().attr("src"));

    if (!role || !name) return;
    officials.push({ role, name, phone, image });
  });
  return officials;
}

function extractUpdates($) {
  const updates = [];
  $(".region-news-updates .news-item td:last-child").each((_, node) => {
    const text = cleanText($(node).clone().find("a").remove().end().text()) || cleanText($(node).text());
    if (text) updates.push(text.replace(/Read more\.\.\./i, "").trim());
  });

  $(".region-news-ticker .view-content a, .region-news .news-title").each((_, node) => {
    const text = cleanText($(node).text());
    if (text && text.length > 6) updates.push(text);
  });

  return [...new Set(updates)].slice(0, 10);
}

function extractServices($, lines) {
  const services = [];
  $(".region-service .service-title, .region-services .service-title, .region-service a").each((_, node) => {
    const text = cleanText($(node).text());
    if (text && text.length > 3 && text.length < 60) services.push(text);
  });

  if (!services.length) {
    const known = [
      "Civil Registration",
      "Building Permit",
      "Property Tax",
      "License Service",
      "Welfare pension",
      "Night shelter",
      "Public utility",
    ];
    for (const item of known) {
      if (lines.some((line) => line.toLowerCase().includes(item.toLowerCase()))) {
        services.push(item);
      }
    }
  }

  return [...new Set(services)].slice(0, 10);
}

function extractContact($, lines) {
  const bodyText = lines.join(" ");
  const phoneMatch = bodyText.match(/(\+91[-\s]?)?\d{10}|\d{3,5}[-\s]\d{5,8}/);
  const emailMatch = bodyText.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);

  const footerPhone = cleanText($(".region-contact-us, .footer").text()).match(
    /(\+91[-\s]?)?\d{10}|\d{3,5}[-\s]\d{5,8}/
  );
  const footerEmail = cleanText($(".region-contact-us, .footer").text()).match(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
  );

  return {
    phone: footerPhone?.[0] || phoneMatch?.[0] || "",
    email: footerEmail?.[0] || emailMatch?.[0] || "",
  };
}

export async function fetchKannurCivicSnapshot() {
  const response = await fetch(OFFICIAL_SITE, { headers: { "User-Agent": "KannurAI" } });
  if (!response.ok) {
    throw new Error("Failed to fetch civic site");
  }
  const html = await response.text();
  const $ = cheerio.load(html);
  const lines = cleanText($("body").text()).split(/(?<=\.)\s+|\n+/).map(cleanText).filter(Boolean);

  let collector = null;
  try {
    const districtResponse = await fetch(DISTRICT_SITE, {
      headers: { "User-Agent": "KannurAI" },
    });
    if (districtResponse.ok) {
      const districtHtml = await districtResponse.text();
      const $$ = cheerio.load(districtHtml);
      const collectorCard = $$(".khowMinisterBox").filter((_, node) => {
        const title = cleanText($$(node).find(".Pname").text());
        return /District Collector/i.test(title);
      }).first();

      if (collectorCard.length) {
        const collectorName = cleanText(collectorCard.find(".Pdesg").first().text());
        const collectorImage = absoluteUrl(collectorCard.find("img.round-icon").first().attr("src"));
        if (collectorName) {
          collector = {
            role: "District Collector",
            name: collectorName,
            phone: "",
            image: collectorImage,
            source: DISTRICT_SITE,
          };
        }
      }
    }
  } catch {
    // keep civic data without collector if district site is unavailable
  }

  const officials = extractOfficials($);
  if (collector) {
    const alreadyExists = officials.some(
      (item) => /district collector/i.test(item.role || "")
    );
    if (!alreadyExists) officials.push(collector);
  }

  return {
    source: OFFICIAL_SITE,
    fetchedAt: new Date().toISOString(),
    officials,
    updates: extractUpdates($),
    services: extractServices($, lines),
    contact: extractContact($, lines),
  };
}
