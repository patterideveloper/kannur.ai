import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { places, quickPrompts } from "../data/places";

export default function Home({ lang, t, menuOpen, setMenuOpen, handleSend, slideIndex, setSlideIndex }) {
  return (
    <main>
      <header className="hero hero-carousel">
        <div className="carousel">
          {[
            {
              id: "hero-video",
              type: "video",
              src: "/videos/kannur-hero.mp4",
              poster: places.find((place) => place.images?.length)?.images[0]?.url,
              name: lang === "ml" ? "കണ്ണൂർ" : "Kannur",
              description:
                lang === "ml"
                  ? "കടൽ, പാരമ്പര്യം, തെയ്യം — കണ്ണൂരിന്റെ ആത്മാവ്."
                  : "Sea, heritage, and living ritual — the soul of Kannur.",
              isBright: false,
            },
            ...places
              .filter((place) => place.images && place.images.length > 0)
              .slice(0, 3)
              .map((place) => ({
                id: place.id,
                type: "image",
                src: place.images[0].url,
                isBright: place.images[0]?.isBright,
                name: lang === "ml" ? place.nameMl || place.name : place.name,
                description: lang === "ml" ? place.descriptionMl || place.description : place.description,
              })),
          ].map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-slide ${index === slideIndex ? "active" : ""} ${
                slide.isBright ? "bright" : ""
              }`}
              style={slide.type === "image" ? { backgroundImage: `url(${slide.src})` } : undefined}
            >
              <div className="carousel-nav">
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
              {slide.type === "video" && (
                <video
                  className="carousel-video"
                  src={slide.src}
                  poster={slide.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}
              <div className="carousel-overlay" />
              <div className="carousel-content">
                <p className="carousel-eyebrow">{t.heroEyebrow}</p>
                <h1>{slide.name}</h1>
                <p className="carousel-subhead">{slide.description}</p>
              </div>
            </div>
          ))}
          <div className="carousel-controls">
            {Array.from({ length: 4 }).map((_, idx) => (
              <button
                key={`dot-${idx}`}
                className={`dot ${idx === slideIndex ? "active" : ""}`}
                onClick={() => setSlideIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
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
        </div>
      </header>

      <section className="importance">
        <div className="importance-copy">
          <p className="eyebrow">{t.heroEyebrow}</p>
          <h2>{lang === "ml" ? "കണ്ണൂർ ജില്ലയുടെ പ്രാധാന്യം" : "Why Kannur matters"}</h2>
          <p>
            {lang === "ml"
              ? "കടൽ, പാരമ്പര്യം, പര്‍വ്വതങ്ങൾ, തെയ്യം, കരകൗശലങ്ങൾ—ഇവ എല്ലാം ഒരേ ജില്ലയിൽ. കണ്ണൂർ ബീച്ചുകൾ, കോട്ടകൾ, വനപ്രദേശങ്ങൾ, ആസ്വാദ്യങ്ങൾ എന്നിവയിലൂടെ മലബാറിന്റെ സംസ്കാരഹൃദയം ആയി തുടരുന്നു."
              : "Sea, heritage, hills, Theyyam, and crafts—Kannur is where Malabar’s culture meets raw coastline. From forts and beaches to forested highlands, the district blends history, ritual, and slow travel in one arc."}
          </p>
        </div>
        <div className="importance-stats">
          <div>
            <p className="stat-label">{lang === "ml" ? "തീരം" : "Coastline"}</p>
            <p className="stat-value">{lang === "ml" ? "തീര ശാന്തത" : "Arabian Sea views"}</p>
          </div>
          <div>
            <p className="stat-label">{lang === "ml" ? "പരമ്പര്യം" : "Heritage"}</p>
            <p className="stat-value">{lang === "ml" ? "കോട്ടകളും ക്ഷേത്രങ്ങളും" : "Forts + temples"}</p>
          </div>
          <div>
            <p className="stat-label">{lang === "ml" ? "തെയ്യം" : "Theyyam"}</p>
            <p className="stat-value">{lang === "ml" ? "ജീവന്ത കല" : "Living ritual art"}</p>
          </div>
        </div>
      </section>

      <section className="explore-cta">
        <div className="explore-cta-media">
          <img
            src={places.find((place) => place.images?.length)?.images[0]?.url}
            alt={lang === "ml" ? "കണ്ണൂരിന്റെ കാഴ്ചകൾ" : "Views of Kannur"}
            loading="lazy"
          />
        </div>
        <div className="explore-cta-copy">
          <p className="eyebrow">{lang === "ml" ? "അടുത്തത്" : "Next up"}</p>
          <h2>{lang === "ml" ? "കണ്ണൂർ എക്സ്പ്ലോർ ചെയ്യൂ" : "Explore Kannur"}</h2>
          <p>
            {lang === "ml"
              ? "ബീച്ചുകൾ, കോട്ടകൾ, കുന്നുകൾ, വന്യജീവി സങ്കേതങ്ങൾ—കണ്ണൂരിലെ പ്രധാന സ്ഥലങ്ങൾ ഇവിടെ ഒരുമിച്ച്."
              : "Beaches, forts, hills, and wildlife—open the full map of Kannur’s must‑see places."}
          </p>
          <Link className="primary" to="/explore" onClick={() => window.scrollTo(0, 0)}>
            {lang === "ml" ? "കൂടുതൽ കാണാൻ ക്ലിക്ക് ചെയ്യൂ" : "Click to see more"}
          </Link>
        </div>
      </section>
    </main>
  );
}
