import { places } from "../data/places.js";
import { restaurants } from "../data/localDirectory.js";

export const dayRegions = [
  { id: "kannur", name: "Kannur town", nameMl: "കണ്ണൂർ നഗരം", origin: "Kannur Railway Station, Kerala", foodId: "odhen", candidates: [
    ["st-angelo-fort", "culture"], ["kairali-handicrafts", "culture"], ["payyambalam", "coast"], ["kannur-lighthouse", "coast"], ["kizhunna", "nature"],
  ] },
  { id: "thalassery", name: "Thalassery coast", nameMl: "തലശ്ശേരി തീരം", origin: "Thalassery Railway Station, Kerala", foodId: "paris", candidates: [
    ["thalassery-fort", "culture"], ["dharmadam-island", "nature"], ["muzhappilangad", "coast"], ["thalassery-beach", "coast"],
  ] },
  { id: "payyanur", name: "Payyanur & Kavvayi", nameMl: "പയ്യന്നൂരും കവ്വായിയും", origin: "Payyanur Railway Station, Kerala", foodId: "muthazham-payyanur", candidates: [
    ["payyannur-murugan-temple", "culture"], ["kavvayi-islands", "nature"], ["chootad-beach", "coast"],
  ] },
];

export const dayInterests = ["coast", "culture", "nature", "food"];
export const dayHours = [4, 6, 8];
const placeById = new Map(places.map((place) => [place.id, place]));
const restaurantById = new Map(restaurants.map((restaurant) => [restaurant.id, restaurant]));

export function normalizeDayOptions(options = {}) {
  const region = dayRegions.some((item) => item.id === options.region) ? options.region : "kannur";
  const hours = dayHours.includes(Number(options.hours)) ? Number(options.hours) : 6;
  const interests = [...new Set(Array.isArray(options.interests) ? options.interests : ["coast", "culture", "food"])]
    .filter((interest) => dayInterests.includes(interest));
  return { region, hours, interests: interests.length ? interests : ["coast", "culture"] };
}

export function buildDayPlan(rawOptions) {
  const options = normalizeDayOptions(rawOptions);
  const region = dayRegions.find((item) => item.id === options.region);
  const capacity = options.hours === 4 ? 2 : options.hours === 6 ? 3 : 4;
  const available = region.candidates.map(([id, interest], order) => ({ place: placeById.get(id), interest, order })).filter((item) => item.place);
  const picked = [];
  for (const interest of options.interests.filter((item) => item !== "food")) {
    if (picked.length >= capacity) break;
    const candidate = available.find((item) => item.interest === interest && !picked.includes(item));
    if (candidate) picked.push(candidate);
  }
  for (const candidate of available) {
    if (picked.length >= capacity) break;
    if (!picked.includes(candidate)) picked.push(candidate);
  }
  picked.sort((a, b) => a.order - b.order);
  const stops = picked.map(({ place, interest }) => {
    const photo = place.images?.[0];
    const image = photo?.creditUrl?.includes("commons.wikimedia.org") || photo?.creditUrl?.includes("keralatourism.org") ? photo : null;
    return {
      id: place.id, type: "place", interest, name: place.name, nameMl: place.nameMl || place.name,
      area: place.area, areaMl: place.areaMl || place.area,
      image: image?.url || null, imageAlt: image?.alt || place.name,
      imageCredit: image?.credit || null, imageCreditUrl: image?.creditUrl || null,
      mapsQuery: place.mapsQuery || `${place.name}, Kannur, Kerala`, detailPath: `/explore/place/${place.id}`,
    };
  });
  if (options.interests.includes("food")) {
    const eatery = restaurantById.get(region.foodId);
    if (eatery) stops.splice(1, 0, {
      id: `food-${eatery.id}`, type: "food", interest: "food", name: eatery.name, nameMl: eatery.ml,
      area: eatery.area, areaMl: eatery.areaMl, image: null,
      mapsQuery: `${eatery.name}, ${eatery.area}, Kannur, Kerala`, detailPath: "/eats",
    });
  }
  // Mobile browser Maps URLs support at most three waypoints, so longer days use two legs.
  const mapLegs = stops.length <= 4
    ? [buildDirectionsUrl(region.origin, stops)]
    : [buildDirectionsUrl(region.origin, stops.slice(0, 4)), buildDirectionsUrl(stops[3].mapsQuery, stops.slice(4))];
  return { ...options, regionName: region.name, regionNameMl: region.nameMl, stops, mapLegs };
}

export function buildDirectionsUrl(origin, stops) {
  if (!stops.length) return "https://www.google.com/maps";
  const params = new URLSearchParams({ api: "1", origin, destination: stops.at(-1).mapsQuery, travelmode: "driving" });
  if (stops.length > 1) params.set("waypoints", stops.slice(0, -1).map((stop) => stop.mapsQuery).join("|"));
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
