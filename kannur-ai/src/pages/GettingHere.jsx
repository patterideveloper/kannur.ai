import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Icon from "../components/Icon";

const distances = [
  { city: "Bengaluru", cityMl: "ബെംഗളൂരു", km: "~315 km", hours: "~6 hrs by road" },
  { city: "Kochi", cityMl: "കൊച്ചി", km: "~275 km", hours: "~5.5 hrs by road" },
  { city: "Kozhikode", cityMl: "കോഴിക്കോട്", km: "~90 km", hours: "~2 hrs by road" },
  { city: "Mangaluru", cityMl: "മംഗളൂരു", km: "~140 km", hours: "~3 hrs by road" },
];

export default function GettingHere({ lang }) {
  const ml = lang === "ml";
  const say = (en, mal) => (ml ? mal : en);

  return (
    <main className="page">
      <Seo
        lang={lang}
        path="/how-to-reach-kannur"
        title="How to Reach Kannur: Flight, Train & Road Routes | Kannur.io"
        description={say(
          "Getting to Kannur, Kerala by flight, train or road — Kannur International Airport, Kannur Railway Station, and NH66 road distances from Bengaluru, Kochi, Kozhikode and Mangaluru.",
          "വിമാനം, ട്രെയിൻ, റോഡ് മാർഗം കണ്ണൂരിൽ എത്തിച്ചേരുന്നതെങ്ങനെ — വിമാനത്താവളം, റെയിൽവേ സ്റ്റേഷൻ, NH66 റോഡ് ദൂരങ്ങൾ.",
        )}
      />
      <section className="page-hero">
        <Link className="back-link" to="/">
          {say("Back to Home", "ഹോം")}
        </Link>
        <p className="eyebrow">{say("GETTING HERE", "എത്തിച്ചേരൽ")}</p>
        <h1>{say("How to reach Kannur", "കണ്ണൂരിൽ എത്തിച്ചേരുന്നതെങ്ങനെ")}</h1>
        <p>
          {say(
            "By air, rail or road — Kannur sits on Kerala's northern coast, well connected to Bengaluru, Kochi, Mangaluru and the rest of the Malabar coast.",
            "വിമാനം, ട്രെയിൻ, റോഡ് — കേരളത്തിന്റെ വടക്കൻ തീരത്തുള്ള കണ്ണൂർ ബെംഗളൂരു, കൊച്ചി, മംഗളൂരു എന്നിവയുമായി നന്നായി ബന്ധപ്പെട്ടിരിക്കുന്നു.",
          )}
        </p>
      </section>

      <section className="info-section">
        <div className="info-grid compact">
          <article className="info-card">
            <div className="route-card-icon">
              <Icon name="plane" />
            </div>
            <h3>{say("By air", "വിമാനമാർഗം")}</h3>
            <p className="info-desc">
              {say(
                "Kannur International Airport (CNN) is in Mattannur, around 25–28 km from Kannur town, with domestic and international connections. Calicut International Airport (CCJ, ~128 km) and Mangaluru's Bajpe Airport (IXE, ~149 km) are the nearest alternatives.",
                "മട്ടന്നൂരിലുള്ള കണ്ണൂർ അന്താരാഷ്ട്ര വിമാനത്താവളം (CNN) കണ്ണൂർ നഗരത്തിൽ നിന്ന് ഏകദേശം 25–28 കി.മീ. അകലെയാണ്. കോഴിക്കോട് (CCJ, ~128 കി.മീ.), മംഗളൂരു ബജ്പെ (IXE, ~149 കി.മീ.) എന്നിവയാണ് സമീപ ബദൽ വിമാനത്താവളങ്ങൾ.",
              )}
            </p>
          </article>
          <article className="info-card">
            <div className="route-card-icon">
              <Icon name="train" />
            </div>
            <h3>{say("By train", "ട്രെയിൻ മാർഗം")}</h3>
            <p className="info-desc">
              {say(
                "Kannur Railway Station (CAN) sits on the main west coast line, with regular trains to Bengaluru, Mumbai, Chennai, Kochi and Thiruvananthapuram. Thalassery and Payyanur also have their own stations for the southern and northern ends of the district.",
                "പ്രധാന പശ്ചിമതീര പാതയിലുള്ള കണ്ണൂർ റെയിൽവേ സ്റ്റേഷൻ (CAN) ബെംഗളൂരു, മുംബൈ, ചെന്നൈ, കൊച്ചി, തിരുവനന്തപുരം എന്നിവയുമായി ബന്ധപ്പെട്ടിരിക്കുന്നു. ജില്ലയുടെ തെക്കും വടക്കും ഭാഗത്ത് തലശ്ശേരി, പയ്യന്നൂർ സ്റ്റേഷനുകളുമുണ്ട്.",
              )}
            </p>
          </article>
          <article className="info-card">
            <div className="route-card-icon">
              <Icon name="car" />
            </div>
            <h3>{say("By road", "റോഡ് മാർഗം")}</h3>
            <p className="info-desc">
              {say(
                "National Highway 66 (NH66) runs along the coast through Kannur, connecting Kochi in the south to Mangaluru in the north. Regular interstate buses also run from Kannur Bus Station to major cities.",
                "കൊച്ചി മുതൽ മംഗളൂരു വരെ തീരത്തിലൂടെ കടന്നുപോകുന്ന ദേശീയ പാത 66 (NH66) കണ്ണൂരിലൂടെ കടന്നുപോകുന്നു. കണ്ണൂർ ബസ് സ്റ്റേഷനിൽ നിന്ന് പ്രധാന നഗരങ്ങളിലേക്ക് സ്ഥിരം ഇന്റർസ്റ്റേറ്റ് ബസുകളുമുണ്ട്.",
              )}
            </p>
          </article>
        </div>
      </section>

      <section className="info-section">
        <div className="section-head">
          <h2>{say("Approximate road distances", "ഏകദേശ റോഡ് ദൂരങ്ങൾ")}</h2>
          <p>
            {say(
              "Driving times vary with traffic and route — these are rough guides, not live estimates.",
              "ഗതാഗതവും വഴിയും അനുസരിച്ച് സമയം മാറാം — ഇവ ഏകദേശ കണക്കുകളാണ്, തത്സമയമല്ല.",
            )}
          </p>
        </div>
        <div className="distance-table">
          {distances.map((row) => (
            <div className="distance-row" key={row.city}>
              <span className="distance-city">{say(row.city, row.cityMl)}</span>
              <span className="distance-km">{row.km}</span>
              <span className="distance-hours">{row.hours}</span>
            </div>
          ))}
        </div>
        <p className="route-disclaimer">
          {say(
            "Distances are approximate road-route figures and may vary by exact origin and route chosen. Always check current flight, train and bus schedules before booking — they change seasonally.",
            "ഇവ ഏകദേശ റോഡ് ദൂരങ്ങളാണ്; കൃത്യമായ തുടക്കസ്ഥലവും വഴിയും അനുസരിച്ച് മാറാം. ബുക്ക് ചെയ്യുന്നതിന് മുമ്പ് നിലവിലെ വിമാന, ട്രെയിൻ, ബസ് സമയക്രമം പരിശോധിക്കുക — ഇവ സീസൺ അനുസരിച്ച് മാറാം.",
          )}
        </p>
      </section>

      <section className="info-section">
        <div className="section-head">
          <h2>{say("Once you're here", "എത്തിക്കഴിഞ്ഞാൽ")}</h2>
          <p>
            {say(
              "Let us help you make the most of your time in Kannur.",
              "കണ്ണൂരിലെ സമയം പരമാവധി ഉപയോഗപ്പെടുത്താൻ ഞങ്ങൾ സഹായിക്കാം.",
            )}
          </p>
        </div>
        <div className="info-grid compact">
          <Link to="/plan" className="info-card route-cta-card">
            <h3>{say("Plan my day", "യാത്ര പ്ലാൻ ചെയ്യൂ")}</h3>
            <p className="info-desc">
              {say("Build a route around your time and interests.", "നിങ്ങളുടെ സമയവും ഇഷ്ടങ്ങളും അനുസരിച്ച് ഒരു യാത്ര തയ്യാറാക്കൂ.")}
            </p>
          </Link>
          <Link to="/explore" className="info-card route-cta-card">
            <h3>{say("Explore places", "സ്ഥലങ്ങൾ കാണൂ")}</h3>
            <p className="info-desc">
              {say("Beaches, forts, hills, temples and more.", "ബീച്ചുകൾ, കോട്ടകൾ, കുന്നുകൾ, ക്ഷേത്രങ്ങൾ എന്നിവ.")}
            </p>
          </Link>
          <Link to="/resorts" className="info-card route-cta-card">
            <h3>{say("Find a stay", "താമസം കണ്ടെത്തൂ")}</h3>
            <p className="info-desc">
              {say("Beach resorts, hill retreats and backwater stays.", "കടൽത്തീര റിസോർട്ടുകളും മലനിര വിശ്രമകേന്ദ്രങ്ങളും.")}
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
