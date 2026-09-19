import { useEffect, useState } from "react";
export default function CivicUpdates({ lang }) {
  const [civicData, setCivicData] = useState(null);
  const [civicLoading, setCivicLoading] = useState(true);
  const [civicError, setCivicError] = useState(false);
  const activeCivicUpdate = 0;
  const roleLabel = (role) =>
    lang === "ml"
      ? {
          Mayor: "മേയർ",
          "Deputy Mayor": "ഡെപ്യൂട്ടി മേയർ",
          Secretary: "സെക്രട്ടറി",
          "District Collector": "ജില്ലാ കലക്ടർ",
        }[role] || role
      : role;
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    fetch("/api/kannur-civic", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setCivicData)
      .catch(() => setCivicError(true))
      .finally(() => setCivicLoading(false));
    return () => { clearTimeout(timeout); controller.abort(); };
  }, []);
  return (
    <div className="civic-wrap">
      {civicError && <p role="alert">{lang === "ml" ? "ഔദ്യോഗിക വിവരങ്ങൾ ഇപ്പോൾ ലഭ്യമല്ല. പിന്നീട് വീണ്ടും ശ്രമിക്കുക." : "Official updates are temporarily unavailable. Please try again later."}</p>}
      {" "}
      <section id="civic-updates" className="civic-section">
        <div className="civic-content">
          <div className="civic-head">
            <p className="eyebrow">
              {lang === "ml"
                ? "കണ്ണൂർ സിവിക് അപ്‌ഡേറ്റ്സ്"
                : "Kannur Civic Updates"}
            </p>
            <h2 className="section-title civic-title">
              {lang === "ml"
                ? "കണ്ണൂരിന്റെ നിലവിലെ ഭരണവും ഔദ്യോഗിക അപ്‌ഡേറ്റുകളും"
                : "District leadership & official updates"}
            </h2>
            <p className="civic-meta">
              {civicLoading
                ? lang === "ml"
                  ? "ഡാറ്റ ലോഡ് ചെയ്യുന്നു..."
                  : "Loading latest official data..."
                : civicData?.fetchedAt
                  ? `${lang === "ml" ? "അവസാനം അപ്‌ഡേറ്റ് ചെയ്തത്" : "Last updated"}: ${new Date(civicData.fetchedAt).toLocaleString(lang === "ml" ? "ml-IN" : "en-IN")}`
                  : lang === "ml"
                    ? "ഓദ്യോഗിക സ്രോതസ്സിൽ നിന്ന് ഡാറ്റ"
                    : "Data from official civic source"}
            </p>
          </div>

          <div className="civic-ticker">
            <span>{lang === "ml" ? "ലൈവ്" : "LIVE"}</span>
            <p>
              {civicData?.updates?.[activeCivicUpdate] ||
                (lang === "ml"
                  ? "കണ്ണൂർ കോർപ്പറേഷൻ ഔദ്യോഗിക പോർട്ടലിൽ നിന്നുള്ള അപ്‌ഡേറ്റുകൾ ഇവിടെ കാണിക്കും."
                  : "Updates from Kannur Corporation official portal will appear here.")}
            </p>
          </div>

          <div className="civic-kpis">
            <div className="civic-kpi">
              <strong>{civicData?.officials?.length || 0}</strong>
              <span>
                {lang === "ml" ? "പ്രധാന ഭരണ ചുമതലകൾ" : "Key Leadership Roles"}
              </span>
            </div>
            <div className="civic-kpi">
              <strong>{civicData?.updates?.length || 0}</strong>
              <span>
                {lang === "ml" ? "പുതിയ അറിയിപ്പുകൾ" : "Recent Notices"}
              </span>
            </div>
            <div className="civic-kpi">
              <strong>{civicData?.services?.length || 0}</strong>
              <span>
                {lang === "ml" ? "പ്രധാന സേവനങ്ങൾ" : "Service Categories"}
              </span>
            </div>
          </div>

          <div className="civic-grid dynamic">
            <article className="civic-card">
              <h3>
                {lang === "ml" ? "നിലവിലെ ഭരണചുമതല" : "Current Leadership"}
              </h3>
              <ul className="official-list">
                {(civicData?.officials || []).map((item) => (
                  <li key={`${item.role}-${item.name}`}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={`${item.name} ${item.role}`}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                    <strong>{roleLabel(item.role)}</strong>
                    <span>{item.name}</span>
                    {item.phone ? <small>{item.phone}</small> : null}
                  </li>
                ))}
                {!civicData?.officials?.length && !civicLoading && (
                  <li>
                    <span>
                      {lang === "ml"
                        ? "മേയർ/ഡെപ്യൂട്ടി മേയർ/സെക്രട്ടറി വിവരങ്ങൾ ലഭ്യമല്ല."
                        : "Mayor/Deputy Mayor/Secretary data unavailable."}
                    </span>
                  </li>
                )}
              </ul>
            </article>

            <article className="civic-card civic-visual-card">
              <img
                src="/images/hero/st_angelo_fort-1200.jpg"
                alt={lang === "ml" ? "കണ്ണൂർ നഗര ദൃശ്യം" : "Kannur cityscape"}
                loading="lazy"
                decoding="async"
              />
              <div className="civic-visual-overlay">
                <p>{lang === "ml" ? "ഡിസ്ട്രിക്ട് പൾസ്" : "District Pulse"}</p>
                <h3>
                  {civicData?.updates?.[activeCivicUpdate] ||
                    (lang === "ml"
                      ? "കണ്ണൂർ കോർപ്പറേഷൻ വാർത്തകൾ"
                      : "Kannur Corporation Updates")}
                </h3>
              </div>
            </article>

            <article className="civic-card">
              <h3>{lang === "ml" ? "പുതിയ അറിയിപ്പുകൾ" : "Recent Updates"}</h3>
              <ul>
                {(civicData?.updates || []).slice(0, 6).map((item) => (
                  <li key={item}>{item}</li>
                ))}
                {!civicData?.updates?.length && !civicLoading && (
                  <li>
                    {lang === "ml"
                      ? "പുതിയ അറിയിപ്പുകൾ ലഭ്യമല്ല."
                      : "No updates available right now."}
                  </li>
                )}
              </ul>
            </article>

            <article className="civic-card">
              <h3>
                {lang === "ml"
                  ? "വാഹന രജിസ്ട്രേഷൻ (കണ്ണൂർ)"
                  : "Vehicle Registration (Kannur)"}
              </h3>
              <div className="reg-list">
                {[
                  "KL-13 Kannur",
                  "KL-58 Thalassery",
                  "KL-59 Taliparamba",
                  "KL-78 Iritty",
                  "KL-86 Payyanur",
                ].map((item) => (
                  <span key={item} className="reg-chip">
                    {item}
                  </span>
                ))}
              </div>
            </article>

            <article className="civic-card civic-card-wide">
              <h3>
                {lang === "ml"
                  ? "കണ്ണൂർ കോർപ്പറേഷൻ - പെട്ടെന്നുള്ള വിവരങ്ങൾ"
                  : "Kannur Corporation Quick Facts"}
              </h3>
              <div className="civic-facts">
                <p>
                  <strong>{lang === "ml" ? "ബന്ധപ്പെടുക" : "Contact"}:</strong>{" "}
                  {civicData?.contact?.phone || "0497-2700141"}
                </p>
                <p>
                  <strong>{lang === "ml" ? "ഇമെയിൽ" : "Email"}:</strong>{" "}
                  {civicData?.contact?.email ||
                    "kannurmunicipalcorporation@gmail.com"}
                </p>
                <p>
                  <strong>{lang === "ml" ? "സേവനങ്ങൾ" : "Services"}:</strong>{" "}
                  {(civicData?.services || []).slice(0, 5).join(", ") ||
                    (lang === "ml"
                      ? "ജനന/മരണം രജിസ്ട്രേഷൻ, പ്രോപ്പർട്ടി ടാക്സ്, ലൈസൻസ് സേവനങ്ങൾ"
                      : "Civil Registration, Property Tax, License Services")}
                </p>
              </div>
              <a
                className="secondary-link"
                href="https://kannurcorporation.lsgkerala.gov.in/"
                target="_blank"
                rel="noreferrer"
              >
                {lang === "ml"
                  ? "ഓദ്യോഗിക പോർട്ടൽ തുറക്കുക"
                  : "Open Official Portal"}
              </a>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
