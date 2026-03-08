import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Seo from "../components/Seo";

function buildDetailImages(place, remoteImages = []) {
  const images = [...(place.images || [])];
  if (images.length === 0 && remoteImages.length === 0) return images;

  const primary = images[0];
  const remoteMapped = (remoteImages || []).map((img) => ({
    url: img.url,
    srcSet: null,
    alt: img.alt || `${place.name} photo`,
    credit: img.credit || "Wikimedia Commons",
    creditUrl: img.creditUrl,
  }));

  for (const img of remoteMapped) {
    if (images.length >= 4) break;
    if (!img.url) continue;
    const exists = images.some((item) => item.url === img.url);
    if (!exists) images.push(img);
  }

  if (!primary?.url || !primary?.srcSet) return images.slice(0, 4);
  const variants = ["view2", "view3", "view4"];

  for (const variant of variants) {
    if (images.length >= 4) break;
    const variantUrl = primary.url.replace(/-800\.jpg$/, `_${variant}-800.jpg`);
    if (variantUrl === primary.url) continue;
    const alreadyExists = images.some((item) => item.url === variantUrl);
    if (alreadyExists) continue;
    const variantSrcSet = primary.srcSet.replace(/-([0-9]+)\.jpg/g, `_${variant}-$1.jpg`);
    images.push({
      ...primary,
      url: variantUrl,
      srcSet: variantSrcSet,
      alt: `${primary.alt || place.name} alternate view`,
    });
  }

  return images.slice(0, 4);
}

function getDetailTemplate(place, lang, displayType, displayArea) {
  const locale = lang === "ml" ? "ml" : "en";
  const hasTag = (tag) => Array.isArray(place.tags) && place.tags.includes(tag);

  let kind = "default";
  if (hasTag("beach") || place.type === "Beach") kind = "beach";
  else if (hasTag("heritage") || place.type === "Heritage") kind = "heritage";
  else if (hasTag("hill") || place.type === "Hill") kind = "hill";
  else if (hasTag("wildlife") || place.type === "Wildlife" || place.type === "Zoo") {
    kind = "nature";
  } else if (hasTag("shopping") || place.type === "Shopping") kind = "shopping";
  else if (hasTag("temple") || hasTag("church") || hasTag("mosque") || place.type === "Worship") {
    kind = "worship";
  }

  const templates = {
    en: {
      beach: {
        overview:
          "This stretch is best enjoyed unhurried. Early mornings are calm, evenings are ideal for long walks and sunset photos, and sea breeze stays pleasant through most months.",
        bestTime: "October to March; sunset hours are usually the most scenic.",
        duration: "1.5 to 3 hours",
        experience: "Sunset views, shoreline walk, relaxed family time, quick photo stop",
        tips: [
          "Check tide and wave conditions before entering wet sand zones.",
          "Carry water and slippers; sand can get hot in peak afternoon.",
          "Keep the beach clean and avoid plastic littering.",
        ],
      },
      heritage: {
        overview:
          "This is one of the key historical experiences around Kannur. Plan enough time to walk the site slowly, read context boards if available, and stay through golden hour for photography.",
        bestTime: "October to March; visit early morning or late afternoon for softer light.",
        duration: "1.5 to 2.5 hours",
        experience: "Architecture, history walk, photo points, coastal views",
        tips: [
          "Wear comfortable footwear for stone steps and uneven paths.",
          "Carry a light cap or umbrella in summer months.",
          "Respect restricted sections and local heritage rules.",
        ],
      },
      hill: {
        overview:
          "A good choice when you want cooler weather and viewpoint-focused travel. Weather can shift quickly, so keep the plan flexible and avoid very late starts.",
        bestTime: "October to February for clearer views and comfortable trekking weather.",
        duration: "3 to 5 hours",
        experience: "Viewpoints, short treks, misty landscapes, nature photography",
        tips: [
          "Start early and keep buffer time for weather changes.",
          "Carry drinking water, light snacks, and a rain layer.",
          "Use proper shoes with grip on wet trails.",
        ],
      },
      nature: {
        overview:
          "This stop works best as a slow-pace nature experience. Keep noise low, follow local guidelines, and give yourself enough time to observe the surroundings.",
        bestTime: "October to March; mornings are usually better for visibility and comfort.",
        duration: "2 to 4 hours",
        experience: "Green landscapes, quiet exploration, family-friendly outing",
        tips: [
          "Avoid feeding animals and stay on marked areas.",
          "Carry insect repellent for greener zones.",
          "Choose daylight hours for safer navigation.",
        ],
      },
      shopping: {
        overview:
          "Ideal for picking up local craft, handloom, and Kannur-style souvenirs. Compare 2-3 stores where possible, then choose based on quality and authenticity.",
        bestTime: "Late morning to evening, year-round.",
        duration: "1 to 2.5 hours",
        experience: "Handloom browsing, local craft shopping, gift picks",
        tips: [
          "Ask about handloom origin and material before purchase.",
          "Keep digital payment + small cash ready for mixed billing options.",
          "Pack fragile handicrafts separately while traveling.",
        ],
      },
      worship: {
        overview:
          "This place is culturally important to local communities. Visit respectfully, follow dress and photography guidance, and align with prayer or ritual timings.",
        bestTime: "Early morning or evening; festival days can be crowded.",
        duration: "45 minutes to 2 hours",
        experience: "Ritual atmosphere, architecture, spiritual visit",
        tips: [
          "Dress modestly and follow local entry customs.",
          "Check timing in advance, especially on special days.",
          "Keep silence in prayer areas and avoid blocking pathways.",
        ],
      },
      default: {
        overview:
          "A recommended stop in Kannur for visitors who want a balanced mix of local culture, views, and easy access. Plan this as a core point in your route.",
        bestTime: "October to March for generally comfortable weather.",
        duration: "1 to 2 hours",
        experience: "Local atmosphere, photo moments, relaxed exploration",
        tips: [
          "Start early to avoid peak crowd windows.",
          "Carry water and keep a lightweight day bag.",
          "Use maps for live route and parking updates.",
        ],
      },
    },
    ml: {
      beach: {
        overview:
          "ഈ കടൽത്തീരം ആസ്വദിക്കാൻ മികച്ചത് മന്ദഗതിയിലുള്ള സന്ദർശനമാണ്. രാവിലെ ശാന്തതയും വൈകുന്നേരം സൺസെറ്റ് ദൃശ്യങ്ങളും ഫോട്ടോഗ്രഫിക്കും മികച്ചതാണ്.",
        bestTime: "ഒക്ടോബർ മുതൽ മാർച്ച് വരെ; സന്ധ്യാസമയമാണ് സാധാരണയായി ഏറ്റവും മനോഹരം.",
        duration: "1.5 മുതൽ 3 മണിക്കൂർ",
        experience: "സൺസെറ്റ് ദൃശ്യങ്ങൾ, തീരനടത്ത്, കുടുംബസമയം, ഫോട്ടോ സ്റ്റോപ്പ്",
        tips: [
          "വെള്ളത്തിൽ ഇറങ്ങുന്നതിന് മുമ്പ് ടൈഡും തിരമാല സാഹചര്യവും പരിശോധിക്കുക.",
          "വെള്ളവും സ്ലിപ്പറുകളും കൈയിൽ കരുതുക; ഉച്ചയ്ക്ക് മണൽ ചൂടാകാം.",
          "ബീച്ച് ശുചിയായി സൂക്ഷിക്കുക; പ്ലാസ്റ്റിക് മാലിന്യം ഒഴിവാക്കുക.",
        ],
      },
      heritage: {
        overview:
          "കണ്ണൂരിലെ പ്രധാന പൈതൃക അനുഭവങ്ങളിലൊന്നാണിത്. ശാന്തമായി നടന്ന് കാണാൻ മതിയായ സമയം മാറ്റിവെക്കുക; സന്ധ്യയിലെ ലൈറ്റിൽ ഫോട്ടോകൾ മനോഹരമാകും.",
        bestTime: "ഒക്ടോബർ മുതൽ മാർച്ച് വരെ; രാവിലെ അല്ലെങ്കിൽ വൈകുന്നേരം മികച്ചത്.",
        duration: "1.5 മുതൽ 2.5 മണിക്കൂർ",
        experience: "വാസ്തു, ചരിത്രനടത്ത്, ഫോട്ടോ പോയിന്റുകൾ, തീരദൃശ്യങ്ങൾ",
        tips: [
          "കല്ലുപടികളും അസമമായ വഴികളും ഉള്ളതിനാൽ സൗകര്യപ്രദമായ ചെരുപ്പ് ധരിക്കുക.",
          "വേനലിൽ ലളിതമായ തൊപ്പി/കുട കരുതുക.",
          "പരിമിത പ്രദേശങ്ങളുടെയും പൈതൃക നിയമങ്ങളുടെയും നിർദ്ദേശങ്ങൾ പാലിക്കുക.",
        ],
      },
      hill: {
        overview:
          "തണുത്ത കാലാവസ്ഥയും വ്യൂ പോയിന്റ് യാത്രയും ആഗ്രഹിക്കുന്നവർക്ക് അനുയോജ്യമായിടമാണ്. കാലാവസ്ഥ വേഗത്തിൽ മാറാൻ സാധ്യതയുള്ളതിനാൽ പദ്ധതി ഇളവോടെ വയ്ക്കുക.",
        bestTime: "ഒക്ടോബർ മുതൽ ഫെബ്രുവരി വരെ; ട്രെക്കിംഗിന് സൗകര്യപ്രദം.",
        duration: "3 മുതൽ 5 മണിക്കൂർ",
        experience: "വ്യൂ പോയിന്റുകൾ, ചെറു ട്രെക്ക്, മഞ്ഞുമൂടിയ ദൃശ്യം, പ്രകൃതി ഫോട്ടോഗ്രഫി",
        tips: [
          "രാവിലെ തന്നെ ആരംഭിക്കുക; കാലാവസ്ഥ മാറ്റത്തിന് സമയം കരുതുക.",
          "വെള്ളം, ചെറിയ സ്‌നാക്ക്, മഴക്കോട്ട് എന്നിവ കൈയിൽ കരുതുക.",
          "നനഞ്ഞ വഴികളിൽ ഗ്രിപ്പ് ഉള്ള ചെരുപ്പ് ഉപയോഗിക്കുക.",
        ],
      },
      nature: {
        overview:
          "മന്ദഗതിയിൽ ആസ്വദിക്കാവുന്ന പ്രകൃതി അനുഭവത്തിനായി ഇതൊരു നല്ല സ്റ്റോപ്പാണ്. ശബ്ദം കുറച്ച് പ്രാദേശിക നിർദ്ദേശങ്ങൾ പാലിച്ച് സന്ദർശിക്കുക.",
        bestTime: "ഒക്ടോബർ മുതൽ മാർച്ച് വരെ; രാവിലെ സാധാരണയായി മികച്ചത്.",
        duration: "2 മുതൽ 4 മണിക്കൂർ",
        experience: "പച്ചപ്പുള്ള ദൃശ്യങ്ങൾ, ശാന്ത പര്യവേക്ഷണം, കുടുംബസഞ്ചാരം",
        tips: [
          "മൃഗങ്ങൾക്ക് ഭക്ഷണം കൊടുക്കരുത്; അടയാളപ്പെടുത്തിയ പ്രദേശങ്ങളിൽ മാത്രം തുടരുക.",
          "പച്ചപ്പുള്ള പ്രദേശങ്ങളിൽ കൊതുക് പ്രതിരോധം കരുതുക.",
          "സുരക്ഷയ്ക്ക് പകൽ സമയത്ത് സന്ദർശിക്കുക.",
        ],
      },
      shopping: {
        overview:
          "കണ്ണൂരിലെ കൈത്തറി, ഹാൻഡിക്രാഫ്റ്റ്, സ്മരണികകൾ വാങ്ങാൻ അനുയോജ്യമായ സ്റ്റോപ്പാണ്. കഴിയുമെങ്കിൽ 2-3 കടകൾ തമ്മിൽ താരതമ്യം ചെയ്ത് വാങ്ങുക.",
        bestTime: "വൈകുന്നേരം വരെ; വർഷം മുഴുവൻ.",
        duration: "1 മുതൽ 2.5 മണിക്കൂർ",
        experience: "കൈത്തറി ഷോപ്പിംഗ്, പ്രാദേശിക ഹാൻഡിക്രാഫ്റ്റ്, ഗിഫ്റ്റ് പിക്കുകൾ",
        tips: [
          "വാങ്ങുന്നതിന് മുമ്പ് മെറ്റീരിയലും ഉത്ഭവവും ചോദിച്ച് ഉറപ്പാക്കുക.",
          "ഡിജിറ്റൽ പേയ്മെന്റിനൊപ്പം ചെറിയ കാഷും കരുതുക.",
          "ഭംഗുരമായ സാധനങ്ങൾ യാത്രയ്ക്ക് വേർതിരിച്ച് പാക്ക് ചെയ്യുക.",
        ],
      },
      worship: {
        overview:
          "പ്രാദേശിക സമൂഹത്തിന് സാംസ്കാരിക-ആധ്യാത്മിക പ്രാധാന്യമുള്ള ഇടമാണ് ഇത്. വസ്ത്രധാരണവും ഫോട്ടോ നിയമങ്ങളും മാനിച്ച് സന്ദർശിക്കുക.",
        bestTime: "രാവിലെ/വൈകുന്നേരം; ഉത്സവദിവസങ്ങളിൽ തിരക്ക് കൂടുതലാകാം.",
        duration: "45 മിനിറ്റിൽ നിന്ന് 2 മണിക്കൂർ",
        experience: "ആചാരാന്തരീക്ഷം, വാസ്തുശൈലി, ആത്മീയ സന്ദർശനം",
        tips: [
          "മിതമായ വസ്ത്രധാരണം പാലിക്കുക; പ്രാദേശിക പ്രവേശനരീതികൾ മാനിക്കുക.",
          "പ്രത്യേക ദിവസങ്ങളിൽ സമയം മുൻകൂട്ടി പരിശോധിക്കുക.",
          "പ്രാർത്ഥനാമണ്ഡപങ്ങളിൽ നിശ്ശബ്ദത പാലിക്കുക.",
        ],
      },
      default: {
        overview:
          "പ്രാദേശിക സംസ്കാരവും മനോഹര ദൃശ്യങ്ങളും എളുപ്പത്തിലുള്ള എത്തിച്ചേരലും നൽകുന്ന കണ്ണൂരിലെ ശുപാർശ ചെയ്ത സ്റ്റോപ്പാണ് ഇത്.",
        bestTime: "സാധാരണയായി സുഖകരമായ കാലാവസ്ഥയ്ക്കായി ഒക്ടോബർ മുതൽ മാർച്ച് വരെ.",
        duration: "1 മുതൽ 2 മണിക്കൂർ",
        experience: "പ്രാദേശിക അന്തരീക്ഷം, ഫോട്ടോ നിമിഷങ്ങൾ, ശാന്ത പര്യവേക്ഷണം",
        tips: [
          "തിരക്ക് കൂടുന്നതിന് മുൻപ് നേരത്തെ എത്തുക.",
          "വെള്ളവും ലഘുഭാരമുള്ള ബാഗും കരുതുക.",
          "ലൈവ് റൂട്ടിനും പാർക്കിംഗിനും മാപ്പ് ഉപയോഗിക്കുക.",
        ],
      },
    },
  };

  const selected = templates[locale][kind] || templates[locale].default;
  const labels =
    locale === "ml"
      ? {
          overviewTitle: "സ്ഥല പരിചയം",
          highlightsTitle: "എന്തുകൊണ്ട് സന്ദർശിക്കണം",
          tipsTitle: "യാത്രാ ടിപ്പുകൾ",
          quickFactsTitle: "വേഗത്തിലുള്ള വിവരങ്ങൾ",
          bestTimeLabel: "സന്ദർശിക്കാൻ മികച്ച സമയം",
          durationLabel: "ശുപാർശ ചെയ്ത സമയം",
          locationLabel: "പ്രദേശം",
          typeLabel: "വിഭാഗം",
          experienceLabel: "മികച്ച അനുഭവങ്ങൾ",
        }
      : {
          overviewTitle: "About This Place",
          highlightsTitle: "Why You Should Visit",
          tipsTitle: "Travel Tips",
          quickFactsTitle: "Quick Facts",
          bestTimeLabel: "Best Time to Visit",
          durationLabel: "Recommended Duration",
          locationLabel: "Area",
          typeLabel: "Category",
          experienceLabel: "Best For",
        };

  return {
    ...selected,
    ...labels,
    typeValue: displayType,
    areaValue: displayArea,
  };
}

export default function PlaceDetail({ lang, t }) {
  const { placeId } = useParams();
  const location = useLocation();
  const [activeImage, setActiveImage] = useState(0);
  const [place, setPlace] = useState(null);
  const [loadingPlace, setLoadingPlace] = useState(true);
  const [remoteImages, setRemoteImages] = useState([]);

  useEffect(() => {
    const loadPlace = async () => {
      try {
        setLoadingPlace(true);
        const response = await fetch(`/api/explore/${encodeURIComponent(placeId)}`);
        if (!response.ok) {
          throw new Error("Not found");
        }
        const data = await response.json();
        setPlace(data.item || null);
      } catch (error) {
        setPlace(null);
      } finally {
        setLoadingPlace(false);
      }
    };
    loadPlace();
  }, [placeId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [placeId]);

  useEffect(() => {
    setActiveImage(0);
  }, [placeId]);

  useEffect(() => {
    const loadRemoteImages = async () => {
      if (!place) return;
      try {
        const query = place.mapsQuery || `${place.name} Kannur`;
        const response = await fetch(`/api/place-images?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          setRemoteImages([]);
          return;
        }
        const data = await response.json();
        setRemoteImages(data.items || []);
      } catch {
        setRemoteImages([]);
      }
    };

    loadRemoteImages();
  }, [place]);

  if (loadingPlace) {
    return (
      <main className="page">
        <section className="page-hero">
          <Link className="back-link" to="/explore">
            ← {lang === "ml" ? "എക്സ്പ്ലോർ" : "Back to Explore"}
          </Link>
          <h1>{lang === "ml" ? "ലോഡ് ചെയ്യുന്നു..." : "Loading..."}</h1>
        </section>
      </main>
    );
  }

  if (!place) {
    return (
      <main className="page">
        <section className="page-hero">
          <Link className="back-link" to="/explore">
            ← {lang === "ml" ? "എക്സ്പ്ലോർ" : "Back to Explore"}
          </Link>
          <h1>{lang === "ml" ? "സ്ഥലം കണ്ടെത്താനായില്ല" : "Place not found"}</h1>
        </section>
      </main>
    );
  }

  const displayName = lang === "ml" ? place.nameMl || place.name : place.name;
  const displayArea = lang === "ml" ? place.areaMl || place.area : place.area;
  const displayDesc = lang === "ml" ? place.descriptionMl || place.description : place.description;
  const displayType = t.types[place.type.toLowerCase()] || place.type;
  const mapsQuery = place.mapsQuery || `${place.name} Kannur`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`;
  const backPath = location.state?.from || "/explore";
  const images = buildDetailImages(place, remoteImages);
  const activeImageItem = images[activeImage] || null;
  const hasMultipleImages = images.length > 1;
  const detail = getDetailTemplate(place, lang, displayType, displayArea);
  const deep = place.deepContent || {};
  const historyText = lang === "ml" ? deep.historyMl || deep.historyEn : deep.historyEn;
  const timingsText = lang === "ml" ? deep.timingsMl || deep.timingsEn : deep.timingsEn;
  const entryFeeText = lang === "ml" ? deep.entryFeeMl || deep.entryFeeEn : deep.entryFeeEn;
  const photoPoints =
    lang === "ml"
      ? deep.photoPointsMl || deep.photoPointsEn || []
      : deep.photoPointsEn || deep.photoPointsMl || [];
  const nearbyStops =
    lang === "ml"
      ? deep.nearbyStopsMl || deep.nearbyStopsEn || []
      : deep.nearbyStopsEn || deep.nearbyStopsMl || [];

  return (
    <main className="page">
      <Seo
        lang={lang === "ml" ? "ml" : "en"}
        path={`/explore/place/${place.id}`}
        title={`${displayName} | Kannur | Explore Tourism`}
        description={displayDesc}
      />

      <section className="page-hero">
        <Link className="back-link" to={backPath}>
          ← {lang === "ml" ? "എക്സ്പ്ലോറിലേക്ക് മടങ്ങുക" : "Back to Explore"}
        </Link>
        <h1>{displayName}</h1>
        <p>{displayDesc}</p>
      </section>

      <section className="detail-layout">
        <div className="detail-main">
          <section className="detail-meta">
            <div className="detail-pill">{displayType}</div>
            <div className="detail-pill">{displayArea}</div>
          </section>

          <section className="detail-gallery">
            {activeImageItem && (
              <figure className="detail-image-card detail-carousel">
                <picture>
                  {activeImageItem.srcSet && (
                    <source
                      type="image/webp"
                      srcSet={activeImageItem.srcSet.replace(/\.jpg/g, ".webp")}
                    />
                  )}
                  <img
                    src={activeImageItem.url}
                    srcSet={activeImageItem.srcSet || undefined}
                    sizes="100vw"
                    alt={activeImageItem.alt || displayName}
                    loading="eager"
                    decoding="async"
                  />
                </picture>

                {hasMultipleImages && (
                  <>
                    <button
                      className="carousel-nav prev"
                      type="button"
                      onClick={() =>
                        setActiveImage((prev) => (prev - 1 + images.length) % images.length)
                      }
                      aria-label={lang === "ml" ? "മുൻ ചിത്രം" : "Previous image"}
                    >
                      ‹
                    </button>
                    <button
                      className="carousel-nav next"
                      type="button"
                      onClick={() => setActiveImage((prev) => (prev + 1) % images.length)}
                      aria-label={lang === "ml" ? "അടുത്ത ചിത്രം" : "Next image"}
                    >
                      ›
                    </button>
                  </>
                )}

                {activeImageItem.credit && activeImageItem.creditUrl && (
                  <figcaption>
                    <a href={activeImageItem.creditUrl} target="_blank" rel="noreferrer">
                      Photo: {activeImageItem.credit}
                    </a>
                  </figcaption>
                )}
              </figure>
            )}
          </section>

          <section className="detail-card">
            <h2>{detail.overviewTitle}</h2>
            <p>{displayDesc}</p>
            <p>{detail.overview}</p>
          </section>

          {historyText && (
            <section className="detail-card">
              <h2>{lang === "ml" ? "ചരിത്രവും പശ്ചാത്തലവും" : "History & Context"}</h2>
              <p>{historyText}</p>
            </section>
          )}

          <section className="detail-card">
            <h2>{detail.highlightsTitle}</h2>
            <div className="detail-grid-two">
              <div className="detail-mini">
                <h3>{detail.bestTimeLabel}</h3>
                <p>{detail.bestTime}</p>
              </div>
              <div className="detail-mini">
                <h3>{detail.durationLabel}</h3>
                <p>{detail.duration}</p>
              </div>
              <div className="detail-mini detail-mini-wide">
                <h3>{detail.experienceLabel}</h3>
                <p>{detail.experience}</p>
              </div>
            </div>
          </section>

          <section className="detail-card">
            <h2>{detail.tipsTitle}</h2>
            <ul className="detail-tips">
              {detail.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </section>

          <section className="detail-card">
            <h2>{lang === "ml" ? "പ്രായോഗിക വിവരങ്ങൾ" : "Practical Information"}</h2>
            <div className="detail-grid-two">
              <div className="detail-mini">
                <h3>{lang === "ml" ? "സമയം" : "Timings"}</h3>
                <p>{timingsText || (lang === "ml" ? "മാറാം" : "May vary")}</p>
              </div>
              <div className="detail-mini">
                <h3>{lang === "ml" ? "പ്രവേശന ഫീസ്" : "Entry Fee"}</h3>
                <p>{entryFeeText || (lang === "ml" ? "മാറാം" : "May vary")}</p>
              </div>
            </div>
          </section>

          <section className="detail-card">
            <h2>{lang === "ml" ? "മികച്ച ഫോട്ടോ പോയിന്റുകൾ" : "Best Photo Points"}</h2>
            <ul className="detail-tips">
              {photoPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="detail-card">
            <h2>{lang === "ml" ? "സമീപ സ്റ്റോപ്പുകൾ" : "Nearby Stops"}</h2>
            <ul className="detail-tips">
              {nearbyStops.map((stop) => (
                <li key={stop}>{stop}</li>
              ))}
            </ul>
          </section>

          <section className="detail-map-wrap">
            <div className="place-actions">
              <a className="map-link" href={mapsUrl} target="_blank" rel="noreferrer">
                {t.mapsLink}
              </a>
            </div>
            <div className="detail-map">
              <iframe
                src={mapsEmbed}
                title={`${displayName} map`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        </div>

        <aside className="detail-side">
          <section className="detail-card detail-facts">
            <h2>{detail.quickFactsTitle}</h2>
            <div className="fact-row">
              <span>{detail.typeLabel}</span>
              <strong>{detail.typeValue}</strong>
            </div>
            <div className="fact-row">
              <span>{detail.locationLabel}</span>
              <strong>{detail.areaValue}</strong>
            </div>
            <div className="fact-row">
              <span>{detail.bestTimeLabel}</span>
              <strong>{detail.bestTime}</strong>
            </div>
            <div className="fact-row">
              <span>{detail.durationLabel}</span>
              <strong>{detail.duration}</strong>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
