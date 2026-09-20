import { useState } from "react";
import { Link } from "react-router-dom";
import "./historySection.css";

const chapters = [
  {
    era: "Before the 15th century",
    eraMl: "15-ാം നൂറ്റാണ്ടിനു മുമ്പ്",
    title: "The land of the Kolathiris",
    titleMl: "കോലത്തിരിമാരുടെ നാട്",
    body: "North Malabar's Ezhimala kingdom later came to be known as Kolathunadu. Its rulers, the Kolathiris, shaped the region long before European ships reached this coast.",
    bodyMl: "ഉത്തര മലബാറിലെ ഏഴിമല രാജ്യം പിന്നീട് കോലത്തുനാട് എന്നറിയപ്പെട്ടു. യൂറോപ്യൻ കപ്പലുകൾ ഇവിടെ എത്തുന്നതിനു മുമ്പേ കോലത്തിരിമാർ ഈ നാടിന്റെ ചരിത്രം രൂപപ്പെടുത്തി.",
    image: "/images/hero/kannur_premium-800.webp",
    alt: "Kannur coastline today",
    altMl: "ഇന്നത്തെ കണ്ണൂർ തീരം",
    source: "https://www.keralatourism.org/thalassery/cultural-heritage",
    place: "/explore/heritage",
  },
  {
    era: "From the 15th century",
    eraMl: "15-ാം നൂറ്റാണ്ടു മുതൽ",
    title: "The Arakkal maritime story",
    titleMl: "അറക്കലിന്റെ കടൽവാണിജ്യ കഥ",
    body: "The Arakkal family emerged as an independent maritime power. Kerala's only Muslim royal family traded across the sea, and its women rulers carried the title Arakkal Beevi.",
    bodyMl: "അറക്കൽ കുടുംബം സ്വതന്ത്ര കടൽവാണിജ്യ ശക്തിയായി ഉയർന്നു. കേരളത്തിലെ ഏക മുസ്ലിം രാജകുടുംബത്തിലെ വനിതാ ഭരണാധികാരികൾ അറക്കൽ ബീവി എന്ന പേരിൽ അറിയപ്പെട്ടു.",
    image: "/images/hero/payyambalam_beach-1600.jpg",
    alt: "Arabian Sea off Kannur, a present-day view of the historic trade coast",
    altMl: "ചരിത്രപരമായ വാണിജ്യതീരത്തിന്റെ ഇന്നത്തെ കാഴ്ച, കണ്ണൂരിലെ അറബിക്കടൽ",
    source: "https://www.keralatourism.org/thalassery/tourist-circuits/culture/arakkal-kettu",
    place: "/explore/heritage",
  },
  {
    era: "1505",
    eraMl: "1505",
    title: "A fort facing the sea",
    titleMl: "കടലിനെ നോക്കുന്ന കോട്ട",
    body: "The Portuguese built St. Angelo Fort in 1505. Later held by the Dutch, the Arakkal rulers and the British, its laterite walls still trace Kannur's changing powers.",
    bodyMl: "1505-ൽ പോർച്ചുഗീസുകാർ സെന്റ് ആഞ്ചലോ കോട്ട പണിതു. പിന്നീട് ഡച്ചുകാരുടെയും അറക്കൽ ഭരണാധികാരികളുടെയും ബ്രിട്ടീഷുകാരുടെയും നിയന്ത്രണത്തിലായ കോട്ടയുടെ വെട്ടുകൽ മതിലുകൾ ആ മാറ്റങ്ങൾക്ക് സാക്ഷിയാണ്.",
    image: "/images/places/st_angelo_fort/st_angelo_fort-1200.webp",
    alt: "St. Angelo Fort, Kannur",
    altMl: "സെന്റ് ആഞ്ചലോ കോട്ട, കണ്ണൂർ",
    source: "https://www.keralatourism.org/thalassery/culture/kannur-fort",
    place: "/explore/place/st-angelo-fort",
  },
  {
    era: "1683–1708",
    eraMl: "1683–1708",
    title: "Thalassery's trading chapter",
    titleMl: "തലശ്ശേരിയുടെ വ്യാപാര അധ്യായം",
    body: "The English East India Company began trading at Thalassery in 1683 and fortified its settlement in 1708. The fort later became a military and administrative centre.",
    bodyMl: "1683-ൽ ഇംഗ്ലീഷ് ഈസ്റ്റ് ഇന്ത്യ കമ്പനി തലശ്ശേരിയിൽ വ്യാപാരം തുടങ്ങി; 1708-ൽ അവരുടെ കേന്ദ്രം കോട്ടയാക്കി. പിന്നീട് ഇത് സൈനിക-ഭരണ കേന്ദ്രമായി മാറി.",
    image: "/images/hero/thalassery-fort-history.webp",
    alt: "Thalassery Fort gateway · Thalassery Municipality",
    altMl: "തലശ്ശേരി കോട്ടയുടെ പ്രവേശന കവാടം · തലശ്ശേരി നഗരസഭ",
    source: "https://www.keralatourism.org/thalassery/tourist-circuits/harbour-town/thalassery-fort",
    place: "/explore/place/thalassery-fort",
  },
];

export default function HistorySection({ lang }) {
  const [selected, setSelected] = useState(0);
  const ml = lang === "ml";
  const chapter = chapters[selected];

  return (
    <section className="history-section" id="history" aria-labelledby="history-title">
      <div className="history-shell">
        <div className="history-heading">
          <p className="eyebrow light">{ml ? "കണ്ണൂരിന്റെ കഥ" : "THE STORY OF KANNUR"}</p>
          <h2 id="history-title">{ml ? "ഓരോ തീരത്തിനും ഒരു കഥയുണ്ട്." : "Every shore has a story."}</h2>
          <p>{ml ? "രാജാക്കന്മാരുടെയും കടൽവ്യാപാരത്തിന്റെയും കോട്ടകളുടെയും കഥ — നാല് ചെറിയ അധ്യായങ്ങളിലൂടെ." : "Kings, sea routes and forts. Explore four short chapters from Kannur's past."}</p>
        </div>
        <div className="history-stage">
          <div className="history-image" key={chapter.image}>
            <img src={chapter.image} alt={ml ? chapter.altMl : chapter.alt} loading="lazy" decoding="async" />
            <div className="history-image-shade" />
            <span className="history-image-caption">{ml ? chapter.altMl : chapter.alt}</span>
            <span className="history-image-count">0{selected + 1} / 0{chapters.length}</span>
          </div>
          <div className="history-story">
            <div className="history-chapters" role="group" aria-label={ml ? "ചരിത്ര അധ്യായങ്ങൾ" : "History chapters"}>
              {chapters.map((item, index) => (
                <button key={item.era} type="button" className={selected === index ? "active" : ""} aria-pressed={selected === index} onClick={() => setSelected(index)}>
                  <span className="history-chapter-index">0{index + 1}</span>
                  <span>{ml ? item.eraMl : item.era}</span>
                </button>
              ))}
            </div>
            <div className="history-detail" aria-live="polite">
              <p className="history-era">{ml ? chapter.eraMl : chapter.era}</p>
              <h3>{ml ? chapter.titleMl : chapter.title}</h3>
              <p>{ml ? chapter.bodyMl : chapter.body}</p>
              <div className="history-actions">
                <Link to={chapter.place}>{ml ? "സ്ഥലം കാണുക" : "Explore the place"} <span aria-hidden="true">↗</span></Link>
                <a href={chapter.source} target="_blank" rel="noopener noreferrer">{ml ? "ചരിത്ര സ്രോതസ്സ്" : "Historical source"} <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
