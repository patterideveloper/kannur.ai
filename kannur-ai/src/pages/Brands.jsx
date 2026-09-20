import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import "./brands.css";

const brands = [
  { name: "KFC", category: "Food", area: "Thavakkara, Kannur", icon: "/images/brands/kfc.png", source: "https://restaurants.kfc.co.in/Kerala-Kannur", map: "KFC Thavakkara Kannur" },
  { name: "Trends", category: "Fashion", area: "Secura Mall, Kannur", icon: "/images/brands/trends.png", source: "https://trends.shop/page/stores-kannur_kerala", map: "Reliance Trends Secura Mall Kannur" },
  { name: "Bata", category: "Footwear", area: "Manjapalam, Kannur", icon: "/images/brands/bata.png", source: "https://stores.bata.com/bata-shoes-sandals-store-in-kannur-kannur", map: "Bata Manjapalam Kannur" },
  { name: "Louis Philippe", category: "Fashion", area: "Capitol Mall, Kannur", icon: "/images/brands/louis-philippe.png", source: "https://www.indusind.com/content/dam/indusind-platform-images/home/pdf/LouisPhilippe_outlet.pdf", map: "Louis Philippe Capitol Mall Kannur" },
  { name: "Maruti Suzuki", category: "Automobiles", area: "Kannur district", icon: "/images/automobiles/maruti-suzuki.svg", detail: "/automobiles/maruti-suzuki-kannur" },
  { name: "Tata Motors", category: "Automobiles", area: "Kannur district", icon: "/images/automobiles/tata-motors.svg", detail: "/automobiles/tata-motors-kannur" },
  { name: "Mahindra", category: "Automobiles", area: "Kannur district", icon: "/images/automobiles/mahindra.png", detail: "/automobiles/mahindra-eram-kannur" },
];

export default function Brands({ lang }) {
  const ml = lang === "ml";
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const shown = brands.filter((brand) =>
    (category === "All" || brand.category === category) &&
    brand.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const categories = ["All", "Food", "Fashion", "Footwear", "Automobiles"];
  const categoryMl = { All: "എല്ലാം", Food: "ഭക്ഷണം", Fashion: "വസ്ത്രങ്ങൾ", Footwear: "പാദരക്ഷകൾ", Automobiles: "വാഹനങ്ങൾ" };

  return <main className="page brands-page">
    <Seo lang={lang} path="/brands" title="Brands in Kannur | Kannur.io" description="Explore verified food, fashion, footwear, retail and automobile brands with a presence in Kannur district." />
    <section className="page-hero brands-intro">
      <Link className="back-link" to="/directory">{ml ? "ഡയറക്ടറിയിലേക്ക് മടങ്ങുക" : "Back to directory"}</Link>
      <p className="eyebrow">{ml ? "പ്രാദേശിക ബിസിനസ്" : "THE BUSINESS LANDSCAPE"}</p>
      <h1>{ml ? "കണ്ണൂരിലെ ബ്രാൻഡുകൾ" : "Brands in Kannur"}</h1>
      <p>{ml ? "കണ്ണൂർ ജില്ലയിൽ പ്രവർത്തിക്കുന്ന ബ്രാൻഡുകൾ. ഓരോ കാർഡിലും സ്ഥലവും പരിശോധനയ്ക്കുള്ള ലിങ്കും കാണാം." : "A quick visual guide to brands with a presence across Kannur district. Open a card for its location and listing."}</p>
    </section>
    <section className="brands-controls" aria-label={ml ? "ബ്രാൻഡുകൾ തിരയുക" : "Find brands"}>
      <label className="brands-search">{ml ? "ബ്രാൻഡ് തിരയുക" : "Search brands"}<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={ml ? "പേര് നൽകുക" : "Try KFC or Tata"} /></label>
      <div className="brands-filters" aria-label={ml ? "വിഭാഗങ്ങൾ" : "Categories"}>{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{ml ? categoryMl[item] : item}</button>)}</div>
      <p className="brands-count" role="status">{shown.length} {ml ? "ബ്രാൻഡുകൾ" : "brands"}</p>
    </section>
    <section className="brands-grid" aria-label={ml ? "ബ്രാൻഡ് ലിസ്റ്റ്" : "Brand listings"}>
      {shown.map((brand) => <article className="brand-card" key={brand.name}>
        <div className="brand-card-icon"><img src={brand.icon} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} /></div>
        <h2>{brand.name}</h2><p>{brand.area}</p>
        <div className="brand-card-links">
          {brand.detail ? <Link to={brand.detail}>{ml ? "വിശദാംശങ്ങൾ" : "Showroom details"}</Link> : <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.map)}`} target="_blank" rel="noopener noreferrer">{ml ? "മാപ്പ് തുറക്കുക" : "View on map"}</a>}
          {brand.source && <a href={brand.source} target="_blank" rel="noopener noreferrer">{ml ? "ലിസ്റ്റിംഗ്" : "Verify listing"}</a>}
        </div>
      </article>)}
    </section>
    {!shown.length && <p className="brands-empty" role="status">{ml ? "ഇവിടെ പൊരുത്തപ്പെടുന്ന ബ്രാൻഡുകൾ ഇല്ല." : "No matching brands. Try another search or category."}</p>}
    <p className="brands-note">{ml ? "ബ്രാൻഡുകളുടെ സാന്നിധ്യവും പ്രവർത്തന സമയവും മാറാം. സന്ദർശിക്കുന്നതിന് മുൻപ് ലിസ്റ്റിംഗ് പരിശോധിക്കുക. ലോഗോകൾ ബന്ധപ്പെട്ട കമ്പനികളുടെ ഉടമസ്ഥതയിലാണ്." : "Store presence and hours can change. Check the linked listing before visiting. Brand marks belong to their respective owners."}</p>
  </main>;
}
