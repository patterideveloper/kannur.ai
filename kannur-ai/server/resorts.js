import { readFileSync } from "node:fs";

const resorts = JSON.parse(readFileSync(new URL("./data/resorts.json", import.meta.url), "utf8"));

export function getResorts() {
  return resorts.map((resort) => {
    const query = encodeURIComponent(`${resort.name}, ${resort.address}`);
    return {
      ...resort,
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${query}`,
      directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${query}`,
      photosUrl: `https://www.google.com/search?tbm=isch&q=${query}`,
    };
  });
}
