import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
import { buildDayPlan, dayHours, dayInterests, dayRegions, normalizeDayOptions } from "../lib/dayPlanner";
import "./dayPlanner.css";

const interestLabels = {
  coast: ["Coast", "കടൽത്തീരം"], culture: ["Culture", "സംസ്കാരം"],
  nature: ["Nature", "പ്രകൃതി"], food: ["Local food", "നാടൻ ഭക്ഷണം"],
};

export default function DayPlanner({ lang }) {
  const ml = lang === "ml";
  const say = (en, mal) => ml ? mal : en;
  const [params, setParams] = useSearchParams();
  const initial = normalizeDayOptions({ region: params.get("area"), hours: params.get("hours"), interests: params.get("interests")?.split(",") });
  const [region, setRegion] = useState(initial.region);
  const [hours, setHours] = useState(initial.hours);
  const [interests, setInterests] = useState(initial.interests);
  const [shareState, setShareState] = useState("");
  const plan = useMemo(() => params.get("plan") === "1" ? buildDayPlan({ region: params.get("area"), hours: params.get("hours"), interests: params.get("interests")?.split(",") }) : null, [params]);

  function toggleInterest(interest) {
    setInterests((current) => current.includes(interest) ? (current.length > 1 ? current.filter((item) => item !== interest) : current) : [...current, interest]);
  }

  function makePlan(event) {
    event.preventDefault();
    setShareState("");
    setParams({ plan: "1", area: region, hours: String(hours), interests: dayInterests.filter((interest) => interests.includes(interest)).join(",") });
    requestAnimationFrame(() => document.getElementById("day-plan-results")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function sharePlan() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: say("My Kannur day", "എന്റെ കണ്ണൂർ യാത്ര"), url });
      else { await navigator.clipboard.writeText(url); setShareState(say("Link copied", "ലിങ്ക് പകർത്തി")); }
    } catch (error) {
      if (error.name !== "AbortError") setShareState(say("Unable to share. Copy the page URL instead.", "പങ്കിടാൻ കഴിഞ്ഞില്ല. പേജ് ലിങ്ക് പകർത്തുക."));
    }
  }

  return <main className="day-page">
    <Seo lang={lang} path="/plan" title={say("Plan a day in Kannur | Kannur.io", "കണ്ണൂരിൽ ഒരു ദിവസം ആസൂത്രണം ചെയ്യൂ | Kannur.io")} description={say("Build a simple day route through Kannur's coast, culture, nature and local food.", "കണ്ണൂരിലെ കടൽത്തീരം, സംസ്കാരം, പ്രകൃതി, നാടൻ ഭക്ഷണം എന്നിവ ചേർത്തൊരു ദിവസയാത്ര തയ്യാറാക്കൂ.")} image="/images/hero/kannur_premium-1200.jpg" />
    <section className="day-hero"><div className="day-hero-inner">
      <Link className="back-link" to="/">{say("Back to home", "ഹോമിലേക്ക് മടങ്ങുക")}</Link>
      <p className="day-kicker">{say("YOUR DAY, YOUR KANNUR", "നിങ്ങളുടെ ദിവസം, നിങ്ങളുടെ കണ്ണൂർ")}</p>
      <h1>{say("A day worth", "ഓർമ്മയിൽ നിൽക്കുന്ന")} <em>{say("remembering.", "ഒരു ദിവസം.")}</em></h1>
      <p>{say("Tell us what you love. We’ll put together a thoughtful route using places already in our Kannur guide.", "നിങ്ങൾക്കിഷ്ടമുള്ളത് തിരഞ്ഞെടുക്കൂ. കണ്ണൂർ ഗൈഡിലെ സ്ഥലങ്ങൾ ചേർത്ത് ഒരു യാത്ര ഒരുക്കാം.")}</p>
    </div></section>

    <div className="day-layout">
      <form className="day-form" onSubmit={makePlan}>
        <div className="day-form-heading"><span>01 / {say("MAKE IT YOURS", "നിങ്ങളുടെ ഇഷ്ടം")}</span><h2>{say("Start with the essentials.", "തുടങ്ങാം.")}</h2></div>
        <fieldset><legend>{say("Where will your day begin?", "യാത്ര എവിടെ തുടങ്ങും?")}</legend><div className="day-options day-region-options">
          {dayRegions.map((item) => <button key={item.id} type="button" className={region === item.id ? "selected" : ""} aria-pressed={region === item.id} onClick={() => setRegion(item.id)}><Icon name={item.id === "payyanur" ? "mountain" : "compass"} /><span>{ml ? item.nameMl : item.name}</span></button>)}
        </div></fieldset>
        <fieldset><legend>{say("How much time do you have?", "എത്ര സമയം ലഭ്യമാണ്?")}</legend><div className="day-options day-time-options">
          {dayHours.map((value) => <button key={value} type="button" className={hours === value ? "selected" : ""} aria-pressed={hours === value} onClick={() => setHours(value)}>{value} {say("hours", "മണിക്കൂർ")}</button>)}
        </div></fieldset>
        <fieldset><legend>{say("What sounds like your kind of day?", "എന്തെല്ലാം കാണാൻ ആഗ്രഹിക്കുന്നു?")}</legend><div className="day-options day-interest-options">
          {dayInterests.map((interest) => <button key={interest} type="button" className={interests.includes(interest) ? "selected" : ""} aria-pressed={interests.includes(interest)} onClick={() => toggleInterest(interest)}>{ml ? interestLabels[interest][1] : interestLabels[interest][0]}</button>)}
        </div></fieldset>
        <button className="day-build" type="submit">{plan ? say("Update my day", "യാത്ര പുതുക്കുക") : say("Build my day", "യാത്ര തയ്യാറാക്കൂ")} <span aria-hidden="true">↗</span></button>
        <p className="day-form-note">{say("A curated suggestion—not live traffic or a booking. Check travel times and opening hours before setting out.", "ഇത് ഒരു യാത്രാ നിർദ്ദേശമാണ്; തത്സമയ ഗതാഗതമോ ബുക്കിംഗോ അല്ല. പുറപ്പെടും മുമ്പ് യാത്രാസമയവും തുറക്കുന്ന സമയവും പരിശോധിക്കുക.")}</p>
      </form>

      <section className="day-results" id="day-plan-results" aria-live="polite">
        {!plan ? <div className="day-empty"><span aria-hidden="true">✳</span><p>{say("Your Kannur story starts here.", "നിങ്ങളുടെ കണ്ണൂർ യാത്ര ഇവിടെ തുടങ്ങുന്നു.")}</p><small>{say("Choose your pace and interests to see a route.", "സമയവും ഇഷ്ടങ്ങളും തിരഞ്ഞെടുത്ത് യാത്ര കാണൂ.")}</small></div> : <>
          <div className="day-result-head"><p className="day-kicker">02 / {say("YOUR ROUTE", "നിങ്ങളുടെ യാത്ര")}</p><h2>{ml ? plan.regionNameMl : plan.regionName}<br/><em>{say("at your pace.", "നിങ്ങളുടെ വേഗത്തിൽ.")}</em></h2><p>{plan.hours} {say("hour window", "മണിക്കൂർ സമയം")} · {plan.stops.length} {say("stops", "സ്റ്റോപ്പുകൾ")}</p></div>
          <div className="day-stops">{plan.stops.map((stop, index) => <article className="day-stop" key={stop.id}>
            <div className="day-stop-number">{String(index + 1).padStart(2, "0")}</div>
            <div className="day-stop-body">{stop.image && <figure className="day-stop-photo"><img src={stop.image} alt={stop.imageAlt} loading="lazy" decoding="async" /><figcaption><a href={stop.imageCreditUrl} target="_blank" rel="noopener noreferrer">{stop.imageCredit}</a></figcaption></figure>}<div className="day-stop-copy"><span>{ml ? interestLabels[stop.interest][1] : interestLabels[stop.interest][0]} · {ml ? stop.areaMl : stop.area}</span><h3>{ml ? stop.nameMl : stop.name}</h3><div><Link to={stop.detailPath}>{stop.type === "food" ? say("Food guide", "ഭക്ഷണ ഗൈഡ്") : say("Explore stop", "സ്ഥലം കാണൂ")} ↗</Link><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.mapsQuery)}`} target="_blank" rel="noopener noreferrer">{say("Map", "മാപ്പ്")} ↗</a></div></div></div>
          </article>)}</div>
          <div className={`day-result-actions${plan.mapLegs.length > 1 ? " multi" : ""}`}>{plan.mapLegs.map((url, index) => <a className="day-build" key={url} href={url} target="_blank" rel="noopener noreferrer">{plan.mapLegs.length === 1 ? say("Open route in Google Maps", "ഗൂഗിൾ മാപ്പിൽ യാത്ര കാണൂ") : say(`Open map · part ${index + 1}`, `മാപ്പ് · ഭാഗം ${index + 1}`)} ↗</a>)}<button className="day-share" type="button" onClick={sharePlan}>{say("Share this day", "യാത്ര പങ്കിടൂ")} ↗</button></div>
          {shareState && <p role="status" className="day-share-status">{shareState}</p>}
          <p className="day-caution">{say("Route order is curated, not optimized using live roads or traffic. For Dharmadam and Muzhappilangad, check tide and local access conditions. Respect worship timings and ritual guidance.", "യാത്രാക്രമം തത്സമയ റോഡ് വിവരങ്ങൾ അടിസ്ഥാനമാക്കിയുള്ളതല്ല. ധർമ്മടത്തും മുഴപ്പിലങ്ങാട്ടും വേലിയേറ്റവും പ്രവേശന സാഹചര്യങ്ങളും പരിശോധിക്കുക. ആരാധനാലയങ്ങളിലെ സമയവും ആചാരങ്ങളും മാനിക്കുക.")}</p>
        </>}
      </section>
    </div>
  </main>;
}
