import { automobiles } from "../src/data/extras.js";
import { vehicleModelsByBrand } from "../src/data/vehicleModels.js";

const withModels = (item) => ({
  ...item,
  models: vehicleModelsByBrand[item.id] || [],
});

export function getAutomobiles({ category } = {}) {
  const items = category
    ? automobiles.filter((item) => (category === "bike" ? item.category === "bike" : item.category !== "bike"))
    : automobiles;
  return items.map(withModels);
}

export function getAutomobileById(id) {
  const item = automobiles.find((entry) => entry.id === id);
  if (!item) return null;
  return withModels(item);
}

