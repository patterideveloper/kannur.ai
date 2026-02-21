import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { temples } from "../data/extras";

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

export default function Temples({ lang, t }) {
  const [wikiTemples, setWikiTemples] = useState([]);
  const [templeSources, setTempleSources] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/temples");
        const data = await response.json();
        setWikiTemples(data.items || []);
        setTempleSources(data.sources || []);
      } catch (error) {
        setWikiTemples([]);
        setTempleSources([]);
      }
    };
    load();
  }, []);

  return (
    <main className="page">
      <section className="page-hero">
        <Link className="back-link" to="/">
          ← {lang === "ml" ? "ഹോം" : "Back to Home"}
        </Link>
        <h1>{lang === "ml" ? "ക്ഷേത്രങ്ങൾ & തീർത്ഥാടനം" : "Temples & Pilgrimage"}</h1>
        <p>{lang === "ml" ? "പ്രശസ്തമായ ക്ഷേത്രങ്ങളും തീർത്ഥാടന കേന്ദ്രങ്ങളും." : "Major temples and pilgrimage spots."}</p>
      </section>

      <section className="info-section">
        <div className="section-head">
          <h2>{t.sections.temples}</h2>
        </div>
        <div className="info-grid">
          {temples.map((temple) => (
            <InfoCard
              key={temple.id}
              title={temple.name}
              description={temple.description}
              meta={[{ label: t.labels.area, value: temple.area }]}
              source={temple.source}
              mapsQuery={temple.mapsQuery}
              t={t}
            />
          ))}
        </div>
      </section>

      <section className="info-section">
        <div className="section-head">
          <h2>{lang === "ml" ? "കൂടുതൽ ക്ഷേത്രങ്ങൾ" : "More temples"}</h2>
          <p>
            {lang === "ml"
              ? "വിക്കിപീഡിയയും ട്രാവൽ കണ്ണൂർ ലിസ്റ്റും ഉൾപ്പെടുത്തി."
              : "Combined from Wikipedia and Travel Kannur lists."}
          </p>
        </div>
        <div className="info-grid compact">
          {wikiTemples.map((item) => (
            <article key={item.name} className="info-card">
              <h3>{item.name}</h3>
              <div className="info-actions">
                <a className="source-link" href={item.sourceUrl} target="_blank" rel="noreferrer">
                  {item.source}
                </a>
              </div>
            </article>
          ))}
        </div>
        {templeSources.length > 0 && (
          <div className="theyyam-sources">
            <p>{lang === "ml" ? "സ്രോതസ്സുകൾ" : "Sources"}</p>
            <div className="source-links">
              {templeSources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                  {source.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
