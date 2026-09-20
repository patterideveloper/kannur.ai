import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { hospitals } from "../data/hospitals";

const categories = ["All", "Private", "Co-operative", "Eye care", "Public"];
const categoryMl = { All: "എല്ലാം", Private: "സ്വകാര്യ", "Co-operative": "സഹകരണം", "Eye care": "നേത്ര ചികിത്സ", Public: "സർക്കാർ" };
const categoryOrder = { Private: 0, "Co-operative": 1, "Eye care": 2, Public: 3 };

export default function Hospitals({ lang }) {
  const ml = lang === "ml";
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return hospitals.filter((hospital) =>
      (category === "All" || hospital.kind === category) &&
      (!needle || [hospital.name, hospital.nameMl, hospital.area, hospital.areaMl]
        .some((value) => value.toLocaleLowerCase().includes(needle)))
    ).sort((a, b) => categoryOrder[a.kind] - categoryOrder[b.kind]);
  }, [category, query]);

  return <main className="listing-page listing-health">
    <Seo lang={lang} path="/hospitals" title="Hospitals in Kannur | Kannur.io" description="Find public, private and co-operative hospitals and eye-care facilities across Kannur district, with maps and verified source links." />
    <section className="listing-hero"><div className="listing-hero-inner">
      <Link className="back-link" to="/directory">{ml ? "ഡയറക്ടറിയിലേക്ക് മടങ്ങുക" : "Back to directory"}</Link>
      <p className="listing-eyebrow">{ml ? "കണ്ണൂർ ആരോഗ്യ ഡയറക്ടറി" : "KANNUR HEALTH DIRECTORY"}</p>
      <h1>{ml ? "സഹായം അടുത്തുതന്നെ." : "Care, closer to you."}</h1>
      <p className="listing-intro">{ml ? "ജില്ലയിലെ സർക്കാർ, സ്വകാര്യ, സഹകരണ ആശുപത്രികളും നേത്ര ചികിത്സാ കേന്ദ്രങ്ങളും കണ്ടെത്തൂ." : "Find public and private hospitals, co-operative care and eye-care centres across the district."}</p>
      <span className="listing-total">{hospitals.length} {ml ? "ആരോഗ്യ സ്ഥാപനങ്ങൾ" : "healthcare facilities"}</span>
    </div></section>
    <section className="listing-content" aria-label={ml ? "ആശുപത്രികളുടെ പട്ടിക" : "Hospitals list"}>
      <div className="listing-toolbar">
        <label className="listing-search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={ml ? "ആശുപത്രിയോ സ്ഥലമോ തിരയുക" : "Search hospital or location"} aria-label={ml ? "ആശുപത്രിയോ സ്ഥലമോ തിരയുക" : "Search hospital or location"} /></label>
        <div className="listing-filters" aria-label={ml ? "ആശുപത്രി വിഭാഗങ്ങൾ" : "Hospital categories"}>
          {categories.map((item) => <button key={item} type="button" className={category === item ? "active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{ml ? categoryMl[item] : item}</button>)}
        </div>
      </div>
      <p className="listing-count" aria-live="polite">{filtered.length} {ml ? "ഫലങ്ങൾ" : "results"}</p>
      {filtered.length ? <div className="listing-grid">{filtered.map((hospital) => {
        const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hospital.name}, ${hospital.area}, Kerala`)}`;
        return <article className="listing-card" key={hospital.id}>
          <div className="listing-card-top"><span>{ml ? categoryMl[hospital.kind] : hospital.kind}</span><span aria-hidden="true">✚</span></div>
          <h2>{ml ? hospital.nameMl : hospital.name}</h2>
          <p className="listing-area">{ml ? hospital.areaMl : hospital.area}</p>
          {hospital.phone && <a className="hospital-phone" href={`tel:${hospital.phone.replace(/[^\d+]/g, "")}`}>{hospital.phone}</a>}
          <div className="listing-actions">
            <a href={map} target="_blank" rel="noopener noreferrer" aria-label={`${ml ? "മാപ്പിൽ കാണുക" : "View on map"}: ${hospital.name}`}>{ml ? "മാപ്പിൽ കാണുക ↗" : "Map ↗"}</a>
            <a href={hospital.source} target="_blank" rel="noopener noreferrer" aria-label={`${ml ? "സ്ഥാപന വിവരങ്ങൾ" : "View provider or registry"}: ${hospital.name}`}>{ml ? "വിവരങ്ങൾ ↗" : "Provider / registry ↗"}</a>
          </div>
        </article>;
      })}</div> : <div className="listing-empty">{ml ? "ഫലങ്ങളില്ല. മറ്റൊരു പേര് തിരയൂ." : "No matches. Try another hospital or location."}</div>}
      <p className="listing-disclaimer">{ml ? "ഇത് അടിയന്തര സേവന പട്ടികയല്ല. ചികിത്സ, ഫോൺ നമ്പർ, സമയങ്ങൾ എന്നിവ ആശുപത്രിയുമായി നേരിട്ട് സ്ഥിരീകരിക്കുക." : "This is a directory, not emergency triage. Call the hospital to confirm services, phone numbers and availability before travelling."}</p>
    </section>
  </main>;
}
