import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const kindMl = {
  Biryani: "ബിരിയാണി", Seafood: "കടൽവിഭവങ്ങൾ", Malabar: "മലബാർ", Cafe: "കഫേ", Breakfast: "പ്രഭാതഭക്ഷണം",
  University: "സർവകലാശാല", Professional: "പ്രൊഫഷണൽ", College: "കോളേജ്", School: "സ്കൂൾ",
};

export default function ListingDirectory({ lang, theme, eyebrow, title, intro, items, types }) {
  const ml = lang === "ml";
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return items.filter((item) => {
      if (filter !== "all" && item.kind !== filter) return false;
      return !needle || [item.name, item.ml, item.area, item.areaMl, item.kind, item.note, item.noteMl]
        .filter(Boolean).some((value) => value.toLocaleLowerCase().includes(needle));
    });
  }, [items, query, filter]);

  return <main className={`listing-page listing-${theme}`}>
    <section className="listing-hero"><div className="listing-hero-inner">
      <Link className="back-link" to="/directory">{ml ? "ഡയറക്ടറിയിലേക്ക് മടങ്ങുക" : "Back to directory"}</Link>
      <p className="listing-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="listing-intro">{intro}</p>
      <span className="listing-total">{items.length} {ml ? "സ്ഥലങ്ങൾ" : "places to discover"}</span>
    </div></section>
    <section className="listing-content" aria-label={ml ? "സ്ഥലങ്ങളുടെ പട്ടിക" : "Places list"}>
      <div className="listing-toolbar">
        <label className="listing-search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={ml ? "പേര് അല്ലെങ്കിൽ സ്ഥലം തിരയുക" : "Search name or location"} aria-label={ml ? "പേര് അല്ലെങ്കിൽ സ്ഥലം തിരയുക" : "Search name or location"} /></label>
        <div className="listing-filters" aria-label={ml ? "വിഭാഗങ്ങൾ" : "Categories"}>
          {["all", ...types].map((type) => <button key={type} type="button" className={filter === type ? "active" : ""} aria-pressed={filter === type} onClick={() => setFilter(type)}>{type === "all" ? (ml ? "എല്ലാം" : "All") : (ml ? kindMl[type] : type)}</button>)}
        </div>
      </div>
      <p className="listing-count" aria-live="polite">{filtered.length} {ml ? "ഫലങ്ങൾ" : "results"}</p>
      {filtered.length ? <div className="listing-grid">{filtered.map((item, index) => {
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.name}, ${item.area}, Kannur, Kerala`)}`;
        return <article className="listing-card" key={item.id}>
          <div className="listing-card-top"><span>{String(index + 1).padStart(2, "0")}</span><span>{ml ? kindMl[item.kind] : item.kind}</span></div>
          <h2>{ml ? item.ml : item.name}</h2><p className="listing-area">{ml ? item.areaMl : item.area}</p>
          {item.note && <p className="listing-note">{ml ? item.noteMl : item.note}</p>}
          <div className="listing-actions"><a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`${ml ? "മാപ്പിൽ കാണുക" : "View on map"}: ${item.name}`}>{ml ? "മാപ്പിൽ കാണുക ↗" : "Map ↗"}</a><a href={item.source} target="_blank" rel="noopener noreferrer" aria-label={`${ml ? "ഉറവിടം" : "View source"}: ${item.name}`}>{ml ? "ഉറവിടം ↗" : "Source ↗"}</a></div>
        </article>;
      })}</div> : <div className="listing-empty">{ml ? "ഫലങ്ങളില്ല. മറ്റൊരു പേര് തിരയൂ." : "No matches. Try another name or category."}</div>}
      <p className="listing-disclaimer">{ml ? "ഇത് തിരഞ്ഞെടുത്ത പട്ടികയാണ്; സമയവും ലഭ്യതയും പോകുന്നതിനു മുമ്പ് പരിശോധിക്കുക." : "A curated starting point, not a complete directory. Check current hours and availability before visiting."}</p>
    </section>
  </main>;
}
