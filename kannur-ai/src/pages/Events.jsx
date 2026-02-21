import { Link } from "react-router-dom";
import { events } from "../data/extras";

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
        {source && (
          <a className="source-link" href={source} target="_blank" rel="noreferrer">
            {t.officialSource}
          </a>
        )}
        {mapsUrl && (
          <a className="map-link" href={mapsUrl} target="_blank" rel="noreferrer">
            {t.mapsLink}
          </a>
        )}
      </div>
    </article>
  );
}

export default function Events({ lang, t }) {
  return (
    <main className="page">
      <section className="page-hero">
        <Link className="back-link" to="/">
          ← {lang === "ml" ? "ഹോം" : "Back to Home"}
        </Link>
        <h1>{lang === "ml" ? "വാർഷിക ഇവന്റുകൾ" : "Annual Events"}</h1>
        <p>{lang === "ml" ? "വർഷേന നടക്കുന്ന പ്രധാന ചടങ്ങുകൾ." : "Key annual festivals and rituals."}</p>
      </section>

      <section className="info-section">
        <div className="section-head">
          <h2>{t.sections.events}</h2>
        </div>
        <div className="info-grid">
          {events.map((event) => (
            <InfoCard
              key={event.id}
              title={event.name}
              subtitle={event.season}
              description={event.description}
              meta={[{ label: t.labels.season, value: event.season }]}
              source={event.source}
              mapsQuery={event.mapsQuery}
              t={t}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
