const toModelImagePath = (name) =>
  `/images/automobiles/models/${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}.svg`;

const buildModels = (names) =>
  names.map((name) => ({
    name,
    imageUrl: toModelImagePath(name),
    sourceUrl: "",
  }));

export const vehicleModelsByBrand = {
  "maruti-suzuki-kannur": buildModels(["Swift", "Baleno", "Brezza"]),
  "tata-motors-kannur": buildModels(["Nexon", "Punch", "Harrier"]),
  "mahindra-eram-kannur": buildModels(["Scorpio N", "XUV700", "Thar"]),
  "hyundai-kannur": buildModels(["Creta", "Venue", "i20"]),
  "toyota-kannur": buildModels(["Innova Hycross", "Urban Cruiser Hyryder", "Fortuner"]),
  "kia-kannur": buildModels(["Seltos", "Sonet", "Carens"]),
  "mg-motors-kannur": buildModels(["Hector", "Astor", "Comet EV"]),
  "honda-kannur": buildModels(["City", "Elevate", "Amaze"]),
  "renault-kannur": buildModels(["Kiger", "Triber", "Kwid"]),
  "volkswagen-kannur": buildModels(["Taigun", "Virtus", "Tiguan"]),
  "skoda-kannur": buildModels(["Kushaq", "Slavia", "Kodiaq"]),
  "yamaha-kannur": buildModels(["FZ-S", "MT-15", "Fascino 125"]),
  "bajaj-kannur": buildModels(["Pulsar NS200", "Dominar 400", "Chetak"]),
  "tvs-kannur": buildModels(["Apache RTR 160", "Jupiter", "Ntorq 125"]),
  "royal-enfield-kannur": buildModels(["Classic 350", "Hunter 350", "Bullet 350"]),
  "ktm-kannur": buildModels(["Duke 250", "RC 390", "Adventure 390"]),
  "suzuki-bike-kannur": buildModels(["Access 125", "Burgman Street", "Gixxer"]),
  "triumph-kannur": buildModels(["Speed 400", "Scrambler 400 X", "Tiger Sport 660"]),
  "jawa-kannur": buildModels(["Jawa 42", "Jawa 350", "Jawa Perak"]),
  "vespa-kannur": buildModels(["Vespa VXL 125", "Vespa SXL 150", "Vespa ZX 125"]),
  "honda-bike-kannur": buildModels(["Activa 125", "Dio 125", "Hornet 2.0"]),
  "hero-honda-kannur": buildModels(["Splendor Plus", "Passion Plus", "Xpulse 200"]),
  "ola-electric-kannur": buildModels(["S1 Pro", "S1 X", "S1 Air"]),
  "ather-kannur": buildModels(["450X", "Rizta", "450S"]),
};

