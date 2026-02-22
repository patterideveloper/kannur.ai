import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Theyyam({ lang, t }) {
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(() => {
    const end = new Date();
    end.setDate(end.getDate() + 7);
    return end.toISOString().slice(0, 10);
  });
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [sources, setSources] = useState([]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/theyyam?start=${startDate}&end=${endDate}`);
      const data = await response.json();
      setEvents(data.events || []);
      setSources(data.sources || []);
    } catch (error) {
      setEvents([]);
      setSources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <main className="page">
      <section className="page-hero">
        <Link className="back-link" to="/">
          ← {lang === "ml" ? "ഹോം" : "Back to Home"}
        </Link>
        <h1>{lang === "ml" ? "തെയ്യം കലണ്ടർ" : "Theyyam Calendar"}</h1>
        <p>
          {lang === "ml"
            ? "യാത്രാ തീയതികൾ തിരഞ്ഞെടുക്കൂ; സ്ഥിരീകരിച്ച തെയ്യം ചടങ്ങുകൾ കാണാം."
            : "Choose your travel dates to find verified Theyyam rituals."}
        </p>
      </section>

      <section className="theyyam-section">
        <div className="theyyam-controls">
          <label>
            {t?.predictor?.startLabel || "Start date"}
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </label>
          <label>
            {t?.predictor?.endLabel || "End date"}
            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </label>
          <button className="primary" onClick={fetchEvents}>
            {t?.predictor?.find || "Find performances"}
          </button>
        </div>

        {loading ? (
          <p className="theyyam-state">{t?.predictor?.loading || "Finding events..."}</p>
        ) : events.length === 0 ? (
          <p className="theyyam-state">{t?.predictor?.empty || "No events found in this range."}</p>
        ) : (
          <div className="theyyam-grid">
            {events.map((event) => (
              <article key={`${event.date}-${event.venue}`} className="theyyam-card">
                <p className="theyyam-date">{event.date}</p>
                <h3>{event.theyyam}</h3>
                <div className="theyyam-meta-grid">
                  <p>
                    <strong>{t?.labels?.panchayath || "Panchayath"}:</strong> {event.panchayath}
                  </p>
                  <p>
                    <strong>{t?.labels?.taluk || "Taluk"}:</strong> {event.taluk}
                  </p>
                  <p>
                    <strong>{t?.labels?.timing || "Timing"}:</strong> {event.timing}
                  </p>
                  <p>
                    <strong>{t?.labels?.contact || "Contact"}:</strong> {event.contact}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        {sources.length > 0 && (
          <div className="theyyam-sources">
            <p>{t?.predictor?.sources || "Sources"}</p>
            <div className="source-links">
              {sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                  {source.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
