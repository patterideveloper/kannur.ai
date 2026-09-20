import { writeFileSync } from "node:fs";
import { getSitemapPaths } from "../server/seo.js";

const paths = getSitemapPaths();
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>https://kannur.io${path.replace(/&/g, "&amp;")}</loc></url>`).join("\n")}\n</urlset>\n`;
writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`Generated sitemap with ${paths.length} URLs`);
