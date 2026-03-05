import { places } from "../src/data/places.js";
import { temples } from "../src/data/extras.js";

export function buildExplorePlaces() {
  const templePlaces = temples.map((temple) => ({
    id: `temple-${temple.id}`,
    name: temple.name,
    nameMl: temple.nameMl,
    type: "Worship",
    area: temple.area,
    areaMl: temple.areaMl,
    description: temple.description,
    descriptionMl: temple.descriptionMl,
    tags: ["temple", "heritage"],
    mapsQuery: temple.mapsQuery,
    coords: temple.coords || null,
    images: temple.image
      ? [
          {
            url: temple.image.url,
            srcSet: temple.image.srcSet,
            sizes: temple.image.sizes,
            alt: temple.image.alt || temple.name,
            credit: temple.image.credit,
            creditUrl: temple.image.creditUrl,
          },
        ]
      : [],
  }));

  return [...places, ...templePlaces];
}

export function getExplorePlaceById(id) {
  const items = buildExplorePlaces();
  return items.find((item) => item.id === id) || null;
}
