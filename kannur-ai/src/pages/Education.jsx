import Seo from "../components/Seo";
import ListingDirectory from "../components/ListingDirectory";
import { institutions } from "../data/localDirectory";

export default function Education({ lang }) {
  const ml = lang === "ml";
  return <>
    <Seo lang={lang} path="/education" title="Educational Institutions in Kannur | Kannur.io" description="Find universities, colleges and schools across Kannur district with official links and map directions." />
    <ListingDirectory lang={lang} theme="education" eyebrow={ml ? "പഠനത്തിന്റെ ഇടങ്ങൾ" : "LEARN IN KANNUR"} title={ml ? "കണ്ണൂരിലെ വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ." : "Places to learn. Places to grow."} intro={ml ? "സർവകലാശാലകൾ, കോളേജുകൾ, സ്കൂളുകൾ — ജില്ലയിലെ പ്രധാന സ്ഥാപനങ്ങൾ ഒരിടത്ത്." : "A practical guide to notable universities, colleges and schools across the district."} items={institutions} types={["University", "Professional", "College", "School"]} />
  </>;
}
