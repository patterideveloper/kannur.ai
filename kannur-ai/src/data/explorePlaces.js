import { places } from "./places";
import { temples } from "./extras";

export const templePlaces = temples.map((temple) => ({
  id: `temple-${temple.id}`,
  name: temple.name,
  nameMl: temple.nameMl,
  type: "Worship",
  area: temple.area,
  areaMl: temple.areaMl,
  description: temple.description,
  descriptionMl: temple.descriptionMl,
  tags: ["worship", "heritage"],
  mapsQuery: temple.mapsQuery,
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

export const explorePlaces = [...places, ...templePlaces];
