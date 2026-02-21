#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/nikhilpatteri/Documents/New project/kannur-ai"
OUT_DIR="$ROOT/public/images"
mkdir -p "$OUT_DIR/places" "$OUT_DIR/temples" "$OUT_DIR/people" "$ROOT/scripts/tmp"
TMP_DIR="$ROOT/scripts/tmp"

IMAGES=(
  "st_angelo_fort|https://commons.wikimedia.org/wiki/Special:FilePath/St%20Angelo%20Fort%2C%20Kannur%2010.jpg|places"
  "muzhappilangad_drivein|https://commons.wikimedia.org/wiki/Special:FilePath/Muzhappilangad%20Drive-In%20Beach.JPG|places"
  "payyambalam_beach|https://commons.wikimedia.org/wiki/Special:FilePath/Payyambalam%20beach%2C%20Kannur.jpg|places"
  "dharmadam_island|https://commons.wikimedia.org/wiki/Special:FilePath/Dharmadam%20Thuruth%20%28Island%29.jpg|places"
  "aralam_wildlife|https://commons.wikimedia.org/wiki/Special:FilePath/Aralam%20Wildlife%20Sanctuary%2001.JPG|places"
  "palakkayam_thattu|https://commons.wikimedia.org/wiki/Special:FilePath/Palakkayam%20Thattu%2020190519%20171059.jpg|places"
  "paithalmala|https://commons.wikimedia.org/wiki/Special:FilePath/Paithalmala%20%2810664%29.jpg|places"
  "parassinikadavu_snake_park|https://commons.wikimedia.org/wiki/Special:FilePath/Parassinikadavu%20Snake%20Park%28Entrance%29.jpg|places"
  "kannur_lighthouse|https://commons.wikimedia.org/wiki/Special:FilePath/Kannur%20Lighthouse.jpg|places"
  "kizhunna_beach|https://commons.wikimedia.org/wiki/Special:FilePath/Kizhunna%20beach%201.jpg|places"
  "theyyam_handicraft|https://commons.wikimedia.org/wiki/Special:FilePath/Theyyam%20Handicraft%2002.jpg|places"
  "khadi_traditional|https://commons.wikimedia.org/wiki/Special:FilePath/Khadi%20the%20traditional%20clothing%20of%20India%20.jpg|places"
  "khadi_india|https://commons.wikimedia.org/wiki/Special:FilePath/Khadi%20India.jpg|places"
  "trichambaram_temple|https://commons.wikimedia.org/wiki/Special:FilePath/Thrichambaram-sreekrishna_temple-taliparamba.jpg|temples"
  "jagannatha_temple|https://commons.wikimedia.org/wiki/Special:FilePath/Jagannath_Temple_Thalassery_JTG_(1).jpg|temples"
  "lakshmi_narasimha|https://commons.wikimedia.org/wiki/Special:FilePath/SLN_temple_Thalassery1.jpg|temples"
  "gita_gopinath|https://commons.wikimedia.org/wiki/Special:FilePath/Gita_Gopinath_2025_(cropped).jpg|people"
  "ak_gopalan|https://commons.wikimedia.org/wiki/Special:FilePath/AK_Gopalan_1990_stamp_of_India.jpg|people"
  "jimmy_george|https://commons.wikimedia.org/wiki/Special:FilePath/Jimmy_george.jpg|people"
  "sukumar_azhikode|https://commons.wikimedia.org/wiki/Special:FilePath/Sukumar_Azhikode.jpg|people"
)

for entry in "${IMAGES[@]}"; do
  IFS='|' read -r name url group <<< "$entry"
  src="$TMP_DIR/${name}.jpg"
  out_check="$OUT_DIR/$group/${name}-1200.jpg"
  if [ -f "$out_check" ]; then
    echo "Skipping $name (already optimized)"
    continue
  fi
  echo "Downloading $url"
  curl -L --fail --retry 3 --retry-delay 2 "$url" -o "$src"

  for size in 480 800 1200; do
    out="$OUT_DIR/$group/${name}-${size}.jpg"
    sips -Z "$size" "$src" --out "$out" >/dev/null
  done

  sleep 1

done

rm -rf "$TMP_DIR"

echo "Done"
