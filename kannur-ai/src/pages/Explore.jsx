import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { places } from "../data/places";

const tagGroups = [
  { value: "all" },
  { value: "beach" },
  { value: "heritage" },
  { value: "hill" },
  { value: "wildlife" },
  { value: "shopping" },
  { value: "family" },
  { value: "quiet" },
];

function PlaceCard({ place, lang, t }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place.mapsQuery || `${place.name} Kannur`
  )}`;

  const displayName = lang === "ml" ? place.nameMl || place.name : place.name;
  const displayArea = lang === "ml" ? place.areaMl || place.area : place.area;
  const displayDesc = lang === "ml" ? place.descriptionMl || place.description : place.description;
  const typeKey = place.type.toLowerCase();
  const displayType = t.types[typeKey] || place.type;
  const distanceLabel = (() => {
    const km = Number(place.distanceKm);
    if (!Number.isNaN(km) && km > 0) {
      return `${km} km`;
    }
    if (!Number.isNaN(km) && km === 0) {
      return lang === "ml" ? "കണ്ണൂർ നഗരം" : "Kannur town";
    }
    if (place.coords?.lat && place.coords?.lng) {
      if (place.distanceState?.loading) {
        return lang === "ml" ? "ദൂരം കണക്കാക്കുന്നു..." : "Calculating distance...";
      }
      if (place.distanceState?.error) {
        return lang === "ml" ? "ദൂരം ലഭ്യമല്ല" : "Distance unavailable";
      }
      return lang === "ml" ? "ദൂരം കണക്കാക്കുന്നു..." : "Calculating distance...";
    }
    if (place.distanceState?.loading) {
      return lang === "ml" ? "ദൂരം കണക്കാക്കുന്നു..." : "Calculating distance...";
    }
    if (place.distanceState?.error) {
      return lang === "ml" ? "ദൂരം ലഭ്യമല്ല" : "Distance unavailable";
    }
    return displayArea;
  })();

  return (
    <article className="place-card">
      <div className="place-head">
        <div>
          <p className="place-type">{displayType}</p>
          <h3>{displayName}</h3>
        </div>
        <span className="place-area">{distanceLabel}</span>
      </div>
      {place.images?.length > 0 && (
        <div className="gallery" aria-label={`${displayName} gallery`}>
          {place.images.map((image) => (
            <figure key={image.url}>
              <img
                src={image.url}
                srcSet={image.srcSet}
                sizes={image.sizes || "(max-width: 700px) 80vw, 420px"}
                alt={image.alt}
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <a href={image.creditUrl} target="_blank" rel="noreferrer">
                  Photo: {image.credit}
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
      <p className="place-desc">{displayDesc}</p>
      <div className="tag-row">
        {place.tags.map((tag) => (
          <span key={tag} className="tag">
            {t.tags[tag] || tag}
          </span>
        ))}
      </div>
      <div className="place-actions">
        <a className="map-link" href={mapsUrl} target="_blank" rel="noreferrer">
          {t.mapsLink}
        </a>
      </div>
    </article>
  );
}

export default function Explore({ lang, t }) {
  const [activeTag, setActiveTag] = useState("all");
  const [search, setSearch] = useState("");
  const [distances, setDistances] = useState({});
  const [distancesLoading, setDistancesLoading] = useState(false);
  const [distanceError, setDistanceError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadDistances = async () => {
      setDistancesLoading(true);
      setDistanceError(false);
      const origin = { lat: 11.876096, lng: 75.373579 };
      const destinations = places
        .filter((place) => place.coords?.lat && place.coords?.lng)
        .map((place) => ({ id: place.id, ...place.coords }));

      if (destinations.length === 0) return;

      try {
        const response = await fetch("/api/distances", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ origin, destinations }),
        });
        const data = await response.json();
        if (data?.distances) {
          setDistances(data.distances);
        } else {
          setDistanceError(true);
        }
      } catch (error) {
        setDistances({});
        setDistanceError(true);
      } finally {
        setDistancesLoading(false);
      }
    };

    loadDistances();
  }, []);

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesTag =
        activeTag === "all" || place.tags.includes(activeTag) || place.type.toLowerCase() === activeTag;
      const searchValue = search.toLowerCase();
      const matchesSearch =
        place.name.toLowerCase().includes(searchValue) ||
        place.description.toLowerCase().includes(searchValue) ||
        (place.nameMl && place.nameMl.toLowerCase().includes(searchValue)) ||
        (place.descriptionMl && place.descriptionMl.toLowerCase().includes(searchValue)) ||
        place.tags.some((tag) => tag.includes(searchValue));
      return matchesTag && matchesSearch;
    });
  }, [activeTag, search]);

  return (
    <main className="page">
      <Seo
        lang={lang === "ml" ? "ml" : "en"}
        path="/explore"
        title="Explore Kannur | Kannur | Explore Tourism"
        description={
          lang === "ml"
            ? "കണ്ണൂരിലെ ടൂറിസ്റ്റ് സ്പോട്ടുകൾ, കടൽത്തീരങ്ങൾ, പാരമ്പര്യ കേന്ദ്രങ്ങൾ എന്നിവ കണ്ടെത്തൂ."
            : "Discover tourist spots, beaches, heritage sites, and shopping in and around Kannur."
        }
      />
      <section className="page-hero">
        <Link className="back-link" to="/">
          ← {lang === "ml" ? "ഹോം" : "Back to Home"}
        </Link>
        <h1>{lang === "ml" ? "സഞ്ചാര ഇടങ്ങൾ" : "Explore Kannur"}</h1>
        <p>
          {lang === "ml"
            ? "ബീച്ചുകൾ, കോട്ടകൾ, കുന്നുകൾ, വന്യജീവി സങ്കേതങ്ങൾ—all in one place."
            : "Beaches, forts, hills, and wildlife—everything curated in one place."}
        </p>
      </section>

      <section className="filters">
        <div className="filter-row">
          {tagGroups.map((tag) => (
            <button
              key={tag.value}
              className={`chip ${activeTag === tag.value ? "active" : ""}`}
              onClick={() => setActiveTag(tag.value)}
            >
              {t.tags[tag.value]}
            </button>
          ))}
        </div>
        <div className="search-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t.searchPlaceholder}
          />
          <span>
            {filteredPlaces.length} {t.spotsLabel}
          </span>
        </div>
      </section>

      <section className="grid">
        {filteredPlaces.map((place) => (
          <PlaceCard
            key={place.id}
            place={{
              ...place,
              distanceKm: distances[place.id],
              distanceState: {
                loading: distancesLoading,
                error: distanceError,
              },
            }}
            lang={lang}
            t={t}
          />
        ))}
      </section>
    </main>
  );
}
