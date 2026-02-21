#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="/Users/nikhilpatteri/Documents/New project/kannur-ai/public/images"
mkdir -p "$OUT_DIR/hero" "$OUT_DIR/why" "/Users/nikhilpatteri/Documents/New project/kannur-ai/scripts/tmp"
TMP_DIR="/Users/nikhilpatteri/Documents/New project/kannur-ai/scripts/tmp"

# name,url,group
IMAGES=(
  "theyyam_fire|https://commons.wikimedia.org/wiki/Special:FilePath/Kandanar_kelan_theyyam%3B_The_fire_theyyam_%21.jpg|hero"
  "muzhappilangad_sunset|https://commons.wikimedia.org/wiki/Special:FilePath/Muzhappilangad_Drive-In_Beach_Sunset_01.JPG|hero"
  "st_angelo_fort|https://commons.wikimedia.org/wiki/Special:FilePath/St_Angelo_Fort%2C_Kannur_10.jpg|hero"
  "payyambalam_beach|https://commons.wikimedia.org/wiki/Special:FilePath/Payyambalam_beach%2C_Kannur.jpg|hero"
  "dharmadam_island|https://commons.wikimedia.org/wiki/Special:FilePath/Dharmadom_island.jpg|hero"
  "cake_slice|https://commons.wikimedia.org/wiki/Special:FilePath/Kerala_bakery_cake_in_plate.JPG|why"
  "paithalmala|https://commons.wikimedia.org/wiki/Special:FilePath/Paithalmala_%2810664%29.jpg|why"
)

for entry in "${IMAGES[@]}"; do
  IFS='|' read -r name url group <<< "$entry"
  src="$TMP_DIR/${name}.jpg"
  echo "Downloading $url"
  curl -L --fail "$url" -o "$src"

  for size in 480 800 1200 1600; do
    out="$OUT_DIR/$group/${name}-${size}.jpg"
    sips -Z "$size" "$src" --out "$out" >/dev/null
  done

done

rm -rf "$TMP_DIR"

echo "Done"
