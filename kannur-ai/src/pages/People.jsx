import { Link } from "react-router-dom";
import { personalities } from "../data/extras";

function InfoCard({ title, subtitle, description, meta, source, t }) {
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
      </div>
    </article>
  );
}

export default function People({ lang, t }) {
  return (
    <main className="page">
      <section className="page-hero">
        <Link className="back-link" to="/">
          ← {lang === "ml" ? "ഹോം" : "Back to Home"}
        </Link>
        <h1>{lang === "ml" ? "കണ്ണൂരിലെ പ്രമുഖർ" : "People of Kannur"}</h1>
        <p>{lang === "ml" ? "കണ്ണൂരിൽ നിന്നുള്ള ശ്രദ്ധേയ വ്യക്തികൾ." : "Notable people from Kannur district."}</p>
      </section>

      <section className="info-section">
        <div className="section-head">
          <h2>{t.sections.personalities}</h2>
        </div>
        <div className="info-grid compact">
          {personalities.map((person) => (
            <InfoCard
              key={person.id}
              title={person.name}
              subtitle={person.field}
              description={person.description}
              meta={[{ label: t.labels.field, value: person.field }]}
              source={person.source}
              t={t}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
