import { lazy, Suspense, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
import HistorySection from "../components/HistorySection";
import { places } from "../data/places";
import { videos } from "../data/media";
const CivicUpdates = lazy(() => import("../components/CivicUpdates"));
const categories = [
  ["beaches", "wave", "By the sea", "കടൽത്തീരങ്ങൾ"],
  ["heritage", "culture", "Heritage", "പൈതൃകം"],
  ["hills", "mountain", "Into the hills", "മലനിരകൾ"],
  ["temples", "sun", "Sacred spaces", "പുണ്യസ്ഥലങ്ങൾ"],
  ["shopping", "grid", "Local finds", "നാടൻ വിപണി"],
];
const collections = [
  {
    title: "Chase the coastline",
    ml: "തീരങ്ങൾ തേടി",
    tag: "SALT IN THE AIR",
    tagMl: "കടൽക്കാറ്റിൽ",
    image: "muzhappilangad_sunset",
    path: "/explore/beaches",
    icon: "wave",
  },
  {
    title: "Walk through history",
    ml: "ചരിത്രത്തിലൂടെ",
    tag: "STORIES IN STONE",
    tagMl: "കല്ലിലെ കഥകൾ",
    image: "st_angelo_fort",
    path: "/explore/heritage",
    icon: "culture",
  },
  {
    title: "Take the slow road",
    ml: "ശാന്തമായ യാത്ര",
    tag: "A LITTLE MORE GREEN",
    tagMl: "പച്ചപ്പിലേക്ക്",
    image: "dharmadam_island",
    path: "/explore/nature",
    icon: "mountain",
  },
];
export default function Home({ lang, t }) {
  const ml = lang === "ml";
  const say = (en, mal) => (ml ? mal : en);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState("beach");
  const [sound, setSound] = useState(null);
  const [soundError, setSoundError] = useState(false);
  const [showCivic, setShowCivic] = useState(false);
  const audio = useRef(null);
  const picks = places
    .filter((p) => (p.tags || []).includes(selection))
    .slice(0, 4);
  async function toggleSound(id) {
    if (!audio.current) return;
    if (sound === id) {
      audio.current.pause();
      setSound(null);
      return;
    }
    setSoundError(false);
    audio.current.src = `/media/${id}.mp3`;
    try {
      await audio.current.play();
      setSound(id);
    } catch {
      setSoundError(true);
      setSound(null);
    }
  }
  return (
    <main className="home-new">
      <Seo
        lang={lang}
        path="/"
        title="Kannur Tourism: Beaches, Theyyam & Places to Visit | Kannur.io"
        description="Explore Kannur, Kerala: beaches, Theyyam rituals, heritage, local food, resorts and practical travel information. A bilingual guide to North Malabar."
        image="/images/hero/kannur_premium-1200.jpg"
      />
      <section className="destination-hero">
        <picture className="destination-photo">
          <source
            type="image/webp"
            srcSet="/images/hero/kannur_premium-480.webp 480w, /images/hero/kannur_premium-800.webp 800w, /images/hero/kannur_premium-1600.webp 1600w"
          />
          <img
            src="/images/hero/kannur_premium-1200.jpg"
            sizes="100vw"
            alt={say(
              "Sunset over Kannur's rocky coastline",
              "കണ്ണൂരിലെ തീരത്ത് സൂര്യാസ്തമയം",
            )}
            fetchpriority="high"
          />
        </picture>
        <div className="hero-shade" />
        <div className="destination-copy">
          <p className="eyebrow light">
            <span className="tiny-star">✳</span>{" "}
            {say(
              "KERALA, A LITTLE FURTHER NORTH",
              "കേരളത്തിന്റെ വടക്കൻ തീരത്ത്",
            )}
          </p>
          <h1>
            {say("Some places stay", "ചില നാടുകൾ")}
            <br />
            <em>{say("with you.", "മനസ്സിൽ തങ്ങും.")}</em>
          </h1>
          <p className="destination-intro">
            {say(
              "A coast that slows you down. A culture that stirs your soul. This is Kannur.",
              "യാത്രയുടെ വേഗം കുറയ്ക്കുന്ന തീരം. മനസ്സിനെ തൊടുന്ന സംസ്കാരം. ഇതാണ് കണ്ണൂർ.",
            )}
          </p>
          <form
            className="discovery-search"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(
                `/explore${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`,
              );
            }}
          >
            <Icon name="search" />
            <input
              aria-label={say("Search Kannur", "കണ്ണൂരിൽ തിരയുക")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={say(
                "Where would you like to go?",
                "എവിടേക്കാണ് യാത്ര?",
              )}
            />
            <button aria-label={say("Explore results", "സ്ഥലങ്ങൾ കണ്ടെത്തുക")}>
              <Icon />
            </button>
          </form>
          <div className="hero-suggestions">
            <span>{say("Start with", "ഇവിടെ തുടങ്ങാം")}</span>
            <Link className="plan-chip" to="/plan">{say("Plan my day ↗", "യാത്ര പ്ലാൻ ചെയ്യൂ ↗")}</Link>
            <Link to="/explore/beaches">{say("Beaches", "ബീച്ചുകൾ")}</Link>
            <Link to="/theyyam">{say("Theyyam", "തെയ്യം")}</Link>
            <Link to="/eats">{say("Local food", "നാടൻ ഭക്ഷണം")}</Link>
          </div>
        </div>
        <div className="hero-footnote">
          <span>
            <Icon name="pin" />{" "}
            {say("Kannur · Malabar Coast", "കണ്ണൂർ · മലബാർ തീരം")}
          </span>
          <a href="#discover">{say("SCROLL TO DISCOVER", "കൂടുതൽ കാണുക")} ↓</a>
        </div>
      </section>
      <div className="destination-strip">
        <span>
          {say("THE LAND OF LOOMS & LORES", "തറികളുടെയും തിറകളുടെയും നാട്")}
        </span>
        <span>11.87° N &nbsp; 75.37° E</span>
        <span>
          {say("YOUR LOCAL WINDOW INTO KANNUR", "കണ്ണൂരിനെ അടുത്തറിയാം")}
        </span>
      </div>
      <section className="section-shell intro-section" id="discover">
        <div>
          <p className="eyebrow">
            {say("NOT JUST A DESTINATION", "ഒരു യാത്രയേക്കാൾ കൂടുതൽ")}
          </p>
          <h2>
            {say("Find your kind", "നിങ്ങളുടെ ഇഷ്ടങ്ങൾക്കൊപ്പം")}
            <br />
            <em>{say("of Kannur.", "കണ്ണൂരിൽ.")}</em>
          </h2>
        </div>
        <p className="section-lead">
          {say(
            "Follow the sea breeze, find a story in an old fort, or lose track of time watching a loom. There is more than one way to belong here.",
            "കടൽക്കാറ്റിനെ പിന്തുടരൂ, പഴയ കോട്ടയിലെ കഥകൾ തേടൂ, കൈത്തറിയുടെ താളത്തിൽ സമയം മറക്കൂ. കണ്ണൂരിനെ അറിയാൻ വഴികൾ പലതാണ്.",
          )}
        </p>
      </section>
      <nav
        className="category-rail section-shell"
        aria-label={say("Explore by experience", "അനുഭവങ്ങൾ തിരഞ്ഞെടുക്കുക")}
      >
        {categories.map(([path, icon, en, mal]) => (
          <Link key={path} to={`/explore/${path}`}>
            <span className="category-icon">
              <Icon name={icon} />
            </span>
            <span>{say(en, mal)}</span>
            <Icon />
          </Link>
        ))}
      </nav>
      <section className="collection-grid section-shell">
        {collections.map((item, i) => (
          <Link
            className={`collection-card collection-${i}`}
            to={item.path}
            key={item.path}
          >
            <img
              src={`/images/hero/${item.image}-800.webp`}
              alt={say(item.title, item.ml)}
              loading="lazy"
            />
            <div className="collection-copy">
              <p className="eyebrow light">{say(item.tag, item.tagMl)}</p>
              <h3>{say(item.title, item.ml)}</h3>
            </div>
            <span className="round-arrow">
              <Icon />
            </span>
          </Link>
        ))}
      </section>
      <section className="section-shell places-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {say("A GOOD PLACE TO START", "യാത്ര ഇവിടെ തുടങ്ങാം")}
            </p>
            <h2>{say("Worth the detour.", "വഴിമാറി കാണേണ്ടവ.")}</h2>
          </div>
          <Link className="text-link" to="/explore">
            {say("All places", "എല്ലാ സ്ഥലങ്ങളും")} <Icon />
          </Link>
        </div>
        <div
          className="editor-tabs"
          role="group"
          aria-label={say("Featured places", "തിരഞ്ഞെടുത്ത സ്ഥലങ്ങൾ")}
        >
          {[
            ["beach", "Coast", "തീരം"],
            ["heritage", "Heritage", "പൈതൃകം"],
            ["hill", "Hills", "മലകൾ"],
          ].map(([id, en, mal]) => (
            <button
              key={id}
              aria-pressed={selection === id}
              className={selection === id ? "selected" : ""}
              onClick={() => setSelection(id)}
            >
              {say(en, mal)}
            </button>
          ))}
        </div>
        <div className="featured-grid">
          {picks.map((place) => (
            <article className="featured-card" key={place.id}>
              <Link
                to={`/explore/place/${place.id}`}
                className="featured-image"
              >
                <img
                  src={place.images?.[0]?.url}
                  alt={say(place.name, place.nameMl || place.name)}
                  loading="lazy"
                  decoding="async"
                />
                <span className="photo-label">
                  {t.types[place.type.toLowerCase()] || place.type}
                </span>
              </Link>
              <p className="mini-area">
                <Icon name="pin" />
                {say(place.area, place.areaMl || place.area)}
              </p>
              <h3>
                <Link to={`/explore/place/${place.id}`}>
                  {say(place.name, place.nameMl || place.name)}
                </Link>
              </h3>
              <Link className="text-link" to={`/explore/place/${place.id}`}>
                {say("Discover this place", "കൂടുതൽ അറിയുക")}
                <Icon />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <HistorySection lang={lang} />
      <section className="ritual-section">
        <div className="ritual-photo">
          <img
            src="/images/hero/theyyam_fire-1200.webp"
            alt={say(
              "Theyyam ritual in firelight",
              "തീയുടെ വെളിച്ചത്തിൽ തെയ്യം",
            )}
            loading="lazy"
          />
        </div>
        <div className="ritual-copy">
          <p className="eyebrow light">
            {say("THE SOUL OF NORTH MALABAR", "വടക്കൻ മലബാറിന്റെ ആത്മാവ്")}
          </p>
          <h2>
            {say("More than a moment.", "ഒരു കാഴ്ചയ്ക്കപ്പുറം.")}
            <br />
            <em>{say("A living tradition.", "ജീവിക്കുന്ന പാരമ്പര്യം.")}</em>
          </h2>
          <p>
            {say(
              "The elaborate colours. The rhythm of chenda. The stories passed down through generations. Theyyam is a sacred ritual woven into the life of Kannur's communities.",
              "വർണാഭമായ വേഷങ്ങൾ. ചെണ്ടയുടെ താളം. തലമുറകളിലൂടെ കൈമാറിയ കഥകൾ. കണ്ണൂരിന്റെ സാമൂഹിക ജീവിതത്തോട് ചേർന്നുനിൽക്കുന്ന പവിത്രമായ അനുഷ്ഠാനമാണ് തെയ്യം.",
            )}
          </p>
          <Link className="button cream" to="/theyyam">
            {say("Explore the Theyyam calendar", "തെയ്യം കലണ്ടർ കാണുക")}
            <Icon />
          </Link>
          <span className="ritual-note">
            {say(
              "Rituals follow local calendars. Check dates and visiting guidance before you go.",
              "ചടങ്ങുകൾ പ്രാദേശിക കലണ്ടർ അനുസരിച്ചാണ്. തീയതികളും സന്ദർശന നിർദ്ദേശങ്ങളും മുൻകൂട്ടി പരിശോധിക്കുക.",
            )}
          </span>
        </div>
      </section>
      <section className="section-shell everyday-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {say("GET TO KNOW THE PLACE", "നാടിനെ അടുത്തറിയാം")}
            </p>
            <h2>{say("Beyond the postcard.", "കാഴ്ചകൾക്കപ്പുറം.")}</h2>
          </div>
          <p>
            {say(
              "The people, flavours and everyday life that make it Kannur.",
              "കണ്ണൂരിനെ കണ്ണൂരാക്കുന്ന മനുഷ്യരും രുചികളും നിത്യജീവിതവും.",
            )}
          </p>
        </div>
        <div className="story-links">
          {[
            [
              "/eats",
              "01",
              "Taste Malabar",
              "മലബാറിന്റെ രുചി",
              "Local eateries & signature dishes",
              "നാടൻ ഭക്ഷണവും പ്രത്യേക വിഭവങ്ങളും",
            ],
            [
              "/people",
              "02",
              "Meet its people",
              "കണ്ണൂരിലെ പ്രമുഖർ",
              "Lives that shaped the district",
              "നാടിനെ രൂപപ്പെടുത്തിയ ജീവിതങ്ങൾ",
            ],
            [
              "/events",
              "03",
              "Be part of the occasion",
              "ആഘോഷങ്ങളിൽ പങ്കുചേരാം",
              "Festivals & annual gatherings",
              "ഉത്സവങ്ങളും വാർഷിക ആഘോഷങ്ങളും",
            ],
          ].map(([to, n, en, mal, desc, descMl]) => (
            <Link to={to} key={to}>
              <span className="story-number">{n}</span>
              <div>
                <h3>{say(en, mal)}</h3>
                <p>{say(desc, descMl)}</p>
              </div>
              <Icon />
            </Link>
          ))}
        </div>
      </section>
      <section className="section-shell listening-section">
        <div>
          <p className="eyebrow">
            {say("PAUSE. PRESS PLAY.", "ഒന്ന് നിൽക്കൂ. കേൾക്കൂ.")}
          </p>
          <h2>
            {say("A place with its", "ഈ നാടിന്")}{" "}
            <em>{say("own rhythm.", "സ്വന്തം താളം.")}</em>
          </h2>
        </div>
        <div className="listen-controls">
          {[
            ["theyyam-chenda", "Chenda", "ചെണ്ട"],
            ["muzhappilangad-waves", "Waves", "തിരമാലകൾ"],
            ["chirakkal-handloom", "Handloom", "കൈത്തറി"],
          ].map(([id, en, mal]) => (
            <button
              key={id}
              aria-pressed={sound === id}
              className={sound === id ? "playing" : ""}
              onClick={() => toggleSound(id)}
            >
              <Icon name="sound" />
              {say(en, mal)}
              <span>{sound === id ? "Ⅱ" : "▷"}</span>
            </button>
          ))}
          <audio ref={audio} preload="none" onEnded={() => setSound(null)} />
          {soundError && (
            <p role="status">
              {say(
                "This audio could not be played. Please try again.",
                "ഓഡിയോ ലഭ്യമല്ല. വീണ്ടും ശ്രമിക്കുക.",
              )}
            </p>
          )}
        </div>
      </section>
      <section
        className="section-shell film-links"
        aria-label={say("Films from Kannur", "കണ്ണൂരിന്റെ കാഴ്ചകൾ")}
      >
        {videos.map((video) => (
          <a
            key={video.id}
            className="text-link"
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noreferrer"
          >
            {say(video.title, video.titleMl)}{" "}
            <span>{say("Watch film", "വീഡിയോ കാണുക")}</span>
            <Icon />
          </a>
        ))}
      </section>
      <section className="section-shell stay-home">
        <img src="/images/resorts/ktdc-malabar-courtyard/cover.webp" srcSet="/images/resorts/ktdc-malabar-courtyard/cover-small.webp 480w, /images/resorts/ktdc-malabar-courtyard/cover.webp 960w" sizes="(max-width:650px) 100vw, 50vw" loading="lazy" width="960" height="640" alt={say("KTDC Malabar Courtyard, Muzhappilangad", "കെടിഡിസി മലബാർ കോർട്ട്യാർഡ്, മുഴപ്പിലങ്ങാട്")} />
        <div><p className="eyebrow">{say("MAKE YOURSELF AT HOME", "ഇവിടെ തങ്ങാം")}</p>
        <h2>{say("A little longer. A little closer.", "കുറച്ചുകൂടി നേരം. നാടിനോടു ചേർന്ന്.")}</h2>
        <p>{say("Wake up by the sea, hide away in the hills, or slow down by the backwaters. Discover resorts and stays across Kannur and nearby Kasaragod.", "കടൽത്തീരത്തും മലനിരകളിലും കായലോരത്തും താമസിക്കാം. കണ്ണൂരിലെയും സമീപത്തെ കാസർഗോഡിലെയും റിസോർട്ടുകൾ കണ്ടെത്തൂ.")}</p>
        <Link className="button" to="/resorts">{say("Find your stay", "താമസസ്ഥലം കണ്ടെത്തൂ")}<Icon /></Link></div>
      </section>
      <section className="section-shell local-section">
        <div>
          <p className="eyebrow">
            {say("FOR VISITORS. FOR LOCALS.", "സന്ദർശകർക്കും നാട്ടുകാർക്കും.")}
          </p>
          <h2>{say("The practical side.", "ഉപയോഗപ്രദമായ വിവരങ്ങൾ.")}</h2>
          <p>
            {say(
              "Find local services, showrooms and district information in one place.",
              "പ്രാദേശിക സേവനങ്ങളും ഷോറൂമുകളും ജില്ലാ വിവരങ്ങളും ഒരിടത്ത്.",
            )}
          </p>
        </div>
        <Link className="button" to="/directory">
          {say("Open the local directory", "പ്രാദേശിക ഡയറക്ടറി")}
          <Icon />
        </Link>
      </section>
      <section className="section-shell civic-disclosure">
        <button
          aria-expanded={showCivic}
          aria-controls="civic-panel"
          onClick={() => setShowCivic((v) => !v)}
        >
          <span>
            {say("District & civic information", "ജില്ലാ ഭരണവും സേവനങ്ങളും")}
          </span>
          <span>{showCivic ? "−" : "+"}</span>
        </button>
        {showCivic && (
          <div id="civic-panel">
            <Suspense fallback={<p>{say("Loading…", "ലോഡ് ചെയ്യുന്നു…")}</p>}>
              <CivicUpdates lang={lang} />
            </Suspense>
          </div>
        )}
      </section>
    </main>
  );
}
