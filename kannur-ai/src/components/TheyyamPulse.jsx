import { useEffect, useState } from "react";

function currentMonthInKannur() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(new Date());
  const get = (type) => parts.find((part) => part.type === type)?.value;
  return `${get("year")}-${get("month")}`;
}

// Surfaces the live Theyyam calendar's current-month count as a small
// "season is on" signal. Silently renders nothing on error or when the
// scraped source has no listings this month (off-season), rather than
// ever showing a stale or misleading count.
export default function TheyyamPulse({ lang }) {
  const [state, setState] = useState({ status: "loading", count: 0 });

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    fetch(`/api/theyyam?month=${currentMonthInKannur()}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("unavailable");
        return response.json();
      })
      .then((data) => setState({ status: "ready", count: data.events?.length || 0 }))
      .catch(() => setState({ status: "error", count: 0 }))
      .finally(() => clearTimeout(timeout));
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  if (state.status !== "ready" || state.count === 0) return null;

  return (
    <p className="ritual-pulse">
      <span className="pulse-dot" aria-hidden="true" />
      {lang === "ml"
        ? `ഈ മാസം ${state.count} തെയ്യങ്ങൾ കലണ്ടറിൽ`
        : `${state.count} Theyyam ritual${state.count === 1 ? "" : "s"} listed this month`}
    </p>
  );
}
