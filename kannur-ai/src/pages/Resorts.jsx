import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
import "./resorts.css";

const kinds = [
  ["", "All stays", "എല്ലാ താമസങ്ങളും"],
  ["beach", "By the beach", "കടൽത്തീരത്ത്"],
  ["backwater", "Backwaters", "കായലോരത്ത്"],
  ["hills", "In the hills", "മലനിരകളിൽ"],
  ["wellness", "Wellness", "വെൽനെസ്"],
];

function ResortCard({ resort: r, say }) {
  const [broken, setBroken] = useState(false);
  const kind = kinds.find(([id]) => id === r.kind);
  return <article className="stay-card">
    <a className="stay-photo" href={r.photosUrl} target="_blank" rel="noreferrer" aria-label={say(`Find photos of ${r.name} on Google`, `${r.nameMl}: ഗൂഗിളിൽ ചിത്രങ്ങൾ കാണുക`)}>
      {r.image && !broken ? <img src={r.image} srcSet={`${r.image.replace("cover.webp", "cover-small.webp")} 480w, ${r.image} 960w`} sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw" width="960" height="640" loading="lazy" decoding="async" alt={say(r.name, r.nameMl)} onError={() => setBroken(true)} /> : <div className="stay-photo-placeholder"><Icon name={r.kind === "hills" ? "mountain" : "wave"} /><span>{say("Discover the view", "കാഴ്ചകൾ കണ്ടെത്തൂ")}</span><small>{say("See photos on Google ↗", "ഗൂഗിളിൽ ചിത്രങ്ങൾ കാണുക ↗")}</small></div>}
      <span className="stay-kind">{say(kind[1], kind[2])}</span>
      {r.image && !broken && <span className="stay-photo-credit">{say("Property website photo", "താമസസ്ഥലത്തിന്റെ വെബ്സൈറ്റിലെ ചിത്രം")}</span>}
    </a>
    <div className="stay-copy">
      <p className="stay-area"><Icon name="pin" />{say(r.area, r.areaMl)}{r.district !== "Kannur" && <span>{say("Nearby · Kasaragod", "സമീപത്ത് · കാസർഗോഡ്")}</span>}</p>
      <h2>{say(r.name, r.nameMl)}</h2>
      <p className="stay-description">{say(r.description, r.descriptionMl)}</p>
      <address>{r.address}</address>
      <div className="stay-actions">
        <a className="button" href={r.directionsUrl} target="_blank" rel="noreferrer"><Icon name="pin" />{say("Directions", "വഴികാട്ടി")}</a>
        <a className="stay-photos-link" href={r.photosUrl} target="_blank" rel="noreferrer">{say("Google photos ↗", "ഗൂഗിൾ ചിത്രങ്ങൾ ↗")}</a>
      </div>
      <div className="stay-contact">{r.phone ? <a href={`tel:${r.phone}`}>{say("Call", "വിളിക്കുക")} {r.phone}</a> : <a href={r.mapsUrl} target="_blank" rel="noreferrer">{say("Find contact on Maps ↗", "മാപ്സിൽ ബന്ധപ്പെടാനുള്ള വിവരം ↗")}</a>}<a href={r.sourceUrl} target="_blank" rel="noreferrer">{say("Listing source ↗", "വിവര ഉറവിടം ↗")}</a></div>
    </div>
  </article>;
}

export default function Resorts({ lang }) {
  const say = (en, ml) => lang === "ml" ? ml : en;
  const [params, setParams] = useSearchParams();
  const [resorts, setResorts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 15000);
    setStatus("loading");
    fetch("/api/resorts", { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error("Unable to load stays");
      const data = await response.json();
      if (!Array.isArray(data.resorts)) throw new Error("Invalid response");
      if (active) { setResorts(data.resorts); setStatus("ready"); }
    }).catch(() => { if (active) setStatus("error"); }).finally(() => clearTimeout(timeout));
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, [retry]);
  const q = params.get("q") || "";
  const kind = kinds.some(([id]) => id === params.get("kind")) ? params.get("kind") : "";
  const region = ["Kannur", "Kasaragod"].includes(params.get("region")) ? params.get("region") : "";
  const change = (key, value) => setParams(current => { const next = new URLSearchParams(current); value ? next.set(key, value) : next.delete(key); return next; }, { replace: true });
  const visible = resorts.filter(r => (!kind || r.kind === kind) && (!region || r.district === region) && `${r.name} ${r.nameMl} ${r.area} ${r.areaMl} ${r.address}`.toLowerCase().includes(q.trim().toLowerCase()));
  return <main className="page stays-page">
    <Seo lang={lang} path="/resorts" title={say("Resorts & Stays in Kannur | Kannur.io", "കണ്ണൂരിലെ റിസോർട്ടുകളും താമസങ്ങളും | Kannur.io")} description="Find beach resorts, hill retreats and backwater stays in Kannur and nearby Kasaragod, with photos, contact details and Google Maps directions." />
    <section className="page-hero stays-hero">
      <Link className="back-link" to="/">{say("Home", "ഹോം")}</Link>
      <p className="eyebrow">{say("STAY A LITTLE LONGER", "കുറച്ചുകൂടി ഇവിടെ തങ്ങൂ")}</p>
      <h1>{say("Wake up somewhere beautiful.", "മനോഹരമായൊരു പ്രഭാതത്തിലേക്ക്.")}</h1>
      <p>{say("Beach mornings. Hill-country hideaways. Slow days by the backwaters. Find your corner of Kannur — and a little beyond.", "കടൽത്തീരത്തെ പ്രഭാതങ്ങൾ. മലനിരകളിലെ വിശ്രമം. കായലോരത്തെ ശാന്തത. കണ്ണൂരിലും സമീപപ്രദേശങ്ങളിലും നിങ്ങളുടെ താമസസ്ഥലം കണ്ടെത്തൂ.")}</p>
      <div className="stays-hero-note"><Icon name="compass" />{say("Kannur district + nearby Kasaragod", "കണ്ണൂർ ജില്ലയും സമീപത്തെ കാസർഗോഡും")}</div>
    </section>
    <section className="stays-browser" aria-label={say("Find a stay", "താമസസ്ഥലം കണ്ടെത്തൂ")}>
      <div className="stays-search-row">
        <label className="stays-search"><Icon name="search" /><span className="stay-sr-only">{say("Search stays", "താമസസ്ഥലങ്ങൾ തിരയുക")}</span><input type="search" value={q} onChange={e => change("q", e.target.value)} placeholder={say("Search a resort or location…", "റിസോർട്ടോ സ്ഥലമോ തിരയൂ…")} /></label>
        <label className="stays-region"><span>{say("Location", "സ്ഥലം")}</span><select value={region} onChange={e => change("region", e.target.value)}><option value="">{say("Kannur & nearby", "കണ്ണൂരും സമീപവും")}</option><option value="Kannur">{say("Kannur only", "കണ്ണൂർ മാത്രം")}</option><option value="Kasaragod">{say("Nearby · Kasaragod", "സമീപത്ത് · കാസർഗോഡ്")}</option></select></label>
      </div>
      <div className="stays-filters">{kinds.map(([id, en, ml]) => <button type="button" key={id} aria-pressed={kind === id} onClick={() => change("kind", id)}>{say(en, ml)}</button>)}</div>
      {status === "loading" && <p role="status">{say("Finding your next stay…", "താമസസ്ഥലങ്ങൾ ലഭ്യമാക്കുന്നു…")}</p>}
      {status === "error" && <div role="alert"><p>{say("We couldn't load the stays. Please try again.", "വിവരങ്ങൾ ലഭ്യമായില്ല. വീണ്ടും ശ്രമിക്കൂ.")}</p><button className="button" onClick={() => setRetry(n => n + 1)}>{say("Try again", "വീണ്ടും ശ്രമിക്കുക")}</button></div>}
      {status === "ready" && <><p className="stays-count" role="status">{visible.length} {say(visible.length === 1 ? "place to stay" : "places to stay", "താമസസ്ഥലങ്ങൾ")}</p><div className="stays-grid">{visible.map(r => <ResortCard key={r.id} resort={r} say={say} />)}</div>{!visible.length && <div className="stays-empty"><h2>{say("Try a wider search.", "മറ്റൊരു തിരച്ചിൽ ശ്രമിക്കൂ.")}</h2><button className="button" onClick={() => setParams({})}>{say("Show all stays", "എല്ലാ താമസങ്ങളും കാണുക")}</button></div>}</>}
      <p className="stays-disclaimer">{say("A researched directory, not a booking service or an exhaustive list. Confirm availability, prices and access directly with the property. Google photos opens image search; images belong to their respective owners. Information checked 19 September 2026.", "ഇത് വിവര ഡയറക്ടറിയാണ്; ബുക്കിംഗ് സേവനമോ സമ്പൂർണ പട്ടികയോ അല്ല. ലഭ്യതയും നിരക്കും പ്രവേശന വിവരങ്ങളും താമസസ്ഥലവുമായി സ്ഥിരീകരിക്കുക. ഗൂഗിൾ ചിത്രങ്ങൾ എന്ന ലിങ്ക് ചിത്ര തിരച്ചിൽ തുറക്കും. ചിത്രങ്ങളുടെ അവകാശം അതത് ഉടമകൾക്കാണ്. വിവരങ്ങൾ പരിശോധിച്ചത്: 19 സെപ്റ്റംബർ 2026.")}</p>
    </section>
  </main>;
}
