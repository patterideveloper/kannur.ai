import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import { explorePlaces } from "../data/explorePlaces";

export default function PlaceDetail({ lang, t }) {
  const { placeId } = useParams();
  const location = useLocation();
  const [ratingState, setRatingState] = useState({
    loading: true,
    rating: null,
    totalRatings: null,
    error: false,
  });

  const place = useMemo(
    () => explorePlaces.find((item) => item.id === placeId),
    [placeId]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
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
        {(place.images || []).map((image, index) => (
          <figure key={`${image.url}-${index}`} className="detail-image-card">
            <picture>
              {image.srcSet && (
                <source type="image/webp" srcSet={image.srcSet.replace(/\\.jpg/g, ".webp")} />
              )}
              <img
                src={image.url}
                srcSet={image.srcSet}
                sizes={index === 0 ? "100vw" : "(max-width: 700px) 80vw, 420px"}
                alt={image.alt || displayName}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </picture>
            {image.credit && image.creditUrl && (
              <figcaption>
                <a href={image.creditUrl} target="_blank" rel="noreferrer">
                  Photo: {image.credit}
                </a>
              </figcaption>
            )}
          </figure>
        ))}
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
