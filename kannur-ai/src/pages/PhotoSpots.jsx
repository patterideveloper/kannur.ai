import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { places } from "../data/places";

function PhotoSpotCard({ place, lang, t }) {
  const title = lang === "ml" ? place.nameMl || place.name : place.name;
  const typeKey = place.type.toLowerCase();
  const displayType = t.types[typeKey] || place.type;
  const points =
    lang === "ml"
      ? place.deepContent?.photoPointsMl || place.deepContent?.photoPointsEn
      : place.deepContent?.photoPointsEn;
  const image = place.images?.[0];

  return (
    <article className="info-card">
      {image?.url && (
        <figure className="info-card-media">
          <picture>
            {image.srcSet && (
              <source type="image/webp" srcSet={image.srcSet.replace(/\.jpg/g, ".webp")} />
            )}
            <img
              src={image.url}
              srcSet={image.srcSet}
              sizes={image.sizes || "(max-width: 700px) 80vw, 360px"}
              alt={image.alt || title}
              loading="lazy"
              decoding="async"
            />
          </picture>
          {image.credit && image.creditUrl && (
            <figcaption className="info-card-credit">
              <a href={image.creditUrl} target="_blank" rel="noreferrer">
                {image.credit}
              </a>
            </figcaption>
          )}
        </figure>
      )}
      <div>
        <p className="info-subtitle">{displayType}</p>
        <h3>{title}</h3>
      </div>
      {points?.length ? (
        <ul className="photo-points">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ) : null}
      <div className="info-actions">
        <Link className="map-link" to={`/explore/place/${place.id}`}>
          {t.viewDetails}
        </Link>
      </div>
    </article>
  );
}

export default function PhotoSpots({ lang, t }) {
  return (
    <main className="page">
      <Seo
        lang={lang === "ml" ? "ml" : "en"}
        path="/photo-spots"
        title="Best Photo Spots in Kannur | Kannur.io"
        description={
          lang === "ml"
            ? "കണ്ണൂരിലെ ബീച്ചുകളും കോട്ടകളും ക്ഷേത്രങ്ങളും കുന്നുകളും — മികച്ച ഫോട്ടോ സ്പോട്ടുകൾ ഒരിടത്ത്."
            : "A curated map of the best photo spots across Kannur's beaches, forts, temples, hills and islands — picked for every place in our guide."
        }
      />
      <section className="page-hero">
        <Link className="back-link" to="/">
          {lang === "ml" ? "ഹോം" : "Back to Home"}
        </Link>
        <h1>
          {lang === "ml" ? "മികച്ച ഫോട്ടോ സ്പോട്ടുകൾ" : "Best photo spots in Kannur"}
        </h1>
        <p>
          {lang === "ml"
            ? "ഓരോ സ്ഥലത്തും ഞങ്ങൾ പ്രത്യേകം തിരഞ്ഞെടുത്ത ഫോട്ടോ ആംഗിളുകൾ — ബീച്ച് മുതൽ കോട്ട വരെ."
            : "A hand-picked angle for every place in our guide — from sea-facing bastions to monsoon waterfalls."}
        </p>
      </section>

      <section className="info-section">
        <div className="section-head">
          <h2>
            {lang === "ml" ? `${places.length} സ്ഥലങ്ങൾ` : `${places.length} places`}
          </h2>
          <p>
            {lang === "ml"
              ? "ഓരോ കാർഡിലും 3 ഫോട്ടോ ആംഗിളുകൾ നൽകിയിട്ടുണ്ട്."
              : "Each place lists three specific angles worth stopping for."}
          </p>
        </div>
        <div className="info-grid">
          {places.map((place) => (
            <PhotoSpotCard key={place.id} place={place} lang={lang} t={t} />
          ))}
        </div>
      </section>
    </main>
  );
}
