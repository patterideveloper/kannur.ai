import Seo from "../components/Seo";
import ListingDirectory from "../components/ListingDirectory";
import { restaurants } from "../data/localDirectory";
import { specialties } from "../data/extras";

export default function Eats({ lang }) {
  const ml = lang === "ml";
  const dish = specialties[0];
  const whereToTry = restaurants.filter((r) => r.kind === "Biryani");
  return <>
    <Seo lang={lang} path="/eats" title="Restaurants in Kannur | Kannur.io" description="Explore Kannur's local restaurants, biryani houses and seafood spots with locations and sources." />
    {dish && (
      <section className="signature-dish">
        <div className="signature-dish-inner">
          <p className="eyebrow">{ml ? "കണ്ണൂരിന്റെ സ്പെഷ്യൽ" : "KANNUR'S SIGNATURE DISH"}</p>
          <h2>{ml ? dish.nameMl : dish.name}</h2>
          <p>{ml ? dish.descriptionMl : dish.description}</p>
          {dish.source && (
            <a className="text-link" href={dish.source} target="_blank" rel="noreferrer">
              {ml ? "കൂടുതൽ വായിക്കൂ ↗" : "Read more ↗"}
            </a>
          )}
          {whereToTry.length > 0 && (
            <div className="signature-dish-where">
              <span>{ml ? "എവിടെ കഴിക്കാം:" : "Where to try it:"}</span>
              <ul>
                {whereToTry.map((r) => (
                  <li key={r.id}>{ml ? r.ml : r.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    )}
    <ListingDirectory lang={lang} theme="food" eyebrow={ml ? "കണ്ണൂരിന്റെ രുചികൾ" : "THE FOOD GUIDE"} title={ml ? "കണ്ണൂരിൽ എവിടെ ഭക്ഷണം കഴിക്കാം" : "Eat your way through Kannur."} intro={ml ? "തലശ്ശേരി ബിരിയാണി മുതൽ കടൽവിഭവങ്ങൾ വരെ — നാടിന്റെ പ്രിയപ്പെട്ട ഭക്ഷണശാലകൾ കണ്ടെത്തൂ." : "From Thalassery biryani to coastal seafood, find the places locals keep coming back to."} items={restaurants} types={["Biryani", "Seafood", "Malabar", "Cafe", "Breakfast"]} />
  </>;
}
