import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import { automobiles } from "../data/extras";

export default function AutomobileDetail({ lang, t }) {
  const { automobileId } = useParams();
  const item = automobiles.find((entry) => entry.id === automobileId);

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
          <div className="info-actions">
            {mapsUrl && (
              <a className="map-link" href={mapsUrl} target="_blank" rel="noreferrer">
                {t.mapsLink}
              </a>
            )}
            {item.website && (
              <a className="map-link" href={item.website} target="_blank" rel="noreferrer">
                {lang === "ml" ? "ഓദ്യോഗിക വെബ്സൈറ്റ്" : "Official Website"}
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
