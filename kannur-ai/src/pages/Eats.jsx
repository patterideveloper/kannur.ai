import { eateries, specialties } from "../data/extras";
import { Link } from "react-router-dom";

function InfoCard({ title, subtitle, description, meta, source, mapsQuery, t }) {
  const mapsUrl = mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`
    : null;
  return (
    <article className="info-card">
      <div>
        {subtitle && <p className="info-subtitle">{subtitle}</p>}
        <h3>{title}</h3>
      </div>
      {description && <p className="info-desc">{description}</p>}
      {meta && (
        <div className="info-meta">
          {meta.map((item) => (
            <p key={item.label}>
              <strong>{item.label}:</strong> {item.value}
            </p>
          ))}
        </div>
      )}
      <div className="info-actions">
        {mapsUrl && (
          <a className="map-link" href={mapsUrl} target="_blank" rel="noreferrer">
            {t.mapsLink}
          </a>
        )}
      </div>
    </article>
  );
}

export default function Eats({ lang, t }) {
  return (
    <main className="page">
      <section className="page-hero">
        <Link className="back-link" to="/">
          ← {lang === "ml" ? "ഹോം" : "Back to Home"}
        </Link>
        <h1>{lang === "ml" ? "ഭക്ഷണ ഇടങ്ങൾ" : "Local Eateries"}</h1>
        <p>
          {lang === "ml"
            ? "പ്രാദേശിക സ്വാദുകൾ കണ്ടെത്തൂ—കണ്ണൂർ ഭക്ഷണ സംസ്കാരം ഇവിടെ ആരംഭിക്കുന്നു."
            : "Discover local flavors—the food map of Kannur starts here."}
        </p>
      </section>

      <section className="info-section">
        <div className="section-head">
          <h2>{t.sections.eats}</h2>
          <p>{lang === "ml" ? "പ്രസിദ്ധ ഭക്ഷണ ഇടങ്ങൾ." : "Local favorites to taste Kannur."}</p>
        </div>
        <div className="info-grid">
          {eateries.map((spot) => (
            <InfoCard
              key={spot.id}
              title={spot.name}
              subtitle={spot.type}
              description={spot.description}
              meta={[{ label: t.labels.area, value: spot.area }]}
              source={spot.source}
              mapsQuery={spot.mapsQuery}
              t={t}
            />
          ))}
        </div>
      </section>

      <section className="info-section">
        <div className="section-head">
          <h2>{t.sections.specialties}</h2>
        </div>
        <div className="info-grid compact">
          {specialties.map((item) => (
            <InfoCard
              key={item.id}
              title={item.name}
              subtitle={item.type}
              description={item.description}
              source={item.source}
              t={t}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
