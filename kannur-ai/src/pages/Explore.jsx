import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Seo from "../components/Seo";

const tagGroups = [
  { value: "all" },
  { value: "beach" },
  { value: "heritage" },
  { value: "hill" },
  { value: "wildlife" },
  { value: "shopping" },
  { value: "temple" },
  { value: "church" },
  { value: "mosque" },
  { value: "family" },
  { value: "quiet" },
];

const routeToTag = {
  all: "all",
  beaches: "beach",
  heritage: "heritage",
  hills: "hill",
  wildlife: "wildlife",
  shopping: "shopping",
  worship: "temple",
  temples: "temple",
  churches: "church",
  mosques: "mosque",
  family: "family",
  quiet: "quiet",
};

const tagToRoute = {
  all: "",
  beach: "beaches",
  heritage: "heritage",
  hill: "hills",
  wildlife: "wildlife",
  shopping: "shopping",
  temple: "temples",
  church: "churches",
  mosque: "mosques",
  family: "family",
  quiet: "quiet",
};

function PlaceCard({ place, lang, t, fromPath }) {
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
        return "0km";
      }
      if (place.distanceState?.error) {
        return "0km";
      }
      return "0km";
    }
    if (place.distanceState?.loading) {
      return "0km";
    }
    if (place.distanceState?.error) {
      return "0km";
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
      {place.images?.[0] && (
        <div className="gallery" aria-label={`${displayName} preview`}>
          <figure>
            <picture>
              {place.images[0].srcSet && (
                <source
                  type="image/webp"
                  srcSet={place.images[0].srcSet.replace(/\\.jpg/g, ".webp")}
                />
              )}
              <img
                src={place.images[0].url}
                srcSet={place.images[0].srcSet}
                sizes={place.images[0].sizes || "(max-width: 700px) 80vw, 420px"}
                alt={place.images[0].alt}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <figcaption>
              <a href={place.images[0].creditUrl} target="_blank" rel="noreferrer">
                Photo: {place.images[0].credit}
              </a>
            </figcaption>
          </figure>
        </div>
      )}
      <div className="place-actions">
        <Link className="map-link secondary-link" to={`/explore/place/${place.id}`} state={{ from: fromPath }}>
          {t.viewDetails || (lang === "ml" ? "കൂടുതൽ കാണൂ" : "View Details")}
        </Link>
      </div>
    </article>
  );
}

export default function Explore({ lang, t }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { filter } = useParams();
  const [search, setSearch] = useState("");
  const [placesData, setPlacesData] = useState([]);
  const [placesLoading, setPlacesLoading] = useState(true);
  const [distances, setDistances] = useState({});
  const [distancesLoading, setDistancesLoading] = useState(false);
  const [distanceError, setDistanceError] = useState(false);

  const activeTag = (filter ? routeToTag[filter] : "all") || "all";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!filter) return;
    if (!routeToTag[filter]) {
      navigate("/explore", { replace: true });
    }
  }, [filter, navigate]);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        setPlacesLoading(true);
        const response = await fetch("/api/explore");
        const data = await response.json();
        setPlacesData(data.items || []);
      } catch (error) {
        setPlacesData([]);
      } finally {
        setPlacesLoading(false);
      }
    };
    loadPlaces();
  }, []);

  useEffect(() => {
    if (placesData.length === 0) return;
    const loadDistances = async () => {
      setDistancesLoading(true);
      setDistanceError(false);
      const origin = { lat: 11.876096, lng: 75.373579 };
      const destinations = placesData
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
  }, [placesData]);

  const combinedPlaces = useMemo(() => placesData, [placesData]);

  const filteredPlaces = useMemo(() => {
    return combinedPlaces.filter((place) => {
      const matchesTag =
        activeTag === "all" || place.tags.includes(activeTag) || place.type.toLowerCase() === activeTag;
      const searchValue = search.toLowerCase();
      const matchesSearch =
        place.name.toLowerCase().includes(searchValue) ||
        place.description.toLowerCase().includes(searchValue) ||
        (place.nameMl && place.nameMl.toLowerCase().includes(searchValue)) ||
        (place.descriptionMl && place.descriptionMl.toLowerCase().includes(searchValue)) ||
        place.tags.some((tag) => tag.includes(searchValue)) ||
        (place.searchAliases &&
          place.searchAliases.some((alias) => alias.toLowerCase().includes(searchValue)));
      return matchesTag && matchesSearch;
    });
  }, [activeTag, search, combinedPlaces]);

  return (
    <main className="page">
      <Seo
        lang={lang === "ml" ? "ml" : "en"}
        path={filter ? `/explore/${filter}` : "/explore"}
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
              onClick={() => {
                const route = tagToRoute[tag.value];
                navigate(route ? `/explore/${route}` : "/explore");
              }}
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

      {placesLoading && (
        <section className="info-section">
          <p>{lang === "ml" ? "ലോഡ് ചെയ്യുന്നു..." : "Loading places..."}</p>
        </section>
      )}

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
            fromPath={location.pathname}
          />
        ))}
      </section>
    </main>
  );
}
