const model = (name, imageUrl = "", sourceUrl = "") => ({
  name,
  imageUrl: imageUrl || null,
  sourceUrl,
});

export const vehicleModelsByBrand = {
  "maruti-suzuki-kannur": [
    model(
      "Swift",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Maruti%20Suzuki%20Swift%204456.JPG",
      "https://commons.wikimedia.org/wiki/File:Maruti_Suzuki_Swift_4456.JPG"
    ),
    model(
      "Baleno",
      "https://commons.wikimedia.org/wiki/Special:FilePath/2022%20Maruti%20Suzuki%20Baleno%20Alpha%20(India)%20front%20view.jpg",
      "https://commons.wikimedia.org/wiki/File:2022_Maruti_Suzuki_Baleno_Alpha_(India)_front_view.jpg"
    ),
    model(
      "Brezza",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Maruti%20Suzuki%20Brezza.jpg",
      "https://commons.wikimedia.org/wiki/File:Maruti_Suzuki_Brezza.jpg"
    ),
  ],
  "tata-motors-kannur": [
    model(
      "Nexon",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tata_Nexon_Blue_Dual_Tone.jpg/330px-Tata_Nexon_Blue_Dual_Tone.jpg",
      "https://en.wikipedia.org/wiki/Tata_Nexon"
    ),
    model(
      "Punch",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/2021_Tata_Punch_Creative_%28India%29_front_view_01.png/330px-2021_Tata_Punch_Creative_%28India%29_front_view_01.png",
      "https://en.wikipedia.org/wiki/Tata_Punch"
    ),
    model(
      "Harrier",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Tata_Buzzard_Sport%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0651%29.jpg/330px-Tata_Buzzard_Sport%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0651%29.jpg",
      "https://en.wikipedia.org/wiki/Tata_Harrier"
    ),
  ],
  "mahindra-eram-kannur": [
    model(
      "Scorpio N",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/2024_Mahindra_Scorpio_Z8L_front.jpg/330px-2024_Mahindra_Scorpio_Z8L_front.jpg",
      "https://en.wikipedia.org/wiki/Mahindra_Scorpio-N"
    ),
    model(
      "XUV700",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/2021_Mahindra_XUV700_2.2_AX7_%28India%29_front_view.png/330px-2021_Mahindra_XUV700_2.2_AX7_%28India%29_front_view.png",
      "https://en.wikipedia.org/wiki/Mahindra_XUV700"
    ),
    model(
      "Thar",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_02_%28cropped%29.jpg/330px-Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_02_%28cropped%29.jpg",
      "https://en.wikipedia.org/wiki/Mahindra_Thar"
    ),
  ],
  "hyundai-kannur": [
    model(
      "Creta",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/2022_Hyundai_Creta_1.6_Plus_%28Chile%29_front_view.jpg/330px-2022_Hyundai_Creta_1.6_Plus_%28Chile%29_front_view.jpg",
      "https://en.wikipedia.org/wiki/Hyundai_Creta"
    ),
    model(
      "Venue",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/2022_Hyundai_Venue_Preferred_in_Polar_White%2C_Front_Right%2C_09-12-2023.jpg/330px-2022_Hyundai_Venue_Preferred_in_Polar_White%2C_Front_Right%2C_09-12-2023.jpg",
      "https://en.wikipedia.org/wiki/Hyundai_Venue"
    ),
    model(
      "i20",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Hyundai_i20_%28III%2C_Facelift%29_%E2%80%93_f_11102025.jpg/330px-Hyundai_i20_%28III%2C_Facelift%29_%E2%80%93_f_11102025.jpg",
      "https://en.wikipedia.org/wiki/Hyundai_i20"
    ),
  ],
  "toyota-kannur": [
    model("Innova Hycross"),
    model("Urban Cruiser Hyryder", "/images/automobiles/models/toyota-hyryder.webp", "https://commons.wikimedia.org/wiki/File:Toyota_Urban_Cruiser_Hyryder,_Goa,_India.jpg"),
    model(
      "Fortuner",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/2015_Toyota_Fortuner_%28New_Zealand%29.jpg/330px-2015_Toyota_Fortuner_%28New_Zealand%29.jpg",
      "https://en.wikipedia.org/wiki/Toyota_Fortuner"
    ),
  ],
  "kia-kannur": [
    model(
      "Seltos",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Kia_Seltos_SP2_PE_Snow_White_Pearl_%2817%29_%28cropped%29.jpg/330px-Kia_Seltos_SP2_PE_Snow_White_Pearl_%2817%29_%28cropped%29.jpg",
      "https://en.wikipedia.org/wiki/Kia_Seltos"
    ),
    model(
      "Sonet",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/2021_Kia_Sonet_1.5_Premiere_%28Indonesia%29_front_view_02.jpg/330px-2021_Kia_Sonet_1.5_Premiere_%28Indonesia%29_front_view_02.jpg",
      "https://en.wikipedia.org/wiki/Kia_Sonet"
    ),
    model("Carens", "/images/automobiles/models/kia-carens.webp", "https://commons.wikimedia.org/wiki/File:2022_Kia_Carens_1.4_(India)_front_view_01.jpg"),
  ],
  "mg-motors-kannur": [
    model("Hector"),
    model("Astor"),
    model("Comet EV"),
  ],
  "honda-kannur": [
    model(
      "City",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/2022_Honda_City_ZX_i-VTEC_%28India%29_front_view_%28cropped%29.jpg/330px-2022_Honda_City_ZX_i-VTEC_%28India%29_front_view_%28cropped%29.jpg",
      "https://en.wikipedia.org/wiki/Honda_City"
    ),
    model("Elevate", "/images/automobiles/models/honda-elevate.webp", "https://www.hondacarindia.com/honda-elevate"),
    model(
      "Amaze",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Honda_Amaze_front_view_%28cropped%29.jpg/330px-Honda_Amaze_front_view_%28cropped%29.jpg",
      "https://en.wikipedia.org/wiki/Honda_Amaze"
    ),
  ],
  "renault-kannur": [
    model(
      "Kiger",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Renault_Kiger_front_20230602.jpg/330px-Renault_Kiger_front_20230602.jpg",
      "https://en.wikipedia.org/wiki/Renault_Kiger"
    ),
    model(
      "Triber",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/2021_Renault_Triber_RXZ_%28Indonesia%29_front_view.jpg/330px-2021_Renault_Triber_RXZ_%28Indonesia%29_front_view.jpg",
      "https://en.wikipedia.org/wiki/Renault_Triber"
    ),
    model(
      "Kwid",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/2023_Renault_Kwid_Iconic_%28Colombia%29_front_view_01.png/330px-2023_Renault_Kwid_Iconic_%28Colombia%29_front_view_01.png",
      "https://en.wikipedia.org/wiki/Renault_Kwid"
    ),
  ],
  "volkswagen-kannur": [
    model(
      "Taigun",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Volkswagen_Taigun_front_20230528.jpg/330px-Volkswagen_Taigun_front_20230528.jpg",
      "https://en.wikipedia.org/wiki/Volkswagen_Taigun"
    ),
    model(
      "Virtus",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/2022_Volkswagen_Virtus_1.5_GT_%28India%29_front_view_02.png/330px-2022_Volkswagen_Virtus_1.5_GT_%28India%29_front_view_02.png",
      "https://en.wikipedia.org/wiki/Volkswagen_Virtus"
    ),
    model(
      "Tiguan",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/VW_Tiguan_1.5_eTSI_R-Line_%28III%29_%E2%80%93_f_18052025.jpg/330px-VW_Tiguan_1.5_eTSI_R-Line_%28III%29_%E2%80%93_f_18052025.jpg",
      "https://en.wikipedia.org/wiki/Volkswagen_Tiguan"
    ),
  ],
  "skoda-kannur": [
    model(
      "Kushaq",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/2021_%C5%A0koda_Kushaq_%28India%29_front_view.png/330px-2021_%C5%A0koda_Kushaq_%28India%29_front_view.png",
      "https://en.wikipedia.org/wiki/%C5%A0koda_Kushaq"
    ),
    model(
      "Slavia",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/2021_%C5%A0koda_Slavia_1.5_TSI_Style_%28India%29_front_view.png/330px-2021_%C5%A0koda_Slavia_1.5_TSI_Style_%28India%29_front_view.png",
      "https://en.wikipedia.org/wiki/%C5%A0koda_Slavia"
    ),
    model(
      "Kodiaq",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Skoda_Kodiaq_Facelift_IMG_6636.jpg/330px-Skoda_Kodiaq_Facelift_IMG_6636.jpg",
      "https://en.wikipedia.org/wiki/%C5%A0koda_Kodiaq"
    ),
  ],
  "yamaha-kannur": [
    model(
      "FZ-S",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Yamaha_FZ16.jpg/330px-Yamaha_FZ16.jpg",
      "https://en.wikipedia.org/wiki/Yamaha_FZ16"
    ),
    model(
      "MT-15",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/2018_Yamaha_MT-15.jpg/330px-2018_Yamaha_MT-15.jpg",
      "https://en.wikipedia.org/wiki/Yamaha_MT-15"
    ),
    model(
      "Fascino 125",
      "https://upload.wikimedia.org/wikipedia/commons/6/67/Yamaha_fascino_%E0%AE%AF%E0%AE%AE%E0%AE%95%E0%AE%BE_%E0%AE%AA%E0%AF%87%E0%AE%9A%E0%AE%BF%E0%AE%A9%E0%AF%8B_%E0%AE%B5%E0%AE%BE%E0%AE%95%E0%AE%A9%E0%AE%AE%E0%AF%8D.jpg",
      "https://commons.wikimedia.org/wiki/File:Yamaha_fascino_%E0%AE%AF%E0%AE%AE%E0%AE%95%E0%AE%BE_%E0%AE%AA%E0%AF%87%E0%AE%9A%E0%AE%BF%E0%AE%A9%E0%AF%8B_%E0%AE%B5%E0%AE%BE%E0%AE%95%E0%AE%A9%E0%AE%AE%E0%AF%8D.jpg"
    ),
  ],
  "bajaj-kannur": [
    model(
      "Pulsar NS200",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Bajaj_Pulsar_200_NS.jpg/330px-Bajaj_Pulsar_200_NS.jpg",
      "https://en.wikipedia.org/wiki/Bajaj_Pulsar_NS200"
    ),
    model(
      "Dominar 400",
      "https://upload.wikimedia.org/wikipedia/commons/4/41/Dominar_400.jpg",
      "https://commons.wikimedia.org/wiki/File:Dominar_400.jpg"
    ),
    model("Chetak", "/images/automobiles/models/bajaj-chetak.webp", "https://commons.wikimedia.org/wiki/File:Bajaj_Chetak_electric_scooters_(2026)_01.jpg"),
  ],
  "tvs-kannur": [
    model(
      "Apache RTR 160",
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/TVS_Apache_RTR_160_4V.jpg",
      "https://commons.wikimedia.org/wiki/File:TVS_Apache_RTR_160_4V.jpg"
    ),
    model(
      "Jupiter",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/TVS_Jupiter.jpg/330px-TVS_Jupiter.jpg",
      "https://en.wikipedia.org/wiki/TVS_Jupiter"
    ),
    model(
      "Ntorq 125",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/TVS_Ntorq_125_Race_XP.jpg/330px-TVS_Ntorq_125_Race_XP.jpg",
      "https://en.wikipedia.org/wiki/TVS_Ntorq_125"
    ),
  ],
  "royal-enfield-kannur": [
    model(
      "Classic 350",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Royal_Enfield_Classic_350_%282017_Model_Year%29.jpg/330px-Royal_Enfield_Classic_350_%282017_Model_Year%29.jpg",
      "https://en.wikipedia.org/wiki/Royal_Enfield_Classic"
    ),
    model(
      "Hunter 350",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Hunter_350_side_view_India_Model.png/330px-Hunter_350_side_view_India_Model.png",
      "https://en.wikipedia.org/wiki/Royal_Enfield_Hunter_350"
    ),
    model(
      "Bullet 350",
      "https://upload.wikimedia.org/wikipedia/commons/7/72/Royal_Enfield-_Bullet_350.jpg",
      "https://commons.wikimedia.org/wiki/File:Royal_Enfield-_Bullet_350.jpg"
    ),
  ],
  "ktm-kannur": [
    model("Duke 250", "/images/automobiles/models/ktm-250-duke.webp", "https://www.ktmindia.com/ktm-bikes/naked-bike/ktm-250-duke"),
    model("RC 390", "/images/automobiles/models/ktm-rc-390.webp", "https://www.ktmindia.com/ktm-bikes/supersport/ktm-rc-390"),
    model("Adventure 390", "/images/automobiles/models/ktm-390-adventure.webp", "https://www.ktmindia.com/ktm-bikes/travel/ktm-390-adventure"),
  ],
  "suzuki-bike-kannur": [
    model("Access 125", "/images/automobiles/models/suzuki-access-125.webp", "https://commons.wikimedia.org/wiki/File:Suzuki_Access_125,_2023.jpg"),
    model("Burgman Street"),
    model(
      "Gixxer",
      "https://upload.wikimedia.org/wikipedia/commons/3/33/Suzuki_Gixxer_negra.jpg",
      "https://commons.wikimedia.org/wiki/File:Suzuki_Gixxer_negra.jpg"
    ),
  ],
  "triumph-kannur": [
    model("Speed 400", "/images/automobiles/models/triumph-speed-400.webp", "https://commons.wikimedia.org/wiki/File:Triumph_Speed_400.jpg"),
    model(
      "Scrambler 400 X",
      "https://upload.wikimedia.org/wikipedia/commons/f/f3/Triumph_Scrambler_400_X%2C_M-M25.jpg",
      "https://commons.wikimedia.org/wiki/File:Triumph_Scrambler_400_X,_M-M25.jpg"
    ),
    model(
      "Tiger Sport 660",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Tiger_sport_660_22.jpg/330px-Tiger_sport_660_22.jpg",
      "https://en.wikipedia.org/wiki/Triumph_Tiger_Sport_660"
    ),
  ],
  "jawa-kannur": [
    model("Jawa 42"),
    model("Jawa 350"),
    model("Jawa Perak"),
  ],
  "yezdi-kannur": [
    model("Yezdi Adventure", "/images/automobiles/models/yezdi-adventure.webp", "https://dealer.jawayezdimotorcycles.com/location/kerala/kannur/"),
    model("Yezdi Roadster", "/images/automobiles/models/yezdi-roadster.webp", "https://dealer.jawayezdimotorcycles.com/location/kerala/kannur/"),
  ],
  "aprilia-kannur": [
    model("SXR 160", "/images/automobiles/models/aprilia-sxr-160.webp", "https://press.piaggiogroup.com/it_IT/post/show/205348/piaggio-group-aprilia-sxr-160-.html"),
  ],
  "bsa-kannur": [
    model("Gold Star 650", "/images/automobiles/models/bsa-gold-star.webp", "https://dealer.jawayezdimotorcycles.com/locator/kannur/thana/hmss-motors--2R04EZ/products/bsa-gold-star-650--a30beb0e-01a0-4726-b26b-3b10789924bf"),
  ],
  "river-kannur": [
    model("Indie", "/images/automobiles/models/river-indie.webp", "https://www.rideriver.com/indie"),
  ],
  "vespa-kannur": [
    model("Vespa VXL 125"),
    model("Vespa SXL 150"),
    model("Vespa ZX 125"),
  ],
  "honda-bike-kannur": [
    model(
      "Activa 125",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Gold_Metallic_Honda_Activa.jpg/330px-Gold_Metallic_Honda_Activa.jpg",
      "https://en.wikipedia.org/wiki/Honda_Activa"
    ),
    model("Dio 125"),
    model(
      "Hornet 2.0",
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Honda_Hornet_2.0_Repsol_Edition.jpg",
      "https://commons.wikimedia.org/wiki/File:Honda_Hornet_2.0_Repsol_Edition.jpg"
    ),
  ],
  "hero-honda-kannur": [
    model(
      "Splendor Plus",
      "https://upload.wikimedia.org/wikipedia/commons/a/a0/Hero_Splendor_Plus_i3s_and_IBS_2018.jpg",
      "https://commons.wikimedia.org/wiki/File:Hero_Splendor_Plus_i3s_and_IBS_2018.jpg"
    ),
    model("Passion Plus"),
    model(
      "Xpulse 200",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Modified_Xpulse_200V.jpg/330px-Modified_Xpulse_200V.jpg",
      "https://en.wikipedia.org/wiki/Hero_XPulse_200"
    ),
  ],
  "ola-electric-kannur": [
    model(
      "S1 Pro",
      "https://upload.wikimedia.org/wikipedia/commons/7/76/Ola_S1_Pro.jpg",
      "https://commons.wikimedia.org/wiki/File:Ola_S1_Pro.jpg"
    ),
    model(
      "S1 X",
      "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ola_electric_scooter.jpg",
      "https://commons.wikimedia.org/wiki/File:Ola_electric_scooter.jpg"
    ),
    model(
      "S1 Air",
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/Ola_Scooter_on_road.jpg",
      "https://commons.wikimedia.org/wiki/File:Ola_Scooter_on_road.jpg"
    ),
  ],
  "ather-kannur": [
    model("450X"),
    model("Rizta"),
    model("450S"),
  ],
};
