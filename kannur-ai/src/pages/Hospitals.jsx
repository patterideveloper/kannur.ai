import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { hospitals } from "../data/extras";

function InfoCard({ title, description, meta, source, mapsQuery, t }) {
  const mapsUrl = mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`
    : null;
  return (
    <article className="info-card">
      <div>
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

export default function Hospitals({ lang, t }) {
  return (
    <main className="page">
      <Seo
        lang={lang === "ml" ? "ml" : "en"}
        path="/hospitals"
        title="Hospitals & Essentials | Kannur | Explore Tourism"
        description={
          lang === "ml"
            ? "കണ്ണൂരിലെ പ്രധാന ആശുപത്രികളും അവശ്യ സേവനങ്ങളും."
            : "Key hospitals and essential services across Kannur district."
        }
      />
      <section className="page-hero">
        <Link className="back-link" to="/">
          ← {lang === "ml" ? "ഹോം" : "Back to Home"}
        </Link>
        <h1>{lang === "ml" ? "ആശുപത്രികൾ" : "Hospitals & Essentials"}</h1>
        <p>{lang === "ml" ? "അത്യാവശ്യ ആരോഗ്യ സേവനങ്ങൾ." : "Essential healthcare contacts."}</p>
      </section>

      <section className="info-section">
        <div className="section-head">
          <h2>{t.sections.hospitals}</h2>
        </div>
        <div className="info-grid">
          {hospitals.map((hospital) => (
            <InfoCard
              key={hospital.id}
              title={hospital.name}
              description={hospital.description}
              meta={[
                { label: t.labels.area, value: hospital.area },
                { label: t.labels.phone, value: hospital.phone },
              ]}
              source={hospital.source}
              mapsQuery={hospital.mapsQuery}
              t={t}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
