import { useEffect, useMemo, useRef, useState } from "react";
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
  const whyRef = useRef(null);
  const audioRef = useRef(null);
  const [activeSound, setActiveSound] = useState(null);
  const videoRef = useRef(null);
  const [videoActive, setVideoActive] = useState(false);
  const whyVideoRef = useRef(null);
  const [whyVideoActive, setWhyVideoActive] = useState(false);

  const slides = useMemo(
    () => [
      {
        type: "image",
        src: "/images/hero/theyyam_fire-1200.jpg",
        srcSet:
          "/images/hero/theyyam_fire-480.jpg 480w, /images/hero/theyyam_fire-800.jpg 800w, /images/hero/theyyam_fire-1200.jpg 1200w, /images/hero/theyyam_fire-1600.jpg 1600w",
        caption: "Theyyam fire ritual close‑up",
      },
      {
        type: "image",
        src: "/images/hero/muzhappilangad_sunset-1200.jpg",
        srcSet:
          "/images/hero/muzhappilangad_sunset-480.jpg 480w, /images/hero/muzhappilangad_sunset-800.jpg 800w, /images/hero/muzhappilangad_sunset-1200.jpg 1200w, /images/hero/muzhappilangad_sunset-1600.jpg 1600w",
        caption: "Muzhappilangad drive‑in beach at sunset",
      },
      {
        type: "image",
        src: "/images/hero/st_angelo_fort-1200.jpg",
        srcSet:
          "/images/hero/st_angelo_fort-480.jpg 480w, /images/hero/st_angelo_fort-800.jpg 800w, /images/hero/st_angelo_fort-1200.jpg 1200w, /images/hero/st_angelo_fort-1600.jpg 1600w",
        caption: "St. Angelo Fort — sea‑facing bastions",
      },
      {
        type: "image",
        src: "/images/hero/payyambalam_beach-1200.jpg",
        srcSet:
          "/images/hero/payyambalam_beach-480.jpg 480w, /images/hero/payyambalam_beach-800.jpg 800w, /images/hero/payyambalam_beach-1200.jpg 1200w, /images/hero/payyambalam_beach-1600.jpg 1600w",
        caption: "Payyambalam beach — evening shoreline",
      },
      {
        type: "image",
        src: "/images/hero/dharmadam_island-1200.jpg",
        srcSet:
          "/images/hero/dharmadam_island-480.jpg 480w, /images/hero/dharmadam_island-800.jpg 800w, /images/hero/dharmadam_island-1200.jpg 1200w, /images/hero/dharmadam_island-1600.jpg 1600w",
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
      label: "Theyyam Drums (Chenda)",
      src: "/media/theyyam-chenda.mp3",
    },
    {
      id: "waves",
      label: "Muzhappilangad Waves",
      src: "/media/muzhappilangad-waves.mp3",
    },
    {
      id: "loom",
      label: "Chirakkal Handloom",
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
        className="hero-hook"
        onClick={() => {
          if (menuOpen) setMenuOpen(false);
        }}
      >
        <div className="hero-media">
          {slides.map((slide, index) => (
            <div
              key={`${slide.type}-${slide.src || index}`}
              className={`hero-slide ${index === activeSlide ? "active" : ""}`}
            >
              <img
                src={slide.src}
                srcSet={slide.srcSet}
                sizes="100vw"
                alt={slide.caption}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchpriority={index === 0 ? "high" : "auto"}
              />
            </div>
          ))}
          <div className="hero-gradient" />
        </div>
        <div className="hero-inner">
          <div className="hero-top">
            <div className="hero-banner">KANNUR.iO</div>
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
          <div className="hero-content">
            <p className="hero-caption">{slides[activeSlide]?.caption}</p>
            <div className="hero-dots" aria-hidden="true">
              {slides.map((_, index) => (
                <span key={`dot-${index}`} className={index === activeSlide ? "active" : ""} />
              ))}
            </div>
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

      <section id="why-kannur" className="why-section" ref={whyRef}>
        <div className="why-head">
          <p className="eyebrow">Why Kannur?</p>
          <h2 className="section-title">Heritage, coast, and craft — in one pulse.</h2>
        </div>
        <div className="why-video">
          <iframe
            ref={whyVideoRef}
            src={
              whyVideoActive
                ? "https://www.youtube.com/embed/imASkAzwU7U?rel=0&modestbranding=1&controls=0&autoplay=1&mute=1&loop=1&playlist=imASkAzwU7U"
                : "https://www.youtube.com/embed/imASkAzwU7U?rel=0&modestbranding=1&controls=0&loop=1&playlist=imASkAzwU7U"
            }
            title="Why Kannur - Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <Link className="primary video-cta" to="/theyyam">
          Theyyam Calendar
        </Link>
      </section>

      <section id="soundscape" className="immersive-section">
        <div className="section-head">
          <p className="eyebrow">Malabar Soundscape</p>
          <h2 className="section-title">Feel the rhythm of Kannur</h2>
        </div>
        <div className="immersive-grid">
          <div className="immersive-card">
            <p>Tap to play authentic sounds of Kannur — drums, waves, and looms.</p>
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
                Stop Audio
              </button>
            </div>
            <audio ref={audioRef} preload="none" />
          </div>

          <div className="immersive-card">
            <h3>Asia's Longest Drive-in beach</h3>
            <p>Experience the drive‑in beach at sunset.</p>
            <div className="drive-embed">
              <iframe
                ref={videoRef}
                src={
                  videoActive
                    ? "https://www.youtube.com/embed/yeuJbqIFKJM?rel=0&modestbranding=1&autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=yeuJbqIFKJM"
                    : "https://www.youtube.com/embed/yeuJbqIFKJM?rel=0&modestbranding=1&controls=0&showinfo=0&loop=1&playlist=yeuJbqIFKJM"
                }
                title="Muzhappilangad Beach 360° Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <Link className="primary video-cta" to="/explore">
              Explore More
            </Link>
          </div>
        </div>
      </section>

      <section id="ai" className="ai-concierge">
        <div className="ai-copy">
          <p className="eyebrow">AI Concierge</p>
          <h2 className="section-title">The .io edge, built for curious travelers.</h2>
          <p>Ask about routes, rituals, food.</p>
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
