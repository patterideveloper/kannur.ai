import { useState } from "react";

export default function ShareButton({ lang, title, className = "", label }) {
  const ml = lang === "ml";
  const [status, setStatus] = useState("");

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        setStatus(ml ? "ലിങ്ക് പകർത്തി" : "Link copied");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setStatus(ml ? "പങ്കിടാൻ കഴിഞ്ഞില്ല. പേജ് ലിങ്ക് പകർത്തുക." : "Unable to share. Copy the page URL instead.");
      }
    }
  }

  return (
    <span className="share-button-wrap">
      <button type="button" className={`share-button ${className}`.trim()} onClick={share}>
        {label || (ml ? "പങ്കിടൂ" : "Share")} ↗
      </button>
      {status && <span role="status" className="share-button-status">{status}</span>}
    </span>
  );
}
