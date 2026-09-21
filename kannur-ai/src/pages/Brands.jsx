import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import "./brands.css";

const brands = [
  { name: "KFC", category: "Food", area: "Thavakkara, Kannur", icon: "/images/brands/kfc.png" },
  { name: "Pizza Hut", category: "Food", area: "Thana, Kannur / Payyannur", icon: "/images/brands/pizza-hut.png" },
  { name: "ChicKing", category: "Food", area: "Capitol Mall, Kannur", icon: "/images/brands/chicking.png" },
  { name: "Trends", category: "Fashion", area: "Secura Mall, Kannur", icon: "/images/brands/trends.png" },
  { name: "Bata", category: "Footwear", area: "Manjapalam, Kannur", icon: "/images/brands/bata.png" },
  { name: "Louis Philippe", category: "Fashion", area: "Capitol Mall, Kannur", icon: "/images/brands/louis-philippe.png" },
  { name: "Zudio", category: "Fashion", area: "Robertson Road, Thavakkara", icon: "/images/brands/zudio.svg" },
  { name: "Style Union", category: "Fashion", area: "Thavakkara, Kannur", icon: "/images/brands/style-union.png" },
  { name: "Max", category: "Fashion", area: "Capitol Mall, Thana", icon: "/images/brands/max.png" },
  { name: "EasyBuy", category: "Fashion", area: "Central Mall, Thavakkara", icon: "/images/brands/easybuy.png" },
  { name: "Jockey", category: "Fashion", area: "Thana / Fort Road, Kannur", icon: "/images/brands/jockey.png" },
  { name: "Lenskart", category: "Eyewear", area: "Central Mall of Emad, Thavakkara", icon: "/images/brands/lenskart.png" },
  { name: "Cinépolis", category: "Entertainment", area: "Secura Centre Mall, Thazhe Chovva", icon: "/images/brands/cinepolis.png" },
  { name: "myG", category: "Electronics", area: "Cristal Plaza, Thana", icon: "/images/brands/myg.png" },
  { name: "Kalyan Jewellers", category: "Jewellery", area: "New Bus Stand Road, Thavakkara", icon: "/images/brands/kalyan-jewellers.png" },
  { name: "Malabar Gold & Diamonds", category: "Jewellery", area: "Netaji Road, Kannur", icon: "/images/brands/malabar-gold.png" },
  { name: "Nandilath G-Mart", category: "Electronics", area: "Civil Station Junction, Thavakkara", icon: "/images/brands/nandilath-g-mart.png" },
  { name: "Titan World", category: "Watches", area: "Fort Road, Kannur", icon: "/images/brands/titan.png" },
  { name: "Reliance SMART Bazaar", category: "Retail", area: "Payyannur / Kuthuparamba", icon: "/images/brands/smart-bazaar.png" },
];

export default function Brands({ lang }) {
  const ml = lang === "ml";
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [autoBrands, setAutoBrands] = useState([]);
  const [loadingAutos, setLoadingAutos] = useState(true);
  const [autoError, setAutoError] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoadingAutos(true);
    setAutoError(false);
    fetch("/api/automobiles", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Automobile brands unavailable");
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data.items)) throw new Error("Invalid automobile data");
        setAutoBrands(data.items.map((item) => ({
          id: item.id,
          name: item.brand,
          nameMl: item.brandMl,
          category: item.category === "bike" ? "Bikes" : "Cars",
          area: item.area || "Kannur district",
          areaMl: item.areaMl,
          icon: item.logo,
        })));
      })
      .catch((error) => {
        if (error.name !== "AbortError") setAutoError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingAutos(false);
      });
    return () => controller.abort();
  }, [retry]);

  const shown = [...brands, ...autoBrands].filter((brand) =>
    (category === "All" || brand.category === category) &&
    `${brand.name} ${brand.nameMl || ""}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const categories = ["All", "Food", "Fashion", "Footwear", "Eyewear", "Electronics", "Jewellery", "Watches", "Retail", "Entertainment", "Cars", "Bikes"];
  const categoryMl = { All: "എല്ലാം", Food: "ഭക്ഷണം", Fashion: "വസ്ത്രങ്ങൾ", Footwear: "പാദരക്ഷകൾ", Eyewear: "കണ്ണടകൾ", Electronics: "ഇലക്ട്രോണിക്സ്", Jewellery: "ആഭരണങ്ങൾ", Watches: "വാച്ചുകൾ", Retail: "ചില്ലറ വ്യാപാരം", Entertainment: "വിനോദം", Cars: "കാറുകൾ", Bikes: "ബൈക്കുകൾ" };

  return <main className="page brands-page">
    <Seo lang={lang} path="/brands" title="Brands in Kannur | Kannur.io" description="Explore food, fashion, footwear, electronics, jewellery, car and bike brands with a presence in Kannur district." />
    <section className="page-hero brands-intro">
      <Link className="back-link" to="/directory">{ml ? "ഡയറക്ടറിയിലേക്ക് മടങ്ങുക" : "Back to directory"}</Link>
      <p className="eyebrow">{ml ? "പ്രാദേശിക ബിസിനസ്" : "THE BUSINESS LANDSCAPE"}</p>
      <h1>{ml ? "കണ്ണൂരിലെ ബ്രാൻഡുകൾ" : "Brands in Kannur"}</h1>
      <p>{ml ? "കണ്ണൂർ ജില്ലയിൽ പ്രവർത്തിക്കുന്ന ബ്രാൻഡുകൾ ഒറ്റനോട്ടത്തിൽ കാണാം." : "A visual guide to brands with a presence across Kannur district."}</p>
    </section>
    <section className="brands-controls" aria-label={ml ? "ബ്രാൻഡുകൾ തിരയുക" : "Find brands"}>
      <label className="brands-search">{ml ? "ബ്രാൻഡ് തിരയുക" : "Search brands"}<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={ml ? "പേര് നൽകുക" : "Try KFC or Tata"} /></label>
      <div className="brands-filters" aria-label={ml ? "വിഭാഗങ്ങൾ" : "Categories"}>{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{ml ? categoryMl[item] : item}</button>)}</div>
      <p className="brands-count" role="status">{shown.length} {ml ? "ബ്രാൻഡുകൾ" : "brands"}{loadingAutos && (ml ? " · വാഹന ബ്രാൻഡുകൾ ലോഡ് ചെയ്യുന്നു" : " · loading vehicle brands")}</p>
    </section>
    {autoError && <div className="brands-error" role="alert"><p>{ml ? "വാഹന ബ്രാൻഡുകൾ ഇപ്പോൾ ലഭ്യമല്ല." : "Car and bike brands could not load."}</p><button type="button" onClick={() => setRetry((value) => value + 1)}>{ml ? "വീണ്ടും ശ്രമിക്കുക" : "Try again"}</button></div>}
    <section className="brands-grid" aria-label={ml ? "ബ്രാൻഡ് ലിസ്റ്റ്" : "Brand listings"}>
      {shown.map((brand) => <article className="brand-card" key={brand.id || brand.name}>
        <div className="brand-card-icon"><img src={brand.icon} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} /></div>
        <h2>{ml ? brand.nameMl || brand.name : brand.name}</h2><p>{ml ? brand.areaMl || brand.area : brand.area}</p>
      </article>)}
    </section>
    {!shown.length && !loadingAutos && !autoError && <p className="brands-empty" role="status">{ml ? "ഇവിടെ പൊരുത്തപ്പെടുന്ന ബ്രാൻഡുകൾ ഇല്ല." : "No matching brands. Try another search or category."}</p>}
    <p className="brands-note">{ml ? "ബ്രാൻഡുകളുടെ സാന്നിധ്യം മാറാം. ലോഗോകൾ ബന്ധപ്പെട്ട കമ്പനികളുടെ ഉടമസ്ഥതയിലാണ്." : "Brand presence can change. Brand marks belong to their respective owners."}</p>
  </main>;
}
