import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";

export default function AutomobileDetail({ lang, t }) {
  const { automobileId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/automobiles/${automobileId}`);
        if (!response.ok) {
          setItem(null);
          return;
        }
        const data = await response.json();
        setItem(data.item || null);
      } catch {
        setItem(null);
      } finally {
        setLoading(false);
      }
    };
    loadItem();
  }, [automobileId]);

  if (loading) {
    return (
      <main className="page">
        <section className="page-hero">
          <Link className="back-link" to="/automobiles">
            {lang === "ml" ? "ഓട്ടോമൊബൈൽ" : "Back to Automobiles"}
          </Link>
          <p>{lang === "ml" ? "ലോഡ് ചെയ്യുന്നു..." : "Loading..."}</p>
        </section>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="page">
        <section className="page-hero">
          <Link className="back-link" to="/automobiles">
            {lang === "ml" ? "ഓട്ടോമൊബൈൽ" : "Back to Automobiles"}
          </Link>
          <h1>{lang === "ml" ? "വിവരം ലഭ്യമല്ല" : "Not Found"}</h1>
          <p>{lang === "ml" ? "ഈ ഷോറൂം വിവരങ്ങൾ ലഭ്യമല്ല." : "Showroom details are unavailable."}</p>
        </section>
      </main>
    );
  }

  const brand = lang === "ml" ? item.brandMl || item.brand : item.brand;
  const dealer = lang === "ml" ? item.dealerMl || item.dealer : item.dealer;
  const area = lang === "ml" ? item.areaMl || item.area : item.area;
  const description = lang === "ml" ? item.descriptionMl || item.description : item.description;
  const mapsUrl = item.mapsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapsQuery)}`
    : null;
  const models = item.models || [];

  return (
    <main className="page">
      <Seo
        lang={lang === "ml" ? "ml" : "en"}
        path={`/automobiles/${item.id}`}
        title={`${brand} | Kannur | Explore Tourism`}
        description={description}
      />

      <section className="page-hero">
        <Link className="back-link" to="/automobiles">
          {lang === "ml" ? "ഓട്ടോമൊബൈൽ" : "Back to Automobiles"}
        </Link>
      </section>

      <section className="info-section automobile-detail-wrap">
        <figure className={`automobile-logo-detail ${item.theme ? `theme-${item.theme}` : ""}`}>
          <img src={item.logo} alt={brand} />
        </figure>
        <div className="automobile-detail-content">
          <h1>{dealer}</h1>
          <p className="automobile-brand">{brand}</p>
          <p className="automobile-desc">{description}</p>
          <p className="automobile-area">
            <strong>{t.labels.area}:</strong> {area}
          </p>
          <div className="info-actions auto-detail-actions">
            {mapsUrl && (
              <a className="map-link location-link" href={mapsUrl} target="_blank" rel="noreferrer">
                <span className="map-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                </span>
                {t.mapsLink}
              </a>
            )}
          </div>
        </div>
      </section>

      {models.length > 0 && (
        <section className="info-section">
          <div className="section-head">
            <h2>{lang === "ml" ? "ലഭ്യമായ മോഡലുകൾ" : "Available Models in Kannur"}</h2>
          </div>
          <div className="vehicle-model-grid">
            {models.map((model) => (
              <article key={model.name} className="vehicle-model-card">
                <img src={model.imageUrl} alt={model.name} loading="lazy" decoding="async" />
                <p>{model.name}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
