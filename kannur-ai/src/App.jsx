import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Eats from "./pages/Eats";
import Temples from "./pages/Temples";
import Events from "./pages/Events";
import People from "./pages/People";
import Hospitals from "./pages/Hospitals";
import Theyyam from "./pages/Theyyam";

const translations = {
  en: {
    languageLabel: "EN",
    languageSwitch: "മലയാളം",
    heroEyebrow: "Kannur, Kerala",
    title: "Kannur",
    heroSubhead:
      "A mobile-first travel guide that blends real place data with an AI-style concierge. Tell us your vibe — beaches, heritage, wildlife, local shopping, or a quick trek — and get a curated plan.",
    ctaPlan: "Get a 1-day plan",
    ctaShop: "Find local shopping",
    searchPlaceholder: "Search beaches, forts, hills, wildlife, or shopping...",
    spotsLabel: "spots",
    aiEyebrow: "AI Concierge",
    aiTitle: "Ask Kannur",
    aiDesc:
      "This assistant uses local tags and curated sources to suggest real places. Ask anything in plain English.",
    chatPlaceholder: "Ask for beaches, a 1-day plan, quiet spots, or local shopping...",
    send: "Send",
    footerTagline: "Built for the curious. Powered by the coast.",
    footerLinks: {
      calendar: "Cultural Calendar",
      food: "Food Map",
      stay: "Stay Local",
      contact: "Contact",
    },
    footerCopy: "© 2026 Kannur.io",
    tags: {
      all: "All",
      beach: "Beaches",
      heritage: "Heritage",
      hill: "Hills",
      wildlife: "Wildlife",
      shopping: "Shopping",
      worship: "Temples, Mosques, Churches",
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
    eventsPage: {
      title: "Annual Events",
      subtitle: "Key annual festivals and rituals.",
      back: "Back to Home",
      description: "Annual festivals and cultural events across Kannur district.",
    },
    home: {
      heroCaptions: [
        "Theyyam fire ritual close‑up",
        "Muzhappilangad drive‑in beach at sunset",
        "St. Angelo Fort — sea‑facing bastions",
        "Payyambalam beach — evening shoreline",
        "Dharmadam Island — low‑tide crossing",
      ],
      whyEyebrow: "Why Kannur?",
      whyTitle: "Heritage, coast, and craft — in one pulse.",
      whyVideoTitle: "Why Kannur - Video",
      theyyamCta: "Theyyam Calendar",
      soundscapeEyebrow: "Malabar Soundscape",
      soundscapeTitle: "Feel the rhythm of Kannur",
      soundscapeCopy: "Tap to play authentic sounds of Kannur — drums, waves, and looms.",
      soundLabels: {
        theyyam: "Theyyam Drums (Chenda)",
        waves: "Muzhappilangad Waves",
        loom: "Chirakkal Handloom",
      },
      stopAudio: "Stop Audio",
      driveTitle: "Asia's Longest Drive-in beach",
      driveCopy: "Experience the drive‑in beach at sunset.",
      driveVideoTitle: "Muzhappilangad Beach Video",
      exploreCta: "Explore More",
      aiEyebrow: "AI Concierge",
      aiTitle: "The .io edge, built for curious travelers.",
      aiCopy: "Ask about routes, rituals, food.",
      aiPlaceholder: "Ask about beaches, rituals, food, or routes…",
      aiButton: "Ask",
      aiSuggestions: [
        "Where can I see Theyyam tonight?",
        "Best sunset near St. Angelo Fort?",
        "Plan a 2‑day itinerary",
      ],
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
      worship: "Temples, Mosques, Churches",
      viewpoint: "Viewpoint",
      island: "Island",
      zoo: "Zoo",
    },
  },
  ml: {
    languageLabel: "മലയാളം",
    languageSwitch: "EN",
    heroEyebrow: "കണ്ണൂർ, കേരളം",
    title: "കണ്ണൂർ",
    heroSubhead:
      "യാഥാർഥ്യമുള്ള സ്ഥല വിവരങ്ങളും AI-സ്റ്റൈൽ അസിസ്റ്റന്റും ചേർന്ന മൊബൈൽ-ഫസ്റ്റ് ഗൈഡ്. ബീച്ചുകൾ, പാരമ്പര്യം, വന്യജീവി, ലോക്കൽ ഷോപ്പിംഗ്, അല്ലെങ്കിൽ ചെറിയ ട്രെക്ക് — നിങ്ങളുടെ ഇഷ്ടം പറയൂ.",
    ctaPlan: "1-ദിവസ പ്ലാൻ",
    ctaShop: "ലോക്കൽ ഷോപ്പിംഗ്",
    searchPlaceholder: "ബീച്ച്, കോട്ട, കുന്ന്, വന്യജീവി, ഷോപ്പിംഗ് തിരയൂ...",
    spotsLabel: "സ്ഥലങ്ങൾ",
    aiEyebrow: "AI Concierge",
    aiTitle: "കണ്ണൂർ AI",
    aiDesc:
      "പ്രാദേശിക ടാഗുകളും ഔദ്യോഗിക സ്രോതസ്സുകളും അടിസ്ഥാനമാക്കി നിർദ്ദേശങ്ങൾ നൽകുന്നു. മലയാളത്തിൽ ചോദിക്കാം.",
    chatPlaceholder: "ബീച്ചുകൾ, 1-ദിവസ പ്ലാൻ, ശാന്ത ഇടങ്ങൾ, ലോക്കൽ ഷോപ്പിംഗ്...",
    send: "അയക്കൂ",
    footerTagline: "കൗതുകത്തിനായി നിർമ്മിച്ചത്. തീരത്തിന്റെ ഊർജ്ജത്തിൽ പ്രവർത്തിക്കുന്നു.",
    footerLinks: {
      calendar: "സാംസ്കാരിക കലണ്ടർ",
      food: "ഭക്ഷ്യ മാപ്പ്",
      stay: "സ്റ്റേ ലോക്കൽ",
      contact: "ബന്ധപ്പെടുക",
    },
    footerCopy: "© 2026 Kannur.io",
    tags: {
      all: "എല്ലാം",
      beach: "ബീച്ചുകൾ",
      heritage: "പാരമ്പര്യം",
      hill: "കുന്നുകൾ",
      wildlife: "വന്യജീവി",
      shopping: "ഷോപ്പിംഗ്",
      worship: "ക്ഷേത്രങ്ങൾ, പള്ളി, മസ്ജിദ്",
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
    eventsPage: {
      title: "വാർഷിക ഇവന്റുകൾ",
      subtitle: "വർഷേന നടക്കുന്ന പ്രധാന ചടങ്ങുകൾ.",
      back: "ഹോം",
      description: "കണ്ണൂരിലെ വാർഷിക ഉത്സവങ്ങളും പ്രധാന ഇവന്റുകളും.",
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
      worship: "ക്ഷേത്രങ്ങൾ, പള്ളി, മസ്ജിദ്",
      viewpoint: "വ്യൂ പോയിന്റ്",
      island: "ദ്വീപ്",
      zoo: "സൂ",
    },
    home: {
      heroCaptions: [
        "തെയ്യം തീച്ചടങ്ങിന്റെ ക്ലോസ്‑അപ്പ്",
        "മുഴപ്പിലങ്ങാട് ഡ്രൈവ്‑ഇൻ ബീച്ച് — സന്ധ്യാസമയം",
        "സെന്റ് ആഞ്ചലോ കോട്ട — കടൽവശ ബാസ്തിയണുകൾ",
        "പയ്യമ്പലം ബീച്ച് — സന്ധ്യയുടെ തീരം",
        "ധർമ്മടം ദ്വീപ് — ലോ‑ടൈഡ് ക്രോസിംഗ്",
      ],
      whyEyebrow: "എന്തുകൊണ്ട് കണ്ണൂർ?",
      whyTitle: "പാരമ്പര്യം, തീരം, കൈത്തൊഴിൽ — ഒരൊറ്റ സ്പന്ദനം.",
      whyVideoTitle: "എന്തുകൊണ്ട് കണ്ണൂർ - വീഡിയോ",
      theyyamCta: "തെയ്യം കലണ്ടർ",
      soundscapeEyebrow: "മലബാർ സൗണ്ട്‌സ്‌കേപ്പ്",
      soundscapeTitle: "കണ്ണൂരിന്റെ താളം അനുഭവിക്കൂ",
      soundscapeCopy:
        "കണ്ണൂരിലെ യഥാർത്ഥ ശബ്ദങ്ങൾ കേൾക്കാൻ ടാപ്പ് ചെയ്യൂ — മദ്ദളം, തിരമാല, കൈത്തറി.",
      soundLabels: {
        theyyam: "തെയ്യം ചണ്ട (ഡ്രംസ്)",
        waves: "മുഴപ്പിലങ്ങാട് തിരമാലകൾ",
        loom: "ചിറക്കൽ കൈത്തറി",
      },
      stopAudio: "ഓഡിയോ നിർത്തുക",
      driveTitle: "ഏഷ്യയിലെ ഏറ്റവും ദൈർഘ്യമുള്ള ഡ്രൈവ്‑ഇൻ ബീച്ച്",
      driveCopy: "സന്ധ്യാസമയം ഡ്രൈവ്‑ഇൻ ബീച്ച് അനുഭവിക്കൂ.",
      driveVideoTitle: "മുഴപ്പിലങ്ങാട് ബീച്ച് വീഡിയോ",
      exploreCta: "കൂടുതൽ കാണൂ",
      aiEyebrow: "AI Concierge",
      aiTitle: ".io എഡ്ജ് — കൗതുകമുള്ള യാത്രക്കാരർക്കായി.",
      aiCopy: "റൂട്ട്, ചടങ്ങുകൾ, ഭക്ഷണം എന്നിവ ചോദിക്കൂ.",
      aiPlaceholder: "ബീച്ചുകൾ, ചടങ്ങുകൾ, ഭക്ഷണം, റൂട്ടുകൾ എന്നിവ ചോദിക്കൂ…",
      aiButton: "ചോദിക്കൂ",
      aiSuggestions: [
        "ഇന്ന് രാത്രി തെയ്യം എവിടെ കാണാം?",
        "സെന്റ് ആഞ്ചലോ കോട്ടയ്ക്ക് സമീപം മികച്ച സൺസെറ്റ് എവിടെ?",
        "2‑ദിവസ യാത്രാ പ്ലാൻ",
      ],
    },
  },
};

export default function App() {
  const [lang, setLang] = useState("ml");
  const [menuOpen, setMenuOpen] = useState(false);
  

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "ml" ? "ml" : "en";
  }, [lang]);

  

  return (
    <div className="app" data-lang={lang}>
      <nav className="desktop-nav">
        <Link to="/" className="nav-brand">
          {t.title}
        </Link>
        <div className="nav-links">
          <Link to="/explore">{t.sections.explore}</Link>
          <Link to="/eats">{t.sections.eats}</Link>
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
              setLang={setLang}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
            />
          }
        />
        <Route path="/explore" element={<Explore lang={lang} t={t} />} />
        <Route path="/eats" element={<Eats lang={lang} t={t} />} />
        <Route path="/temples" element={<Temples lang={lang} t={t} />} />
        <Route path="/events" element={<Events lang={lang} t={t} />} />
        <Route path="/theyyam" element={<Theyyam lang={lang} t={t} />} />
        <Route path="/people" element={<People lang={lang} t={t} />} />
        <Route path="/hospitals" element={<Hospitals lang={lang} t={t} />} />
      </Routes>

      <footer className="footer footer-modern">
        <p className="footer-copy">{t.footerCopy}</p>
      </footer>
    </div>
  );
}
