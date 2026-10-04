import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import { buildDayPlan, parseItinerarySlug } from "../lib/dayPlanner";
import "./dayPlanner.css";

const interestLabels = {
  coast: ["Coast", "കടൽത്തീരം"],
  culture: ["Culture", "സംസ്കാരം"],
  nature: ["Nature", "പ്രകൃതി"],
  food: ["Local food", "നാടൻ ഭക്ഷണം"],
};

export default function Itinerary({ lang }) {
  const ml = lang === "ml";
  const say = (en, mal) => (ml ? mal : en);
  const { slug } = useParams();
  const parsed = parseItinerarySlug(slug);

  if (!parsed) {
    return (
      <main className="page">
        <section className="page-hero">
          <Link className="back-link" to="/plan">
            {say("Back to the day planner", "ദിവസ പ്ലാനറിലേക്ക് മടങ്ങുക")}
          </Link>
          <h1>{say("Itinerary not found", "ഇറ്റിനറി കണ്ടെത്തിയില്ല")}</h1>
        </section>
      </main>
    );
  }

  const plan = buildDayPlan({ region: parsed.region, hours: parsed.hours, interests: ["coast", "culture", "food"] });
  const regionName = ml ? plan.regionNameMl : plan.regionName;
  const title = `${plan.hours}-Hour ${plan.regionName} Itinerary | Kannur.io`;
  const description = say(
    `A ready-made ${plan.hours}-hour route around ${plan.regionName}, with ${plan.stops.length} stops picked from our Kannur guide and a one-tap Google Maps route.`,
    `${regionName}യിൽ ${plan.hours} മണിക്കൂർ ദൈർഘ്യമുള്ള തയ്യാറായ യാത്രാ പദ്ധതി — ${plan.stops.length} സ്റ്റോപ്പുകളും ഗൂഗിൾ മാപ്പ് റൂട്ടും സഹിതം.`,
  );

  return (
    <main className="day-page">
      <Seo lang={lang} path={`/plan/${slug}`} title={title} description={description} image="/images/hero/kannur_premium-1200.jpg" />
      <section className="day-hero">
        <div className="day-hero-inner">
          <Link className="back-link" to="/plan">
            {say("Build your own instead", "സ്വന്തം യാത്ര തയ്യാറാക്കൂ")}
          </Link>
          <p className="day-kicker">{say("READY-MADE ROUTE", "തയ്യാറായ യാത്രാപദ്ധതി")}</p>
          <h1>
            {plan.hours} {say("hours in", "മണിക്കൂർ")} <em>{regionName}.</em>
          </h1>
          <p>
            {say(
              "A complete day, already mapped out — coast, culture and a local food stop, using places already in our Kannur guide.",
              "പൂർണ്ണമായ ഒരു ദിവസം, മുൻകൂട്ടി തയ്യാറാക്കിയത് — കടൽത്തീരം, സംസ്കാരം, നാടൻ ഭക്ഷണം എന്നിവ ഉൾപ്പെടെ.",
            )}
          </p>
        </div>
      </section>

      <div className="day-results-shell">
        <section className="day-results" aria-live="polite">
          <div className="day-result-head">
            <p className="day-kicker">{say("YOUR ROUTE", "നിങ്ങളുടെ യാത്ര")}</p>
            <h2>
              {regionName}
              <br />
              <em>{say("at your pace.", "നിങ്ങളുടെ വേഗത്തിൽ.")}</em>
            </h2>
            <p>
              {plan.hours} {say("hour window", "മണിക്കൂർ സമയം")} · {plan.stops.length} {say("stops", "സ്റ്റോപ്പുകൾ")}
            </p>
          </div>
          <div className="day-stops">
            {plan.stops.map((stop, index) => (
              <article className="day-stop" key={stop.id}>
                <div className="day-stop-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="day-stop-body">
                  {stop.image && (
                    <figure className="day-stop-photo">
                      <img src={stop.image} alt={stop.imageAlt} loading="lazy" decoding="async" />
                      <figcaption>
                        <a href={stop.imageCreditUrl} target="_blank" rel="noopener noreferrer">
                          {stop.imageCredit}
                        </a>
                      </figcaption>
                    </figure>
                  )}
                  <div className="day-stop-copy">
                    <span>
                      {ml ? interestLabels[stop.interest][1] : interestLabels[stop.interest][0]} · {ml ? stop.areaMl : stop.area}
                    </span>
                    <h3>{ml ? stop.nameMl : stop.name}</h3>
                    <div>
                      <Link to={stop.detailPath}>
                        {stop.type === "food" ? say("Food guide", "ഭക്ഷണ ഗൈഡ്") : say("Explore stop", "സ്ഥലം കാണൂ")} ↗
                      </Link>
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.mapsQuery)}`} target="_blank" rel="noopener noreferrer">
                        {say("Map", "മാപ്പ്")} ↗
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className={`day-result-actions${plan.mapLegs.length > 1 ? " multi" : ""}`}>
            {plan.mapLegs.map((url, index) => (
              <a className="day-build" key={url} href={url} target="_blank" rel="noopener noreferrer">
                {plan.mapLegs.length === 1 ? say("Open route in Google Maps", "ഗൂഗിൾ മാപ്പിൽ യാത്ര കാണൂ") : say(`Open map · part ${index + 1}`, `മാപ്പ് · ഭാഗം ${index + 1}`)} ↗
              </a>
            ))}
            <Link className="day-share" to={`/plan?plan=1&area=${plan.region}&hours=${plan.hours}&interests=${plan.interests.join(",")}`}>
              {say("Customize this day", "ഈ യാത്ര ക്രമീകരിക്കൂ")} ↗
            </Link>
          </div>
          <p className="day-caution">
            {say(
              "Route order is curated, not optimized using live roads or traffic. For Dharmadam and Muzhappilangad, check tide and local access conditions. Respect worship timings and ritual guidance.",
              "യാത്രാക്രമം തത്സമയ റോഡ് വിവരങ്ങൾ അടിസ്ഥാനമാക്കിയുള്ളതല്ല. ധർമ്മടത്തും മുഴപ്പിലങ്ങാട്ടും വേലിയേറ്റവും പ്രവേശന സാഹചര്യങ്ങളും പരിശോധിക്കുക. ആരാധനാലയങ്ങളിലെ സമയവും ആചാരങ്ങളും മാനിക്കുക.",
            )}
          </p>
        </section>
      </div>
    </main>
  );
}
