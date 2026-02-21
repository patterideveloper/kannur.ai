import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Eats from "./pages/Eats";
import Temples from "./pages/Temples";
import Events from "./pages/Events";
import People from "./pages/People";
import Hospitals from "./pages/Hospitals";
import { quickPrompts } from "./data/places";

const translations = {
  en: {
    languageLabel: "EN",
    heroEyebrow: "Kannur, Kerala",
    title: "Kannur",
    heroSubhead:
      "A mobile-first travel guide that blends real place data with an AI-style concierge. Tell us your vibe — beaches, heritage, wildlife, local shopping, or a quick trek — and get a curated plan.",
    ctaPlan: "Get a 1-day plan",
    ctaShop: "Find local shopping",
    searchPlaceholder: "Search beaches, forts, hills, wildlife, or shopping...",
    spotsLabel: "spots",
    aiEyebrow: "Ask Kannur AI",
    aiTitle: "Plan your day in seconds",
    aiDesc:
      "This assistant uses local tags and curated sources to suggest real places. Ask anything in plain English.",
    chatPlaceholder: "Ask for beaches, a 1-day plan, quiet spots, or local shopping...",
    send: "Send",
    sourcesTitle: "Official sources used",
    sourcesDesc:
      "Place details are based on Kerala Tourism, Government of India, and Kannur District tourism portals.",
    footer: "Built for mobile-first exploration of Kannur and nearby day trips.",
    tags: {
      all: "All",
      beach: "Beaches",
      heritage: "Heritage",
      hill: "Hills",
      wildlife: "Wildlife",
      shopping: "Shopping",
      family: "Family",
      quiet: "Quiet",
      history: "History",
      city: "City",
      sunset: "Sunset",
      drive: "Drive-in",
      nature: "Nature",
      adventure: "Adventure",
      sunrise: "Sunrise",
      cool: "Cool",
      education: "Education",
      souvenir: "Souvenir",
      handicraft: "Handicraft",
      handloom: "Handloom",
      textiles: "Textiles",
      view: "View",
      island: "Island",
    },
    introText:
      "Hi! I’m your Kannur guide. Ask me for beaches, forts, quiet spots, local shopping, or a 1-day plan — I’ll curate a route with the best views.",
    planHint: "Tip: carry water, start early for hills, and check tides if you’re visiting Dharmadam Island.",
    officialSource: "Official source",
    mapsLink: "Google Maps",
    sections: {
      explore: "Explore Kannur",
      eats: "Local Eats",
      specialties: "Kannur Specialties",
      temples: "Temples & Pilgrimage",
      personalities: "People of Kannur",
      events: "Annual Events",
      hospitals: "Hospitals & Essentials",
    },
    predictor: {
      title: "Theyyam Calendar Predictor",
      desc:
        "Strict mode: only verified schedules are shown from trusted sources. Enter your travel dates to find exact performances.",
      startLabel: "Start date",
      endLabel: "End date",
      find: "Find performances",
      loading: "Finding events...",
      empty: "No events found in this range.",
      sources: "Sources",
      strictTag: "Strict: no predictions",
    },
    labels: {
      area: "Area",
      season: "Season",
      field: "Field",
      phone: "Phone",
      panchayath: "Panchayath",
      timing: "Timing",
      contact: "Contact",
      taluk: "Taluk",
    },
    types: {
      beach: "Beach",
      heritage: "Heritage",
      hill: "Hill",
      wildlife: "Wildlife",
      shopping: "Shopping",
      viewpoint: "Viewpoint",
      island: "Island",
      zoo: "Zoo",
    },
  },
  ml: {
    languageLabel: "മലയാളം",
    heroEyebrow: "കണ്ണൂർ, കേരളം",
    title: "കണ്ണൂർ",
    heroSubhead:
      "യാഥാർഥ്യമുള്ള സ്ഥല വിവരങ്ങളും AI-സ്റ്റൈൽ അസിസ്റ്റന്റും ചേർന്ന മൊബൈൽ-ഫസ്റ്റ് ഗൈഡ്. ബീച്ചുകൾ, പാരമ്പര്യം, വന്യജീവി, ലോക്കൽ ഷോപ്പിംഗ്, അല്ലെങ്കിൽ ചെറിയ ട്രെക്ക് — നിങ്ങളുടെ ഇഷ്ടം പറയൂ.",
    ctaPlan: "1-ദിവസ പ്ലാൻ",
    ctaShop: "ലോക്കൽ ഷോപ്പിംഗ്",
    searchPlaceholder: "ബീച്ച്, കോട്ട, കുന്ന്, വന്യജീവി, ഷോപ്പിംഗ് തിരയൂ...",
    spotsLabel: "സ്ഥലങ്ങൾ",
    aiEyebrow: "കണ്ണൂർ AI-യോട് ചോദിക്കൂ",
    aiTitle: "സെക്കൻഡുകളിൽ പ്ലാൻ",
    aiDesc:
      "പ്രാദേശിക ടാഗുകളും ഔദ്യോഗിക സ്രോതസ്സുകളും അടിസ്ഥാനമാക്കി നിർദ്ദേശങ്ങൾ നൽകുന്നു. മലയാളത്തിൽ ചോദിക്കാം.",
    chatPlaceholder: "ബീച്ചുകൾ, 1-ദിവസ പ്ലാൻ, ശാന്ത ഇടങ്ങൾ, ലോക്കൽ ഷോപ്പിംഗ്...",
    send: "അയക്കൂ",
    sourcesTitle: "ഔദ്യോഗിക സ്രോതസ്സുകൾ",
    sourcesDesc:
      "സ്ഥല വിവരങ്ങൾ കേരള ടൂറിസം, ഇന്ത്യ സർക്കാർ, കണ്ണൂർ ജില്ലാ പോർട്ടൽ എന്നിവയെ ആശ്രയിച്ചുള്ളതാണ്.",
    footer: "കണ്ണൂരിലും സമീപ പ്രദേശങ്ങളിലും മൊബൈൽ-ഫസ്റ്റ് എക്സ്പ്ലോറേഷനായി നിർമ്മിച്ചത്.",
    tags: {
      all: "എല്ലാം",
      beach: "ബീച്ചുകൾ",
      heritage: "പാരമ്പര്യം",
      hill: "കുന്നുകൾ",
      wildlife: "വന്യജീവി",
      shopping: "ഷോപ്പിംഗ്",
      family: "കുടുംബം",
      quiet: "ശാന്തം",
      history: "ചരിത്രം",
      city: "പട്ടണം",
      sunset: "സൂര്യസ്തമയം",
      drive: "ഡ്രൈവ്-ഇൻ",
      nature: "പ്രകൃതി",
      adventure: "സാഹസം",
      sunrise: "സൂര്യോദയം",
      cool: "തണുപ്പ്",
      education: "വിദ്യാഭ്യാസം",
      souvenir: "സ്മരണിക",
      handicraft: "ഹാൻഡിക്രാഫ്റ്റ്",
      handloom: "കൈത്തറി",
      textiles: "വസ്ത്രങ്ങൾ",
      view: "ദൃശ്യം",
      island: "ദ്വീപ്",
    },
    introText:
      "ഹായ്! ഞാൻ നിങ്ങളുടെ കണ്ണൂർ കോമ്പസ്. ബീച്ച്, കോട്ട, ശാന്ത സ്ഥലങ്ങൾ, ലോക്കൽ ഷോപ്പിംഗ് അല്ലെങ്കിൽ 1-ദിവസ പ്ലാൻ — പറയൂ, ഞാൻ പ്ലാൻ ചെയ്യാം.",
    planHint: "ടിപ്പ്: വെള്ളം എടുത്തോളൂ, കുന്നിലേക്ക് രാവിലെ തന്നെ പോകൂ, ധർമ്മടം ദ്വീപിന് ടൈഡ് സമയം പരിശോധിക്കൂ.",
    officialSource: "ഔദ്യോഗിക സ്രോതസ്",
    mapsLink: "ഗൂഗിൾ മാപ്സ്",
    sections: {
      explore: "കണ്ണൂർ സന്ദർശിക്കുക",
      eats: "പ്രസിദ്ധ ഭക്ഷണ ഇടങ്ങൾ",
      specialties: "കണ്ണൂർ സ്പെഷ്യൽ വിഭവങ്ങൾ",
      temples: "ക്ഷേത്രങ്ങളും തീർത്ഥാടനവും",
      personalities: "കണ്ണൂരിലെ പ്രമുഖർ",
      events: "വാർഷിക ഇവന്റുകൾ",
      hospitals: "ആശുപത്രികൾ & അത്യാവശ്യങ്ങൾ",
    },
    predictor: {
      title: "തെയ്യം കലണ്ടർ പ്രെഡിക്ടർ",
      desc:
        "സ്റ്റ്രിക്റ്റ് മോഡ്: വിശ്വസനീയ സ്രോതസ്സുകളിൽ നിന്നുള്ള ഷെഡ്യൂളുകൾ മാത്രമേ കാണിക്കൂ. യാത്രാ തീയതികൾ നൽകൂ.",
      startLabel: "ആരംഭ തീയതി",
      endLabel: "അവസാന തീയതി",
      find: "ഇവന്റുകൾ കാണൂ",
      loading: "തിരയുന്നു...",
      empty: "ഈ സമയപരിധിയിൽ ഇവന്റുകൾ കണ്ടെത്തിയില്ല.",
      sources: "സ്രോതസ്സുകൾ",
      strictTag: "സ്റ്റ്രിക്റ്റ്: പ്രവചനമില്ല",
    },
    labels: {
      area: "പ്രദേശം",
      season: "സീസൺ",
      field: "മേഖല",
      phone: "ഫോൺ",
      panchayath: "പഞ്ചായത്ത്",
      timing: "സമയം",
      contact: "ബന്ധപ്പെടുക",
      taluk: "താലൂക്ക്",
    },
    types: {
      beach: "ബീച്ച്",
      heritage: "പാരമ്പര്യം",
      hill: "കുന്ന്",
      wildlife: "വന്യജീവി",
      shopping: "ഷോപ്പിംഗ്",
      viewpoint: "വ്യൂ പോയിന്റ്",
      island: "ദ്വീപ്",
      zoo: "സൂ",
    },
  },
};

export default function App() {
  const [lang, setLang] = useState("en");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theyyamStart, setTheyyamStart] = useState(() => new Date().toISOString().slice(0, 10));
  const [theyyamEnd, setTheyyamEnd] = useState(() => {
    const end = new Date();
    end.setDate(end.getDate() + 7);
    return end.toISOString().slice(0, 10);
  });
  const [theyyamLoading, setTheyyamLoading] = useState(false);
  const [theyyamEvents, setTheyyamEvents] = useState([]);
  const [theyyamSources, setTheyyamSources] = useState([]);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "ml" ? "ml" : "en";
  }, [lang]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleSend = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
  };

  const fetchTheyyam = useCallback(async () => {
    setTheyyamLoading(true);
    try {
      const response = await fetch(`/api/theyyam?start=${theyyamStart}&end=${theyyamEnd}`);
      const data = await response.json();
      setTheyyamEvents(data.events || []);
      setTheyyamSources(data.sources || []);
    } catch (error) {
      setTheyyamEvents([]);
      setTheyyamSources([]);
    } finally {
      setTheyyamLoading(false);
    }
  }, [theyyamStart, theyyamEnd]);

  useEffect(() => {
    fetchTheyyam();
  }, [fetchTheyyam]);

  return (
    <div className="app" data-lang={lang}>
      <nav className="desktop-nav">
        <Link to="/" className="nav-brand">
          {t.title}
        </Link>
        <div className="nav-links">
          <Link to="/explore">{t.sections.explore}</Link>
          <Link to="/eats">{t.sections.eats}</Link>
          <Link to="/temples">{t.sections.temples}</Link>
          <Link to="/events">{t.sections.events}</Link>
          <Link to="/people">{t.sections.personalities}</Link>
          <Link to="/hospitals">{t.sections.hospitals}</Link>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              lang={lang}
              t={t}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              handleSend={handleSend}
              slideIndex={slideIndex}
              setSlideIndex={setSlideIndex}
            />
          }
        />
        <Route path="/explore" element={<Explore lang={lang} t={t} />} />
        <Route path="/eats" element={<Eats lang={lang} t={t} />} />
        <Route path="/temples" element={<Temples lang={lang} t={t} />} />
        <Route path="/events" element={<Events lang={lang} t={t} />} />
        <Route path="/people" element={<People lang={lang} t={t} />} />
        <Route path="/hospitals" element={<Hospitals lang={lang} t={t} />} />
      </Routes>

      <section id="ai" className="ai-section">
        <div className="ai-header">
          <div>
            <p className="eyebrow">{t.aiEyebrow}</p>
            <h2>{t.aiTitle}</h2>
            <p>{t.aiDesc}</p>
          </div>
          <div className="prompt-row">
            {quickPrompts[lang].map((prompt) => (
              <button key={prompt} className="prompt" onClick={() => handleSend(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="chat">
          <div className="chat-feed">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chat-bubble ${message.role}`}>
                <p>{message.text}</p>
              </div>
            ))}
          </div>

        <div className="chat-input">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t.chatPlaceholder}
            />
            <button className="primary" onClick={() => handleSend(input)}>
              {t.send}
            </button>
          </div>
        </div>
      </section>

      <section className="sources">
        <h3>{t.sourcesTitle}</h3>
        <p>{t.sourcesDesc}</p>
        <div className="source-links">
          <a href="https://www.keralatourism.org/" target="_blank" rel="noreferrer">
            Kerala Tourism
          </a>
          <a href="https://kannur.nic.in/" target="_blank" rel="noreferrer">
            Kannur District
          </a>
          <a href="https://lighthouse.nic.in/" target="_blank" rel="noreferrer">
            Lighthouse Portal
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}
