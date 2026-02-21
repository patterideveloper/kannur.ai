import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { personalities } from "../data/extras";

function InfoCard({ title, subtitle, description, meta, source, image, t }) {
  return (
    <article className="info-card">
      {image?.url && (
        <figure className="info-card-media">
          <img
            src={image.url}
            srcSet={image.srcSet}
            sizes={image.sizes || "(max-width: 700px) 80vw, 360px"}
            alt={image.alt || title}
            loading="lazy"
            decoding="async"
          />
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
      <div className="info-actions" />
    </article>
  );
}

export default function People({ lang, t }) {
  return (
    <main className="page">
      <Seo
        lang={lang === "ml" ? "ml" : "en"}
        path="/people"
        title="People of Kannur | Kannur | Explore Tourism"
        description={
          lang === "ml"
            ? "കണ്ണൂരിൽ നിന്നുള്ള ശ്രദ്ധേയ വ്യക്തികൾ."
            : "Notable people from Kannur district across arts, politics, sports, and academia."
        }
      />
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
              image={person.image}
              t={t}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
