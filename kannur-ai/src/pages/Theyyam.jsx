import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

const monthInKannur = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit" }).format(new Date());
const upcomingMonths = () => {
  const [year, month] = monthInKannur().split("-").map(Number);
  return Array.from({ length: 7 }, (_, offset) => {
    const date = new Date(Date.UTC(year, month - 1 + offset, 1));
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
  });
};
const copy = {
  en: {
    back: "Back to home", eyebrow: "RITUALS OF NORTH MALABAR", title: "Follow the sacred season.", intro: "Browse Theyyam calendar listings from Kerala Theyyam. Dates are subject to change; always confirm with the shrine before travelling.", browse: "Browse the calendar", heading: "Choose your month", explanation: "Select a month and year, up to six months ahead. Older dates are not shown.", month: "Month", year: "Year", loading: "Checking the calendar…", error: "The calendar is unavailable right now.", retry: "Try again", results: "Calendar listings", empty: "No upcoming listings for this month", emptyNote: "This source may not have published the month's rituals yet. Check back closer to the season.", dateConflict: "The source's heading gives a different year. Please confirm these dates with the shrine before planning a visit.", rituals: "Theyyams listed", source: "View source", map: "Find on Maps", checked: "Checked", note: "Visit with care", noteText: "Theyyam is a living ritual, not a scheduled stage show. Festival dates, times and access may change. Confirm locally and respect the shrine's customs.", sourceTitle: "Kerala Theyyam calendar", district: "District", all: "Kannur & nearby", kannur: "Kannur only", nearby: "Nearby districts", count: "listings", noneKannur: "No Kannur listings for this month. Try Kannur & nearby to see other published events.", nextMonth: "See next month",
  },
  ml: {
    back: "ഹോമിലേക്ക്", eyebrow: "വടക്കൻ മലബാറിന്റെ അനുഷ്ഠാനം", title: "തെയ്യക്കാലം കണ്ടെത്താം.", intro: "കേരള തെയ്യം പ്രസിദ്ധീകരിച്ച കലണ്ടർ കാണാം. തീയതികൾ മാറാം; യാത്രയ്ക്ക് മുമ്പ് കാവുമായി ഉറപ്പാക്കുക.", browse: "കലണ്ടർ കാണുക", heading: "മാസം തിരഞ്ഞെടുക്കൂ", explanation: "ഈ മാസവും അടുത്ത ആറു മാസങ്ങളും തിരഞ്ഞെടുക്കാം. കഴിഞ്ഞ തീയതികൾ കാണിക്കില്ല.", month: "മാസം", year: "വർഷം", loading: "കലണ്ടർ പരിശോധിക്കുന്നു…", error: "കലണ്ടർ ഇപ്പോൾ ലഭ്യമല്ല.", retry: "വീണ്ടും ശ്രമിക്കുക", results: "കലണ്ടറിലെ തെയ്യങ്ങൾ", empty: "ഈ മാസത്തിൽ വരാനിരിക്കുന്ന തെയ്യങ്ങൾ പട്ടികയിൽ ഇല്ല", emptyNote: "ഈ മാസത്തെ തെയ്യങ്ങൾ ഇനിയും പ്രസിദ്ധീകരിച്ചിട്ടില്ലായിരിക്കാം. സീസണിനോട് അടുത്ത് വീണ്ടും പരിശോധിക്കുക.", dateConflict: "ഉറവിടത്തിലെ തലക്കെട്ടിൽ മറ്റൊരു വർഷമാണ്. യാത്രയ്ക്ക് മുമ്പ് കാവുമായി തീയതി സ്ഥിരീകരിക്കുക.", rituals: "പട്ടികയിലെ തെയ്യങ്ങൾ", source: "ഉറവിടം കാണുക", map: "മാപ്പിൽ കാണുക", checked: "പരിശോധിച്ചത്", note: "ആചാരങ്ങളെ മാനിക്കാം", noteText: "തെയ്യം ഒരു അനുഷ്ഠാനമാണ്, സ്റ്റേജ് ഷോ അല്ല. തീയതിയും സമയവും പ്രവേശനവും മാറാം. കാവുമായി സ്ഥിരീകരിച്ച് ആചാരങ്ങൾ പാലിക്കുക.", sourceTitle: "കേരള തെയ്യം കലണ്ടർ", district: "ജില്ല", all: "കണ്ണൂരും സമീപവും", kannur: "കണ്ണൂർ മാത്രം", nearby: "സമീപ ജില്ലകൾ", count: "പട്ടികകൾ", noneKannur: "ഈ മാസത്തിൽ കണ്ണൂരിലെ തെയ്യങ്ങൾ പട്ടികയിൽ ഇല്ല. സമീപ ജില്ലകളിലെ വിവരങ്ങൾക്കായി ഫിൽട്ടർ മാറ്റുക.", nextMonth: "അടുത്ത മാസം കാണൂ",
  },
};

export default function Theyyam({ lang }) {
  const c = copy[lang] || copy.en;
  const available = useMemo(upcomingMonths, []);
  const [selected, setSelected] = useState(available[0]);
  const [area, setArea] = useState("all");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [revision, setRevision] = useState(0);
  const years = [...new Set(available.map((value) => value.slice(0, 4)))];
  const months = available.filter((value) => value.startsWith(selected.slice(0, 4)));
  const monthLabel = (value) => new Intl.DateTimeFormat(lang === "ml" ? "ml-IN" : "en-IN", { month: "long", timeZone: "UTC" }).format(new Date(`${value}-01T00:00:00Z`));
  const dateLabel = (value) => new Intl.DateTimeFormat(lang === "ml" ? "ml-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${value}T12:00:00`));
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(false); setData(null);
    fetch(`/api/theyyam?month=${selected}`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("unavailable"); return response.json(); })
      .then(setData)
      .catch((failure) => { if (failure.name !== "AbortError") setError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [selected, revision]);
  const events = (data?.events || []).filter((event) => area === "all" || (area === "kannur" ? event.district === "Kannur" : event.district !== "Kannur"));
  return (
    <main className="page theyyam-page">
      <Seo lang={lang} path="/theyyam" title={lang === "ml" ? "തെയ്യം കലണ്ടർ | Kannur.io" : "Theyyam Calendar | Kannur.io"} />
      <section className="theyyam-hero">
        <img src="/images/hero/theyyam_fire-1200.webp" srcSet="/images/hero/theyyam_fire-480.webp 480w, /images/hero/theyyam_fire-800.webp 800w, /images/hero/theyyam_fire-1200.webp 1200w" sizes="(max-width: 700px) 100vw, 1100px" alt="Theyyam fire ritual in Kannur" />
        <div className="theyyam-hero-content">
          <Link to="/" className="theyyam-back">← {c.back}</Link>
          <p className="theyyam-eyebrow">{c.eyebrow}</p><h1>{c.title}</h1><p>{c.intro}</p>
          <a className="theyyam-hero-link" href="#calendar">{c.browse} <span aria-hidden="true">↘</span></a>
        </div>
      </section>
      <section id="calendar" className="theyyam-calendar">
        <div className="theyyam-calendar-head"><span className="theyyam-kicker">THEYYAM / NORTH MALABAR</span><h2>{c.heading}</h2><p>{c.explanation}</p></div>
        <div className="theyyam-search theyyam-month-search">
          <label>{c.month}<select value={selected} onChange={(e) => setSelected(e.target.value)}>{months.map((value) => <option key={value} value={value}>{monthLabel(value)}</option>)}</select></label>
          <label>{c.year}<select value={selected.slice(0, 4)} onChange={(e) => setSelected(available.find((value) => value.startsWith(e.target.value)))}>{years.map((year) => <option key={year} value={year}>{year}</option>)}</select></label>
        </div>
        <div className="theyyam-area-filters" aria-label={c.district}>{[["all", c.all], ["kannur", c.kannur], ["nearby", c.nearby]].map(([value, label]) => <button type="button" key={value} aria-pressed={area === value} onClick={() => setArea(value)}>{label}</button>)}</div>
        {error ? <div className="theyyam-empty" role="alert"><h3>{c.error}</h3><button onClick={() => setRevision((value) => value + 1)}>{c.retry} →</button></div> : loading ? <div className="theyyam-empty" role="status">{c.loading}</div> : <>
          <div className="theyyam-result-head"><h2>{c.results}</h2><span>{events.length} {c.count}</span></div>
          {events.length === 0 ? <div className="theyyam-empty"><span aria-hidden="true">✳</span><h3>{c.empty}</h3><p>{area === "kannur" && data?.events?.length ? c.noneKannur : c.emptyNote}</p>{area === "all" && available.indexOf(selected) < available.length - 1 && <button type="button" onClick={() => setSelected(available[available.indexOf(selected) + 1])}>{c.nextMonth} →</button>}</div> : <div className="theyyam-list">{events.map((event) => <article className="theyyam-event" key={`${event.startDate}-${event.name}`}>
            <div className="theyyam-event-date"><strong>{new Date(`${event.startDate}T12:00:00`).getDate()}</strong><span>{monthLabel(event.startDate.slice(0, 7)).slice(0, 3)}</span></div>
            <div className="theyyam-event-main"><p className="theyyam-event-overline">{dateLabel(event.startDate)}{event.endDate !== event.startDate ? ` – ${dateLabel(event.endDate)}` : ""} · {event.district}</p><h3>{event.name}</h3>
              {event.dateConflict && <p className="theyyam-event-warning">{c.dateConflict}</p>}
              {event.rituals.length > 0 && <div className="theyyam-rituals"><strong>{c.rituals}</strong><div>{event.rituals.map((ritual, index) => <span key={`${ritual.name}-${index}`}>{ritual.name}{ritual.time && !event.dateConflict ? ` · ${ritual.time}` : ""}</span>)}</div></div>}
              <div className="theyyam-event-links"><a href={event.sourceUrl} target="_blank" rel="noreferrer">{c.source} ↗</a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`} target="_blank" rel="noreferrer">{c.map} ↗</a></div>
            </div>
          </article>)}</div>}
        </>}
        <aside className="theyyam-guide"><div><span className="theyyam-kicker">A NOTE FOR VISITORS</span><h2>{c.note}</h2><p>{c.noteText}</p></div><div className="theyyam-guide-links"><a href={data?.sources?.[0]?.url || "https://www.keralatheyyam.com/category/november/"} target="_blank" rel="noreferrer">{c.sourceTitle} ↗</a>{data?.checkedAt && <small>{c.checked}: {new Intl.DateTimeFormat(lang === "ml" ? "ml-IN" : "en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(data.checkedAt))}</small>}</div></aside>
      </section>
    </main>
  );
}
