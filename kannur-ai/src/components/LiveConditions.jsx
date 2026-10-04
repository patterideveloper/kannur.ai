import { useEffect, useState } from "react";

export default function LiveConditions({ lang, fallback }) {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    fetch("/api/live-conditions", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("unavailable");
        return response.json();
      })
      .then((data) => setState({ status: "ready", data }))
      .catch(() => setState({ status: "error", data: null }))
      .finally(() => clearTimeout(timeout));
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  if (state.status !== "ready") return <span className="live-conditions">{fallback}</span>;

  const { current, sun } = state.data;
  const condition = lang === "ml" ? current.condition.ml : current.condition.en;

  return (
    <span className="live-conditions">
      {current.tempC}°C · {condition} · {lang === "ml" ? "സൂര്യാസ്തമയം" : "Sunset"} {sun.sunset}
    </span>
  );
}
