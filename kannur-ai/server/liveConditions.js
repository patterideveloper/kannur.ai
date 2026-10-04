// Kannur town coordinates — used for both the weather forecast and sunrise/sunset lookups.
const LAT = 11.8745;
const LNG = 75.3704;
const CACHE_MS = 30 * 60 * 1000; // weather/sun data doesn't need to be fresher than this
let cache = null;

const WEATHER_LABELS = {
  0: { en: "Clear sky", ml: "തെളിഞ്ഞ ആകാശം" },
  1: { en: "Mostly clear", ml: "മിക്കവാറും തെളിഞ്ഞത്" },
  2: { en: "Partly cloudy", ml: "ഭാഗികമായി മേഘാവൃതം" },
  3: { en: "Overcast", ml: "മേഘാവൃതം" },
  45: { en: "Fog", ml: "മൂടൽമഞ്ഞ്" },
  48: { en: "Fog", ml: "മൂടൽമഞ്ഞ്" },
  51: { en: "Light drizzle", ml: "ചെറിയ ചാറ്റൽ മഴ" },
  53: { en: "Drizzle", ml: "ചാറ്റൽ മഴ" },
  55: { en: "Heavy drizzle", ml: "കനത്ത ചാറ്റൽ മഴ" },
  61: { en: "Light rain", ml: "ചെറിയ മഴ" },
  63: { en: "Rain", ml: "മഴ" },
  65: { en: "Heavy rain", ml: "കനത്ത മഴ" },
  80: { en: "Rain showers", ml: "മഴച്ചാറ്റൽ" },
  81: { en: "Rain showers", ml: "മഴച്ചാറ്റൽ" },
  82: { en: "Heavy rain showers", ml: "കനത്ത മഴച്ചാറ്റൽ" },
  95: { en: "Thunderstorm", ml: "ഇടിമിന്നൽ" },
  96: { en: "Thunderstorm with hail", ml: "ആലിപ്പഴത്തോടെ ഇടിമിന്നൽ" },
  99: { en: "Thunderstorm with hail", ml: "ആലിപ്പഴത്തോടെ ഇടിമിന്നൽ" },
};

function weatherLabel(code) {
  return WEATHER_LABELS[code] || { en: "Mixed conditions", ml: "മിശ്രിത കാലാവസ്ഥ" };
}

function formatTime(isoString) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(isoString));
}

export async function fetchLiveConditions() {
  if (cache && Date.now() - cache.time < CACHE_MS) return cache.data;

  const [weatherRes, sunRes] = await Promise.all([
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LNG}&current=temperature_2m,weather_code,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&timezone=Asia%2FKolkata&forecast_days=3`,
      { signal: AbortSignal.timeout(10000) },
    ),
    fetch(`https://api.sunrise-sunset.org/json?lat=${LAT}&lng=${LNG}&formatted=0&tzid=Asia/Kolkata`, {
      signal: AbortSignal.timeout(10000),
    }),
  ]);

  if (!weatherRes.ok) throw new Error(`Open-Meteo returned ${weatherRes.status}`);
  if (!sunRes.ok) throw new Error(`Sunrise-sunset returned ${sunRes.status}`);

  const weather = await weatherRes.json();
  const sun = await sunRes.json();
  if (sun.status !== "OK") throw new Error("Sunrise-sunset API error");

  const data = {
    current: {
      tempC: Math.round(weather.current.temperature_2m),
      condition: weatherLabel(weather.current.weather_code),
    },
    forecast: weather.daily.time.map((date, index) => ({
      date,
      maxC: Math.round(weather.daily.temperature_2m_max[index]),
      minC: Math.round(weather.daily.temperature_2m_min[index]),
      rainChance: weather.daily.precipitation_probability_max[index],
      condition: weatherLabel(weather.daily.weather_code[index]),
    })),
    sun: {
      sunrise: formatTime(sun.results.sunrise),
      sunset: formatTime(sun.results.sunset),
    },
    fetchedAt: new Date().toISOString(),
  };

  cache = { time: Date.now(), data };
  return data;
}
