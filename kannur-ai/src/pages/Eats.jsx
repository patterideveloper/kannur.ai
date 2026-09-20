import Seo from "../components/Seo";
import ListingDirectory from "../components/ListingDirectory";
import { restaurants } from "../data/localDirectory";

export default function Eats({ lang }) {
  const ml = lang === "ml";
  return <>
    <Seo lang={lang} path="/eats" title="Restaurants in Kannur | Kannur.io" description="Explore Kannur's local restaurants, biryani houses and seafood spots with locations and sources." />
    <ListingDirectory lang={lang} theme="food" eyebrow={ml ? "കണ്ണൂരിന്റെ രുചികൾ" : "THE FOOD GUIDE"} title={ml ? "കണ്ണൂരിൽ എവിടെ ഭക്ഷണം കഴിക്കാം" : "Eat your way through Kannur."} intro={ml ? "തലശ്ശേരി ബിരിയാണി മുതൽ കടൽവിഭവങ്ങൾ വരെ — നാടിന്റെ പ്രിയപ്പെട്ട ഭക്ഷണശാലകൾ കണ്ടെത്തൂ." : "From Thalassery biryani to coastal seafood, find the places locals keep coming back to."} items={restaurants} types={["Biryani", "Seafood", "Malabar", "Cafe", "Breakfast"]} />
  </>;
}
