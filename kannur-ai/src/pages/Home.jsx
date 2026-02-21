import { useEffect, useMemo, useState } from "react";
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

export default function Home({ lang, t, menuOpen, setMenuOpen }) {
  const slides = useMemo(
    () => [
      {
        type: "image",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Kandanar_kelan_theyyam%3B_The_fire_theyyam_%21.jpg",
        caption: "Theyyam fire ritual close‑up",
      },
      {
        type: "image",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Muzhappilangad_Drive-In_Beach_Sunset_01.JPG",
        caption: "Muzhappilangad drive‑in beach at sunset",
      },
      {
        type: "image",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/St_Angelo_Fort%2C_Kannur_10.jpg",
        caption: "St. Angelo Fort — sea‑facing bastions",
      },
      {
        type: "image",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Payyambalam_beach%2C_Kannur.jpg",
        caption: "Payyambalam beach — evening shoreline",
      },
      {
        type: "image",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Dharmadom_island.jpg",
        caption: "Dharmadam Island — low‑tide crossing",
      },
    ],
    []
  );

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

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

      <header className="hero-hook">
        <div className="hero-media">
          {slides.map((slide, index) => (
            <div
              key={`${slide.type}-${slide.src || index}`}
              className={`hero-slide ${index === activeSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.src})` }}
            />
          ))}
          <div className="hero-gradient" />
        </div>
        <div className="hero-inner">
          <div className="hero-top">
            <div className="hero-banner">KANNUR.iO</div>
            <button
              className={`burger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
          <div className="hero-content">
            <p className="hero-caption">{slides[activeSlide]?.caption}</p>
            <div className="hero-dots" aria-hidden="true">
              {slides.map((_, index) => (
                <span key={`dot-${index}`} className={index === activeSlide ? "active" : ""} />
              ))}
            </div>
          </div>
        </div>
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Link to="/explore" onClick={() => setMenuOpen(false)}>
            {t.sections.explore}
          </Link>
          <Link to="/eats" onClick={() => setMenuOpen(false)}>
            {t.sections.eats}
          </Link>
          <Link to="/temples" onClick={() => setMenuOpen(false)}>
            {t.sections.temples}
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
          <a href="#ai" onClick={() => setMenuOpen(false)}>
            {t.aiTitle}
          </a>
        </div>
      </header>

      <section id="why-kannur" className="bento-section">
        <div className="section-head">
          <p className="eyebrow">Why Kannur?</p>
          <h2 className="section-title">Heritage, coast, and craft — in one pulse.</h2>
        </div>
        <div className="bento-grid">
          {bentoCards.map((card) => (
            <article key={card.id} className={`bento-card ${card.size} ${card.id}`}>
              <img src={card.image} alt={card.title} loading="lazy" />
              <div className="bento-content">
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="ai" className="ai-concierge">
        <div className="ai-copy">
          <p className="eyebrow">AI Concierge</p>
          <h2 className="section-title">The .io edge, built for curious travelers.</h2>
          <p>
            Ask me anything about Kannur. (e.g., “Where can I see Theyyam tonight?” or “Best
            sunset spot near the Fort?”)
          </p>
        </div>
        <div className="ai-panel">
          <div className="ai-input">
            <input
              type="text"
              placeholder="Ask about beaches, rituals, food, or routes…"
              aria-label="Ask about Kannur"
            />
            <button className="primary" type="button">
              Ask
            </button>
          </div>
          <div className="ai-suggestions">
            <button type="button">Where can I see Theyyam tonight?</button>
            <button type="button">Best sunset near St. Angelo Fort?</button>
            <button type="button">Plan a 2‑day itinerary</button>
          </div>
        </div>
      </section>

    </main>
  );
}
