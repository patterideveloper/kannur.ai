import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
const bentoCards = [
  {
    id: "theyyam",
    size: "large",
    title: "The Red Ritual",
    copy: "Not a dance, but a living god.",
    image: "/bento/theyyam.svg",
  },
  {
    id: "beach",
    size: "wide",
    title: "Drive the Tide",
    copy: "4km of firm sand. Windows down. Arabian Sea at your wheels.",
    image: "/bento/beach.svg",
  },
  {
    id: "cake",
    size: "small",
    title: "The First Slice",
    copy: "Did you know the first Indian cake was baked here in 1883?",
    image: "/bento/cake.svg",
  },
  {
    id: "mist",
    size: "small",
    title: "Mist & Moss",
    copy: "Trek the Paithalmala heights for a view above the clouds.",
    image: "/bento/mist.svg",
  },
];

export default function Home({ lang, t, setLang, menuOpen, setMenuOpen }) {
  const whyRef = useRef(null);
  const audioRef = useRef(null);
  const [activeSound, setActiveSound] = useState(null);
  const videoRef = useRef(null);
  const [videoActive, setVideoActive] = useState(false);
  const whyVideoRef = useRef(null);
  const [whyVideoActive, setWhyVideoActive] = useState(false);
  const [civicLoading, setCivicLoading] = useState(true);
  const [civicData, setCivicData] = useState(null);
  const [activeCivicUpdate, setActiveCivicUpdate] = useState(0);
  const roleLabel = (role) => {
    if (lang !== "ml") return role;
    if (role === "Mayor") return "മേയർ";
    if (role === "Deputy Mayor") return "ഡെപ്യൂട്ടി മേയർ";
    if (role === "Secretary") return "സെക്രട്ടറി";
    if (role === "District Collector") return "ജില്ലാ കലക്ടർ";
    return role;
  };

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVideoActive(true);
          } else {
            setVideoActive(false);
          }
        });
      },
      { threshold: 0.6 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = whyVideoRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setWhyVideoActive(true);
          } else {
            setWhyVideoActive(false);
          }
        });
      },
      { threshold: 0.6 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const soundOptions = [
    {
      id: "theyyam",
      label: t?.home?.soundLabels?.theyyam || "Theyyam Drums (Chenda)",
      src: "/media/theyyam-chenda.mp3",
    },
    {
      id: "waves",
      label: t?.home?.soundLabels?.waves || "Muzhappilangad Waves",
      src: "/media/muzhappilangad-waves.mp3",
    },
    {
      id: "loom",
      label: t?.home?.soundLabels?.loom || "Chirakkal Handloom",
      src: "/media/chirakkal-handloom.mp3",
    },
  ];

  const handleSoundToggle = async (sound) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (activeSound?.id === sound.id) {
      audio.pause();
      setActiveSound(null);
      return;
    }
    audio.src = sound.src;
    try {
      await audio.play();
      setActiveSound(sound);
    } catch (error) {
      setActiveSound(null);
    }
  };

  useEffect(() => {
    const container = whyRef.current;
    if (!container) return;
    return undefined;
  }, []);

  useEffect(() => {
    const loadCivicData = async () => {
      try {
        setCivicLoading(true);
        const response = await fetch("/api/kannur-civic");
        const data = await response.json();
        if (!response.ok) throw new Error("civic fetch failed");
        setCivicData(data || null);
      } catch {
        setCivicData(null);
      } finally {
        setCivicLoading(false);
      }
    };

    loadCivicData();
  }, []);

  useEffect(() => {
    const updates = civicData?.updates || [];
    if (updates.length <= 1) return undefined;
    const interval = setInterval(() => {
      setActiveCivicUpdate((prev) => (prev + 1) % updates.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [civicData?.updates]);

  return (
    <main>
      <Seo
        lang={lang === "ml" ? "ml" : "en"}
        path="/"
        title="Kannur | Explore Tourism"
        description={
          lang === "ml"
            ? "കണ്ണൂരിലെ കടൽത്തീരങ്ങൾ, ക്ഷേത്രങ്ങൾ, ഭക്ഷണകേന്ദ്രങ്ങൾ, ഇവന്റ്‌లు എന്നിവ കണ്ടെത്തൂ."
            : "Explore beaches, temples, food, events, and cultural heritage across Kannur, Kerala."
        }
      />

      <header
        className="hero-hook civic-hook home-top-shell"
        onClick={() => {
          if (menuOpen) setMenuOpen(false);
        }}
      >
        <div className="hero-inner">
          <div className="hero-top">
          <div className="hero-banner">KANNUR.iO</div>
          <div
            className="lang-switcher"
            role="group"
            aria-label={lang === "ml" ? "ഭാഷ തിരഞ്ഞെടുക്കുക" : "Select language"}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={`lang-option ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-option ${lang === "ml" ? "active" : ""}`}
              onClick={() => setLang("ml")}
              aria-pressed={lang === "ml"}
            >
              മലയാളം
            </button>
          </div>
          <button
            className={`burger ${menuOpen ? "open" : ""}`}
            onClick={(event) => {
              event.stopPropagation();
              setMenuOpen((prev) => !prev);
              }}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
        <div
          className={`mobile-menu ${menuOpen ? "open" : ""}`}
          onClick={(event) => event.stopPropagation()}
        >
          <Link to="/explore" onClick={() => setMenuOpen(false)}>
            {t.sections.explore}
          </Link>
          <Link to="/eats" onClick={() => setMenuOpen(false)}>
            {t.sections.eats}
          </Link>
          <Link to="/events" onClick={() => setMenuOpen(false)}>
            {t.sections.events}
          </Link>
          <Link to="/people" onClick={() => setMenuOpen(false)}>
            {t.sections.personalities}
          </Link>
          <Link to="/hospitals" onClick={() => setMenuOpen(false)}>
            {t.sections.hospitals}
          </Link>
        </div>
      </header>

      <section className="premium-first-section">
        <picture>
          <source
            type="image/webp"
            srcSet="/images/hero/kannur_premium-480.webp 480w, /images/hero/kannur_premium-800.webp 800w, /images/hero/kannur_premium-1200.webp 1200w, /images/hero/kannur_premium-1600.webp 1600w"
          />
          <img
            src="/images/hero/kannur_premium-1200.jpg"
            srcSet="/images/hero/kannur_premium-480.jpg 480w, /images/hero/kannur_premium-800.jpg 800w, /images/hero/kannur_premium-1200.jpg 1200w, /images/hero/kannur_premium-1600.jpg 1600w"
            sizes="100vw"
            alt={lang === "ml" ? "കണ്ണൂരിലെ സായാഹ്ന ദൃശ്യം" : "Beautiful sunset view of Kannur"}
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </picture>
        <div className="premium-first-overlay">
          <p>{lang === "ml" ? "KANNUR" : "KANNUR"}</p>
          <h2>{lang === "ml" ? "കടൽ, പൈതൃകം, താളം — എല്ലാം ഒരേ നഗരത്തിൽ." : "Coast, heritage, and rhythm — in one city."}</h2>
          <Link className="primary" to="/explore">
            {lang === "ml" ? "ഇപ്പോൾ കണ്ടെത്തൂ" : "Explore Now"}
          </Link>
        </div>
      </section>

      <section className="landing-block">
        <div className="landing-copy">
          <p className="eyebrow">{lang === "ml" ? "സ്വാഗതം" : "Welcome"}</p>
          <h1 className="section-title landing-title">
            {lang === "ml"
              ? "ഇന്ന് കണ്ണൂരിൽ എന്ത് അനുഭവിക്കാം?"
              : "What can you experience in Kannur today?"}
          </h1>
          <p className="landing-subtitle">
            {lang === "ml"
              ? "കടൽത്തീരം, പൈതൃകം, ഭക്ഷണം, ഇവന്റുകൾ — മൊബൈലിൽ എളുപ്പമായി അന്വേഷിക്കാൻ രൂപകൽപ്പന ചെയ്ത ഗൈഡ്."
              : "Beaches, heritage, food, and events — designed to explore quickly on mobile first."}
          </p>
        </div>

        <div className="landing-media-card">
          <img
            src="/images/hero/muzhappilangad_sunset-1200.jpg"
            srcSet="/images/hero/muzhappilangad_sunset-480.jpg 480w, /images/hero/muzhappilangad_sunset-800.jpg 800w, /images/hero/muzhappilangad_sunset-1200.jpg 1200w"
            sizes="(max-width: 700px) 92vw, 520px"
            alt={lang === "ml" ? "മുഴപ്പിലങ്ങാട് സന്ധ്യാ ദൃശ്യം" : "Muzhappilangad sunset view"}
            loading="eager"
            decoding="async"
          />
          <div className="landing-media-overlay">
            {lang === "ml" ? "മുഴപ്പിലങ്ങാട് • ഡ്രൈവ്-ഇൻ ബീച്ച്" : "Muzhappilangad • Drive-in Beach"}
          </div>
        </div>

        <div className="landing-quick-grid">
          <Link to="/explore" className="landing-chip-card">
            <strong>{lang === "ml" ? "Explore Kannur" : "Explore Kannur"}</strong>
            <span>{lang === "ml" ? "സ്ഥലങ്ങൾ, ബീച്ചുകൾ, പൈതൃകം" : "Places, beaches, heritage"}</span>
          </Link>
          <Link to="/events" className="landing-chip-card">
            <strong>{lang === "ml" ? "Annual Events" : "Annual Events"}</strong>
            <span>{lang === "ml" ? "വർഷേന നടക്കുന്ന പ്രധാന ആഘോഷങ്ങൾ" : "Major yearly celebrations"}</span>
          </Link>
          <Link to="/eats" className="landing-chip-card">
            <strong>{lang === "ml" ? "Local Eats" : "Local Eats"}</strong>
            <span>{lang === "ml" ? "പ്രാദേശിക രുചികൾ കണ്ടെത്തൂ" : "Find authentic local food"}</span>
          </Link>
          <Link to="/people" className="landing-chip-card">
            <strong>{lang === "ml" ? "People of Kannur" : "People of Kannur"}</strong>
            <span>{lang === "ml" ? "പ്രമുഖരുടെ കഥകൾ" : "Stories of notable personalities"}</span>
          </Link>
        </div>
      </section>

      <section id="why-kannur" className="why-section" ref={whyRef}>
        <div className="why-head">
          <p className="eyebrow">{t?.home?.whyEyebrow || "Why Kannur?"}</p>
          <h2 className="section-title">
            {t?.home?.whyTitle || "Heritage, coast, and craft — in one pulse."}
          </h2>
        </div>
        <div className="why-video">
          <iframe
            ref={whyVideoRef}
            src={
              whyVideoActive
                ? "https://www.youtube.com/embed/imASkAzwU7U?rel=0&modestbranding=1&controls=0&autoplay=1&mute=1&loop=1&playlist=imASkAzwU7U"
                : "https://www.youtube.com/embed/imASkAzwU7U?rel=0&modestbranding=1&controls=0&loop=1&playlist=imASkAzwU7U"
            }
            title={t?.home?.whyVideoTitle || "Why Kannur - Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <Link className="primary video-cta" to="/theyyam">
          {t?.home?.theyyamCta || "Theyyam Calendar"}
        </Link>
      </section>

      <section id="soundscape" className="immersive-section">
        <div className="section-head">
          <p className="eyebrow">{t?.home?.soundscapeEyebrow || "Malabar Soundscape"}</p>
          <h2 className="section-title">{t?.home?.soundscapeTitle || "Feel the rhythm of Kannur"}</h2>
        </div>
        <div className="immersive-grid">
          <div className="immersive-card">
            <p>
              {t?.home?.soundscapeCopy ||
                "Tap to play authentic sounds of Kannur — drums, waves, and looms."}
            </p>
            <div className="sound-row">
              {soundOptions.map((sound) => (
                <button
                  key={sound.id}
                  type="button"
                  className={`sound-chip ${activeSound?.id === sound.id ? "active" : ""}`}
                  onClick={() => handleSoundToggle(sound)}
                >
                  <span className="sound-dot" />
                  {sound.label}
                </button>
              ))}
              <button
                type="button"
                className="sound-chip ghost"
                onClick={() => {
                  if (audioRef.current) audioRef.current.pause();
                  setActiveSound(null);
                }}
              >
                {t?.home?.stopAudio || "Stop Audio"}
              </button>
            </div>
            <audio ref={audioRef} preload="none" />
          </div>

          <div className="immersive-card">
            <h3>{t?.home?.driveTitle || "Asia's Longest Drive-in beach"}</h3>
            <p>{t?.home?.driveCopy || "Experience the drive‑in beach at sunset."}</p>
            <div className="drive-embed">
              <iframe
                ref={videoRef}
                src={
                  videoActive
                    ? "https://www.youtube.com/embed/yeuJbqIFKJM?rel=0&modestbranding=1&autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=yeuJbqIFKJM"
                    : "https://www.youtube.com/embed/yeuJbqIFKJM?rel=0&modestbranding=1&controls=0&showinfo=0&loop=1&playlist=yeuJbqIFKJM"
                }
                title={t?.home?.driveVideoTitle || "Muzhappilangad Beach Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <Link className="primary video-cta" to="/explore">
              {t?.home?.exploreCta || "Explore More"}
            </Link>
          </div>
        </div>
      </section>

      <section id="civic-updates" className="why-section civic-section">
        <div className="civic-content">
          <div className="civic-head">
            <p className="eyebrow">
              {lang === "ml" ? "കണ്ണൂർ സിവിക് അപ്‌ഡേറ്റ്സ്" : "Kannur Civic Updates"}
            </p>
            <h2 className="section-title civic-title">
              {lang === "ml"
                ? "കണ്ണൂരിന്റെ നിലവിലെ ഭരണവും ഔദ്യോഗിക അപ്‌ഡേറ്റുകളും"
                : "Kannur Live: Leadership, Services, and Official Updates"}
            </h2>
            <p className="civic-meta">
              {civicLoading
                ? (lang === "ml" ? "ഡാറ്റ ലോഡ് ചെയ്യുന്നു..." : "Loading latest official data...")
                : civicData?.fetchedAt
                  ? `${lang === "ml" ? "അവസാനം അപ്‌ഡേറ്റ് ചെയ്തത്" : "Last updated"}: ${new Date(civicData.fetchedAt).toLocaleString(lang === "ml" ? "ml-IN" : "en-IN")}`
                  : (lang === "ml" ? "ഓദ്യോഗിക സ്രോതസ്സിൽ നിന്ന് ഡാറ്റ" : "Data from official civic source")}
            </p>
          </div>

          <div className="civic-ticker">
            <span>{lang === "ml" ? "ലൈവ്" : "LIVE"}</span>
            <p>
              {civicData?.updates?.[activeCivicUpdate] ||
                (lang === "ml"
                  ? "കണ്ണൂർ കോർപ്പറേഷൻ ഔദ്യോഗിക പോർട്ടലിൽ നിന്നുള്ള അപ്‌ഡേറ്റുകൾ ഇവിടെ കാണിക്കും."
                  : "Updates from Kannur Corporation official portal will appear here.")}
            </p>
          </div>

          <div className="civic-kpis">
            <div className="civic-kpi">
              <strong>{civicData?.officials?.length || 0}</strong>
              <span>{lang === "ml" ? "പ്രധാന ഭരണ ചുമതലകൾ" : "Key Leadership Roles"}</span>
            </div>
            <div className="civic-kpi">
              <strong>{civicData?.updates?.length || 0}</strong>
              <span>{lang === "ml" ? "പുതിയ അറിയിപ്പുകൾ" : "Recent Notices"}</span>
            </div>
            <div className="civic-kpi">
              <strong>{civicData?.services?.length || 0}</strong>
              <span>{lang === "ml" ? "പ്രധാന സേവനങ്ങൾ" : "Service Categories"}</span>
            </div>
          </div>

          <div className="civic-grid dynamic">
            <article className="civic-card">
              <h3>{lang === "ml" ? "നിലവിലെ ഭരണചുമതല" : "Current Leadership"}</h3>
              <ul className="official-list">
                {(civicData?.officials || []).map((item) => (
                  <li key={`${item.role}-${item.name}`}>
                    {item.image ? (
                      <img src={item.image} alt={`${item.name} ${item.role}`} loading="lazy" decoding="async" />
                    ) : null}
                    <strong>{roleLabel(item.role)}</strong>
                    <span>{item.name}</span>
                    {item.phone ? <small>{item.phone}</small> : null}
                  </li>
                ))}
                {!civicData?.officials?.length && !civicLoading && (
                  <li>
                    <span>{lang === "ml" ? "മേയർ/ഡെപ്യൂട്ടി മേയർ/സെക്രട്ടറി വിവരങ്ങൾ ലഭ്യമല്ല." : "Mayor/Deputy Mayor/Secretary data unavailable."}</span>
                  </li>
                )}
              </ul>
            </article>

            <article className="civic-card civic-visual-card">
              <img
                src="/images/hero/st_angelo_fort-1200.jpg"
                alt={lang === "ml" ? "കണ്ണൂർ നഗര ദൃശ്യം" : "Kannur cityscape"}
                loading="lazy"
                decoding="async"
              />
              <div className="civic-visual-overlay">
                <p>{lang === "ml" ? "ഡിസ്ട്രിക്ട് പൾസ്" : "District Pulse"}</p>
                <h3>
                  {civicData?.updates?.[activeCivicUpdate] ||
                    (lang === "ml" ? "കണ്ണൂർ കോർപ്പറേഷൻ വാർത്തകൾ" : "Kannur Corporation Updates")}
                </h3>
              </div>
            </article>

            <article className="civic-card">
              <h3>{lang === "ml" ? "പുതിയ അറിയിപ്പുകൾ" : "Recent Updates"}</h3>
              <ul>
                {(civicData?.updates || []).slice(0, 6).map((item) => (
                  <li key={item}>{item}</li>
                ))}
                {!civicData?.updates?.length && !civicLoading && (
                  <li>{lang === "ml" ? "പുതിയ അറിയിപ്പുകൾ ലഭ്യമല്ല." : "No updates available right now."}</li>
                )}
              </ul>
            </article>

            <article className="civic-card civic-card-wide">
              <h3>{lang === "ml" ? "കണ്ണൂർ കോർപ്പറേഷൻ - പെട്ടെന്നുള്ള വിവരങ്ങൾ" : "Kannur Corporation Quick Facts"}</h3>
              <div className="civic-facts">
                <p><strong>{lang === "ml" ? "ബന്ധപ്പെടുക" : "Contact"}:</strong> {civicData?.contact?.phone || "0497-2700141"}</p>
                <p><strong>{lang === "ml" ? "ഇമെയിൽ" : "Email"}:</strong> {civicData?.contact?.email || "kannurmunicipalcorporation@gmail.com"}</p>
                <p><strong>{lang === "ml" ? "സേവനങ്ങൾ" : "Services"}:</strong> {(civicData?.services || []).slice(0, 5).join(", ") || (lang === "ml" ? "ജനന/മരണം രജിസ്ട്രേഷൻ, പ്രോപ്പർട്ടി ടാക്സ്, ലൈസൻസ് സേവനങ്ങൾ" : "Civil Registration, Property Tax, License Services")}</p>
              </div>
              <a className="secondary-link" href="https://kannurcorporation.lsgkerala.gov.in/" target="_blank" rel="noreferrer">
                {lang === "ml" ? "ഓദ്യോഗിക പോർട്ടൽ തുറക്കുക" : "Open Official Portal"}
              </a>
            </article>
          </div>
        </div>
      </section>

    </main>
  );
}
