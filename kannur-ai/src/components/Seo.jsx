import { Helmet } from "react-helmet-async";

const SITE_URL = "https://kannur.io";
const DEFAULT_TITLE = "Kannur Tourism: Beaches, Theyyam & Places to Visit | Kannur.io";
const DEFAULT_DESCRIPTION =
  "Explore Kannur, Kerala: beaches, Theyyam rituals, heritage, local food, resorts and practical travel information. A bilingual guide to North Malabar.";
const DEFAULT_IMAGE = "/og-image.svg";

export default function Seo({ title, description, path = "/", image, lang = "en" }) {
  const pageTitle = title || DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const canonicalUrl = `${SITE_URL}${path}`;
  const imageUrl = (image || DEFAULT_IMAGE).startsWith("http")
    ? image || DEFAULT_IMAGE
    : `${SITE_URL}${image || DEFAULT_IMAGE}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": path === "/" ? "WebSite" : "WebPage",
    name: path === "/" ? "Kannur.io" : pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    inLanguage: ["en", "ml"],
  };

  return (
    <Helmet>
      <html lang={lang} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <script type="application/ld+json">
        {JSON.stringify(structuredData).replace(/</g, "\\u003c")}
      </script>
    </Helmet>
  );
}
