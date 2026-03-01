import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..", "public", "images");

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".jpg")) {
      files.push(full);
    }
  }
  return files;
}

async function ensureWebp(file) {
  const webpPath = file.replace(/\.jpg$/i, ".webp");
  try {
    const [jpgStat, webpStat] = await Promise.all([
      fs.stat(file),
      fs.stat(webpPath),
    ]);
    if (webpStat.mtimeMs >= jpgStat.mtimeMs) return;
  } catch {
    // no webp yet
  }

  await sharp(file)
    .webp({ quality: 80 })
    .toFile(webpPath);
}

async function main() {
  try {
    await fs.access(root);
  } catch {
    console.error("No public/images directory found.");
    process.exit(1);
  }

  const files = await walk(root);
  for (const file of files) {
    await ensureWebp(file);
  }
  console.log(`Generated WebP for ${files.length} images.`);
}

main();
