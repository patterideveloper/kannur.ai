import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { automobiles } from "../data/extras";

export default function Automobiles({ lang, t }) {
  const carBrands = automobiles.filter((item) => item.category !== "bike");
  const bikeBrands = automobiles.filter((item) => item.category === "bike");

  return (
    <main className="page">
      <Seo
        lang={lang === "ml" ? "ml" : "en"}
        path="/automobiles"
        title="Automobiles in Kannur | Kannur | Explore Tourism"
        description={
          lang === "ml"
            ? "കണ്ണൂരിലെ കാർ, ബൈക്ക് ബ്രാൻഡുകളുടെ സാന്നിധ്യം ലോഗോ ഗ്രിഡിലൂടെ കാണൂ."
            : "Browse major car and bike brand presence in Kannur through logo grids."
        }
      />
      <section className="page-hero">
        <Link className="back-link" to="/">
          {lang === "ml" ? "ഹോം" : "Back to Home"}
        </Link>
        <h1 className="auto-page-title">
          {lang === "ml" ? "ഓട്ടോമൊബൈൽ ബ്രാൻഡുകൾ" : "Automobile Brands"}
        </h1>
        <p>
          {lang === "ml"
            ? "ലോഗോയിൽ ടാപ്പ് ചെയ്താൽ ഷോറൂം വിശദാംശങ്ങൾ കാണാം."
            : "Tap a logo to view showroom details."}
        </p>
      </section>

      <section className="info-section">
        <div className="section-head">
          <h2 className="auto-section-title">{lang === "ml" ? "കാർ ബ്രാൻഡുകൾ" : "Car Brands"}</h2>
        </div>
        <div className="automobile-logo-grid">
          {carBrands.map((item) => {
            const brand = lang === "ml" ? item.brandMl || item.brand : item.brand;
            return (
              <Link
                key={item.id}
                to={`/automobiles/${item.id}`}
                className={`automobile-logo-tile ${item.theme ? `theme-${item.theme}` : ""}`}
                aria-label={brand}
              >
                <img src={item.logo} alt={brand} loading="lazy" decoding="async" />
                <p className="automobile-logo-name">{brand}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="info-section">
        <div className="section-head">
          <h2 className="auto-section-title">{lang === "ml" ? "ബൈക്ക് ബ്രാൻഡുകൾ" : "Bike Brands"}</h2>
        </div>
        <div className="automobile-logo-grid">
          {bikeBrands.map((item) => {
            const brand = lang === "ml" ? item.brandMl || item.brand : item.brand;
            return (
              <Link
                key={item.id}
                to={`/automobiles/${item.id}`}
                className={`automobile-logo-tile ${item.theme ? `theme-${item.theme}` : ""}`}
                aria-label={brand}
              >
                <img src={item.logo} alt={brand} loading="lazy" decoding="async" />
                <p className="automobile-logo-name">{brand}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
