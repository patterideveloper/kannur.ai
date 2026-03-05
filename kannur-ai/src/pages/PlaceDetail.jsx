import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Seo from "../components/Seo";

function buildDetailImages(place) {
  const images = [...(place.images || [])];
  if (images.length !== 1) return images;

  const primary = images[0];
  if (!primary?.url || !primary?.srcSet) return images;

  const view2Url = primary.url.replace(
    /(\/images\/(?:places|temples)\/[^/]+(?:\/[^/]+)?)-800\.jpg$/,
    "$1_view2-800.jpg"
  );

  if (view2Url === primary.url) return images;

  const view2SrcSet = primary.srcSet.replace(/-([0-9]+)\.jpg/g, "_view2-$1.jpg");
  images.push({
    ...primary,
    url: view2Url,
    srcSet: view2SrcSet,
    alt: `${primary.alt || place.name} alternate view`,
  });
  return images;
}

export default function PlaceDetail({ lang, t }) {
  const { placeId } = useParams();
  const location = useLocation();
  const [activeImage, setActiveImage] = useState(0);
  const [place, setPlace] = useState(null);
  const [loadingPlace, setLoadingPlace] = useState(true);
  const [ratingState, setRatingState] = useState({
    loading: true,
    rating: null,
    totalRatings: null,
    error: false,
  });

  useEffect(() => {
    const loadPlace = async () => {
      try {
        setLoadingPlace(true);
        const response = await fetch(`/api/explore/${encodeURIComponent(placeId)}`);
        if (!response.ok) {
          throw new Error("Not found");
        }
        const data = await response.json();
        setPlace(data.item || null);
      } catch (error) {
        setPlace(null);
      } finally {
        setLoadingPlace(false);
      }
    };
    loadPlace();
  }, [placeId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [placeId]);

  useEffect(() => {
    setActiveImage(0);
  }, [placeId]);

  useEffect(() => {
    const fetchRating = async () => {
      if (!place) return;
      setRatingState({
        loading: true,
        rating: null,
        totalRatings: null,
        error: false,
      });
      try {
        const response = await fetch(
          `/api/place-rating?query=${encodeURIComponent(
            place.mapsQuery || `${place.name} Kannur`
          )}`
        );
        if (!response.ok) {
          throw new Error("Rating fetch failed");
        }
        const data = await response.json();
        setRatingState({
          loading: false,
          rating: data.rating ?? null,
          totalRatings: data.userRatingsTotal ?? null,
          error: false,
        });
      } catch (error) {
        setRatingState({
          loading: false,
          rating: null,
          totalRatings: null,
          error: true,
        });
      }
    };

    fetchRating();
  }, [place]);

  if (loadingPlace) {
    return (
      <main className="page">
        <section className="page-hero">
          <Link className="back-link" to="/explore">
            ← {lang === "ml" ? "എക്സ്പ്ലോർ" : "Back to Explore"}
          </Link>
          <h1>{lang === "ml" ? "ലോഡ് ചെയ്യുന്നു..." : "Loading..."}</h1>
        </section>
      </main>
    );
  }

  if (!place) {
    return (
      <main className="page">
        <section className="page-hero">
          <Link className="back-link" to="/explore">
            ← {lang === "ml" ? "എക്സ്പ്ലോർ" : "Back to Explore"}
          </Link>
          <h1>{lang === "ml" ? "സ്ഥലം കണ്ടെത്താനായില്ല" : "Place not found"}</h1>
        </section>
      </main>
    );
  }

  const displayName = lang === "ml" ? place.nameMl || place.name : place.name;
  const displayArea = lang === "ml" ? place.areaMl || place.area : place.area;
  const displayDesc = lang === "ml" ? place.descriptionMl || place.description : place.description;
  const displayType = t.types[place.type.toLowerCase()] || place.type;
  const mapsQuery = place.mapsQuery || `${place.name} Kannur`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`;
  const backPath = location.state?.from || "/explore";
  const images = buildDetailImages(place);
  const activeImageItem = images[activeImage] || null;
  const hasMultipleImages = images.length > 1;

  return (
    <main className="page">
      <Seo
        lang={lang === "ml" ? "ml" : "en"}
        path={`/explore/place/${place.id}`}
        title={`${displayName} | Kannur | Explore Tourism`}
        description={displayDesc}
      />

      <section className="page-hero">
        <Link className="back-link" to={backPath}>
          ← {lang === "ml" ? "എക്സ്പ്ലോറിലേക്ക് മടങ്ങുക" : "Back to Explore"}
        </Link>
        <h1>{displayName}</h1>
        <p>{displayDesc}</p>
      </section>

      <section className="detail-meta">
        <div className="detail-pill">{displayType}</div>
        <div className="detail-pill">{displayArea}</div>
        <div className="detail-pill">
          {ratingState.loading
            ? lang === "ml"
              ? "റേറ്റിംഗ് ലോഡ് ചെയ്യുന്നു..."
              : "Loading rating..."
            : ratingState.rating
              ? `${ratingState.rating} / 5${ratingState.totalRatings ? ` (${ratingState.totalRatings})` : ""}`
              : lang === "ml"
                ? "റേറ്റിംഗ് ലഭ്യമല്ല"
                : "Rating unavailable"}
        </div>
      </section>

      <section className="detail-gallery">
        {activeImageItem && (
          <figure className="detail-image-card detail-carousel">
            <picture>
              {activeImageItem.srcSet && (
                <source
                  type="image/webp"
                  srcSet={activeImageItem.srcSet.replace(/\\.jpg/g, ".webp")}
                />
              )}
              <img
                src={activeImageItem.url}
                srcSet={activeImageItem.srcSet}
                sizes="100vw"
                alt={activeImageItem.alt || displayName}
                loading="eager"
                decoding="async"
              />
            </picture>

            {hasMultipleImages && (
              <>
                <button
                  className="carousel-nav prev"
                  type="button"
                  onClick={() =>
                    setActiveImage((prev) => (prev - 1 + images.length) % images.length)
                  }
                  aria-label={lang === "ml" ? "മുൻ ചിത്രം" : "Previous image"}
                >
                  ‹
                </button>
                <button
                  className="carousel-nav next"
                  type="button"
                  onClick={() => setActiveImage((prev) => (prev + 1) % images.length)}
                  aria-label={lang === "ml" ? "അടുത്ത ചിത്രം" : "Next image"}
                >
                  ›
                </button>
              </>
            )}

            {activeImageItem.credit && activeImageItem.creditUrl && (
              <figcaption>
                <a href={activeImageItem.creditUrl} target="_blank" rel="noreferrer">
                  Photo: {activeImageItem.credit}
                </a>
              </figcaption>
            )}
          </figure>
        )}
      </section>

      <section className="detail-map-wrap">
        <div className="place-actions">
          <a className="map-link" href={mapsUrl} target="_blank" rel="noreferrer">
            {t.mapsLink}
          </a>
        </div>
        <div className="detail-map">
          <iframe
            src={mapsEmbed}
            title={`${displayName} map`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
