import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

function localDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function Theyyam({ lang, t }) {
  const [startDate, setStartDate] = useState(() => localDate(new Date()));
  const [endDate, setEndDate] = useState(() => {
    const end = new Date();
    end.setDate(end.getDate() + 7);
    return localDate(end);
  });
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [sources, setSources] = useState([]);
  const [error, setError] = useState(false);

  const fetchEvents = async () => {
    if (!startDate || !endDate || startDate > endDate) {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);
    try {
      const response = await fetch(
        `/api/theyyam?start=${startDate}&end=${endDate}`,
        { signal: AbortSignal.timeout(20000) },
      );
      if (!response.ok) throw new Error("Calendar unavailable");
      const data = await response.json();
      setEvents(data.events || []);
      setSources(data.sources || []);
    } catch (error) {
      setError(true);
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
      <Seo
        lang={lang}
        path="/theyyam"
        title={
          lang === "ml"
            ? "തെയ്യം കലണ്ടർ | Kannur.io"
            : "Theyyam Calendar | Kannur.io"
        }
      />
      <section className="page-hero">
        <Link className="back-link" to="/">
          {lang === "ml" ? "ഹോം" : "Back to Home"}
        </Link>
        <h1>{lang === "ml" ? "തെയ്യം കലണ്ടർ" : "Theyyam Calendar"}</h1>
        <p>
          {lang === "ml"
            ? "യാത്രാ തീയതികളിലെ പ്രസിദ്ധീകരിച്ച ചടങ്ങുകൾ കാണൂ. സന്ദർശനത്തിന് മുമ്പ് ക്ഷേത്രവുമായി സമയം സ്ഥിരീകരിക്കുക."
            : "Explore published ritual schedules for your travel dates. Confirm timings with the temple before visiting."}
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
          <button className="primary" disabled={loading} onClick={fetchEvents}>
            {t?.predictor?.find || "Find performances"}
          </button>
        </div>

        {error ? (
          <p role="alert">
            {lang === "ml"
              ? "കലണ്ടർ ലഭ്യമല്ല. തീയതികൾ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക."
              : "Calendar unavailable. Check your dates and try again."}
          </p>
        ) : loading ? (
          <p className="theyyam-state">
            {t?.predictor?.loading || "Finding events..."}
          </p>
        ) : events.length === 0 ? (
          <p className="theyyam-state">
            {t?.predictor?.empty || "No events found in this range."}
          </p>
        ) : (
          <div className="theyyam-grid">
            {events.map((event) => (
              <article
                key={`${event.startDate}-${event.name}-${event.source}`}
                className="theyyam-card"
              >
                <p className="theyyam-date">
                  {event.startDate}
                  {event.endDate !== event.startDate
                    ? ` – ${event.endDate}`
                    : ""}
                </p>
                <h3>{event.name}</h3>
                <div className="theyyam-meta-grid">
                  <p>
                    <strong>{t?.labels?.panchayath || "Panchayath"}:</strong>{" "}
                    {event.panchayath}
                  </p>
                  <p>
                    <strong>{t?.labels?.taluk || "Taluk"}:</strong>{" "}
                    {event.taluk}
                  </p>
                  <p>
                    <strong>{t?.labels?.timing || "Timing"}:</strong>{" "}
                    {event.timing}
                  </p>
                  <p>
                    <strong>{t?.labels?.contact || "Contact"}:</strong>{" "}
                    {event.contact}
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
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                >
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
