import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
export default function Directory({ lang, t }) {
  const ml = lang === "ml";
  const cards = [
    ["/resorts", "wave", "Resorts & stays", "റിസോർട്ടുകളും താമസങ്ങളും", "Beach resorts, hill retreats and backwater stays", "കടൽത്തീരത്തും മലനിരകളിലും കായലോരത്തും താമസങ്ങൾ"],
    [
      "/hospitals",
      "heart",
      "Hospitals & essentials",
      "ആശുപത്രികളും അവശ്യ സേവനങ്ങളും",
      "Healthcare contacts and directions",
      "ആരോഗ്യ സേവനങ്ങളും വഴികാട്ടിയും",
    ],
    [
      "/automobiles",
      "compass",
      "Automobiles",
      "വാഹനങ്ങൾ",
      "Car and motorcycle showrooms",
      "കാർ, ബൈക്ക് ഷോറൂമുകൾ",
    ],
    [
      "/eats",
      "sun",
      "Local eateries",
      "നാടൻ ഭക്ഷണശാലകൾ",
      "Find your next Malabar meal",
      "മലബാറിന്റെ രുചികൾ കണ്ടെത്തൂ",
    ],
    [
      "/people",
      "culture",
      "People of Kannur",
      "കണ്ണൂരിലെ പ്രമുഖർ",
      "Meet the district through its people",
      "മനുഷ്യരിലൂടെ നാടിനെ അറിയാം",
    ],
    [
      "/events",
      "grid",
      "Annual events",
      "വാർഷിക ആഘോഷങ്ങൾ",
      "Festivals and community traditions",
      "ഉത്സവങ്ങളും നാടിന്റെ പാരമ്പര്യങ്ങളും",
    ],
    [
      "/explore/shopping",
      "grid",
      "Shopping & handloom",
      "ഷോപ്പിംഗും കൈത്തറിയും",
      "Something local to take home",
      "നാടിന്റെ ഓർമകൾ വീട്ടിലേക്ക്",
    ],
  ];
  return (
    <main className="page">
      <Seo lang={lang} path="/directory" title="Local directory | Kannur.io" />
      <section className="page-hero">
        <Link className="back-link" to="/">
          {ml ? "ഹോം" : "Home"}
        </Link>
        <p className="eyebrow">
          {ml ? "കണ്ണൂരിന്റെ നിത്യജീവിതം" : "THE EVERYDAY SIDE OF KANNUR"}
        </p>
        <h1>{ml ? "നിങ്ങളുടെ പ്രാദേശിക ഡയറക്ടറി." : "Good to have nearby."}</h1>
        <p>
          {ml
            ? "സേവനങ്ങളും കടകളും നാടിന്റെ വിശേഷങ്ങളും കണ്ടെത്തൂ."
            : "Useful places, local businesses and the people who make this district home."}
        </p>
      </section>
      <div className="directory-grid">
        {cards.map(([to, icon, en, mal, desc, descMl]) => (
          <Link className="directory-card" key={to} to={to}>
            <Icon name={icon} />
            <h2>{ml ? mal : en}</h2>
            <p>{ml ? descMl : desc}</p>
            <span className="text-link">
              {ml ? "കാണുക" : "Take a look"}
              <Icon />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
