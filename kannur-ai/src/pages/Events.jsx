import { Link } from "react-router-dom";
import Seo from "../components/Seo";
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
      <Seo
        lang={lang === "ml" ? "ml" : "en"}
        path="/events"
        title="Annual Events | Kannur | Explore Tourism"
        description={
          t?.eventsPage?.description ||
          (lang === "ml"
            ? "കണ്ണൂരിലെ വാർഷിക ഉത്സവങ്ങളും പ്രധാന ഇവന്റുകളും."
            : "Annual festivals and cultural events across Kannur district.")
        }
      />
      <section className="page-hero">
        <Link className="back-link" to="/">
          ← {t?.eventsPage?.back || (lang === "ml" ? "ഹോം" : "Back to Home")}
        </Link>
        <h1>{t?.eventsPage?.title || (lang === "ml" ? "വാർഷിക ഇവന്റുകൾ" : "Annual Events")}</h1>
        <p>{t?.eventsPage?.subtitle || (lang === "ml" ? "വർഷേന നടക്കുന്ന പ്രധാന ചടങ്ങുകൾ." : "Key annual festivals and rituals.")}</p>
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
