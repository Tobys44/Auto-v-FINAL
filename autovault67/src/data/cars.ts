export interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  origin: string;
  featured: boolean;
  category: 'hypercar' | 'sport' | 'classic' | 'jdm' | 'other';
  logo?: string;
  translationKey: string;
}

export const cars: Car[] = [
  // --- Ferrari ---
  { id: "ferrari/2018_ferrari_sp38_deborah.glb", name: "Ferrari SP38 Deborah", brand: "Ferrari", year: 2018, origin: "Italy", featured: false, category: 'hypercar', logo: "/assets/LOGO/ferrari-brand.png", translationKey: "car.ferrari_sp38" },
  { id: "ferrari/ferrari_laferrari__element_6.glb", name: "Ferrari LaFerrari", brand: "Ferrari", year: 2015, origin: "Italy", featured: false, category: 'hypercar', logo: "/assets/LOGO/ferrari-brand.png", translationKey: "car.ferrari_laferrari" },
  { id: "ferrari/cavallo_purosangue.glb", name: "Ferrari Purosangue", brand: "Ferrari", year: 2023, origin: "Italy", featured: false, category: 'sport', logo: "/assets/LOGO/ferrari-brand.png", translationKey: "car.ferrari_purosangue" },

  // --- Audi ---
  { id: "audi/audi_a7_3.0t.glb", name: "Audi A7 3.0T", brand: "Audi", year: 2018, origin: "Germany", featured: false, category: 'sport', logo: "/assets/LOGO/audi-brand.png", translationKey: "car.audi_a7" },
  { id: "audi/2020_audi_s5_cabriolet_tfsi.glb", name: "Audi S5 Cabriolet", brand: "Audi", year: 2020, origin: "Germany", featured: false, category: 'sport', logo: "/assets/LOGO/audi-brand.png", translationKey: "car.audi_s5" },
  { id: "audi/2020_audi_rs7_sportback.glb", name: "Audi RS7 Sportback", brand: "Audi", year: 2020, origin: "Germany", featured: false, category: 'sport', logo: "/assets/LOGO/audi-brand.png", translationKey: "car.audi_rs7" },
  { id: "audi/2020_audi_rs5_coupe.glb", name: "Audi RS5 Coupe", brand: "Audi", year: 2020, origin: "Germany", featured: false, category: 'sport', logo: "/assets/LOGO/audi-brand.png", translationKey: "car.audi_rs5" },
  { id: "audi/audi_r8_v10_plus_project_cars_3.glb", name: "Audi R8 V10 Plus", brand: "Audi", year: 2020, origin: "Germany", featured: false, category: 'hypercar', logo: "/assets/LOGO/audi-brand.png", translationKey: "car.audi_r8" },

  // --- Mercedes ---
  { id: "mercedes/mercedes_-_amg_sl_63.glb", name: "Mercedes-AMG SL 63", brand: "Mercedes", year: 2022, origin: "Germany", featured: false, category: 'sport', logo: "/assets/LOGO/mercedes-brand.png", translationKey: "car.mercedes_sl63" },
  { id: "mercedes/2010_smart_fortwo.glb", name: "Smart Fortwo", brand: "Smart", year: 2010, origin: "Germany", featured: false, category: 'other', logo: "/assets/LOGO/mercedes-brand.png", translationKey: "car.smart_fortwo" },
  { id: "mercedes/2022_mercedes-benz_amg_sl63.glb", name: "Mercedes-Benz AMG SL63", brand: "Mercedes", year: 2022, origin: "Germany", featured: false, category: 'sport', logo: "/assets/LOGO/mercedes-brand.png", translationKey: "car.mercedes_sl63_2022" },
  { id: "mercedes/2019_mercedes-benz_c63_s_amg_coupe.glb", name: "Mercedes C63 S AMG Coupe", brand: "Mercedes", year: 2019, origin: "Germany", featured: false, category: 'sport', logo: "/assets/LOGO/mercedes-brand.png", translationKey: "car.mercedes_c63" },
  { id: "mercedes/2014_mercedes-benz_sls_amg_black_series.glb", name: "Mercedes SLS AMG Black Series", brand: "Mercedes", year: 2014, origin: "Germany", featured: false, category: 'sport', logo: "/assets/LOGO/mercedes-brand.png", translationKey: "car.mercedes_sls_black" },

  // --- BMW ---
  { id: "bmw/bmw_m5_e34.glb", name: "BMW M5 (E34)", brand: "BMW", year: 1990, origin: "Germany", featured: false, category: 'classic', logo: "/assets/LOGO/bmw-brand.png", translationKey: "car.bmw_m5_e34" },
  { id: "bmw/1990_bmw_m3_sport_evolution_e30.glb", name: "BMW M3 Sport Evolution (E30)", brand: "BMW", year: 1990, origin: "Germany", featured: false, category: 'classic', logo: "/assets/LOGO/bmw-brand.png", translationKey: "car.bmw_m3_e30" },
  { id: "bmw/2023_bmw_m3_g81_touring.glb", name: "BMW M3 G81 Touring", brand: "BMW", year: 2023, origin: "Germany", featured: false, category: 'sport', logo: "/assets/LOGO/bmw-brand.png", translationKey: "car.bmw_m3_touring" },
  { id: "bmw/2020_bmw_m340i_xdrive.glb", name: "BMW M340i xDrive", brand: "BMW", year: 2020, origin: "Germany", featured: false, category: 'sport', logo: "/assets/LOGO/bmw-brand.png", translationKey: "car.bmw_m340i" },

  // --- Skoda ---
  { id: "skoda/2025_skoda_octavia_rs_combi.glb", name: "Skoda Octavia RS Combi", brand: "Skoda", year: 2025, origin: "Czech Republic", featured: false, category: 'sport', logo: "/assets/LOGO/skoda-brand.png", translationKey: "car.skoda_octavia_rs" },

  // --- Porsche ---
  { id: "porsche/porsche_911_gt3.glb", name: "Porsche 911 GT3", brand: "Porsche", year: 2022, origin: "Germany", featured: false, category: 'sport', logo: "/assets/LOGO/porsche-brand.png", translationKey: "car.porsche_911_gt3" },
  { id: "porsche/2025_porsche_911_targa_4_gts.glb", name: "Porsche 911 Targa 4 GTS", brand: "Porsche", year: 2025, origin: "Germany", featured: false, category: 'sport', logo: "/assets/LOGO/porsche-brand.png", translationKey: "car.porsche_911_targa" },
  { id: "porsche/porsche_911_turbo_996_2000_by_alex.ka..glb", name: "Porsche 911 Turbo (996)", brand: "Porsche", year: 2000, origin: "Germany", featured: false, category: 'classic', logo: "/assets/LOGO/porsche-brand.png", translationKey: "car.porsche_911_996" },
  { id: "porsche/2014_porsche_cayman_s_981.glb", name: "Porsche Cayman S", brand: "Porsche", year: 2014, origin: "Germany", featured: false, category: 'sport', logo: "/assets/LOGO/porsche-brand.png", translationKey: "car.porsche_cayman_s" },

  // --- Nissan ---
  { id: "nissan/2023_nissan_gt-r_r35_nismo", name: "Nissan GT-R R35 Nismo", brand: "Nissan", year: 2023, origin: "Japan", featured: false, category: 'jdm', logo: "/assets/LOGO/nissan-brand.png", translationKey: "car.nissan_r35_nismo" },
  { id: "nissan/1989_nissan_skyline_gt-r_r32.glb", name: "Nissan Skyline GT-R R32", brand: "Nissan", year: 1989, origin: "Japan", featured: false, category: 'jdm', logo: "/assets/LOGO/nissan-brand.png", translationKey: "car.nissan_r32" },
  { id: "nissan/2020_nissan_370z_sport_touring.glb", name: "Nissan 370Z Sport Touring", brand: "Nissan", year: 2020, origin: "Japan", featured: false, category: 'sport', logo: "/assets/LOGO/nissan-brand.png", translationKey: "car.nissan_370z" },
  { id: "nissan/2013_nissan_gt-r_black_edition_coupe.glb", name: "Nissan GT-R Black Edition", brand: "Nissan", year: 2013, origin: "Japan", featured: false, category: 'sport', logo: "/assets/LOGO/nissan-brand.png", translationKey: "car.nissan_r35_black" },
  { id: "nissan/2018_nissan_gt-r_nismo.glb", name: "Nissan GT-R Nismo", brand: "Nissan", year: 2018, origin: "Japan", featured: false, category: 'jdm', logo: "/assets/LOGO/nissan-brand.png", translationKey: "car.nissan_r35_nismo" },

  // --- Hyundai ---
  { id: "hyundai/2025_hyundai_tucson_plug-in_hybrid.glb", name: "Hyundai Tucson PHEV", brand: "Hyundai", year: 2025, origin: "South Korea", featured: false, category: 'other', logo: "/assets/LOGO/hyundai-brand.png", translationKey: "car.hyundai_tucson" },
  { id: "hyundai/2023_hyundai_mufasa.glb", name: "Hyundai Mufasa", brand: "Hyundai", year: 2023, origin: "South Korea", featured: false, category: 'other', logo: "/assets/LOGO/hyundai-brand.png", translationKey: "car.hyundai_mufasa" },

  // --- McLaren ---
  { id: "mclaren/2025_mclaren_artura_spider.glb", name: "McLaren Artura Spider", brand: "McLaren", year: 2025, origin: "UK", featured: false, category: 'hypercar', logo: "/assets/LOGO/mclaren-brand.png", translationKey: "car.mclaren_artura" },
  { id: "mclaren/mclaren_600lt.glb", name: "McLaren 600LT", brand: "McLaren", year: 2018, origin: "UK", featured: false, category: 'hypercar', logo: "/assets/LOGO/mclaren-brand.png", translationKey: "car.mclaren_600lt" },
  { id: "mclaren/2020_mclaren_gt.glb", name: "McLaren GT", brand: "McLaren", year: 2020, origin: "UK", featured: false, category: 'sport', logo: "/assets/LOGO/mclaren-brand.png", translationKey: "car.mclaren_gt" },
  { id: "mclaren/2017_mclaren_720s.glb", name: "McLaren 720S", brand: "McLaren", year: 2017, origin: "UK", featured: false, category: 'hypercar', logo: "/assets/LOGO/mclaren-brand.png", translationKey: "car.mclaren_720s" },

  // --- Dodge ---
  { id: "dodge/1970_dodge_challenger_rt.glb", name: "Dodge Challenger R/T", brand: "Dodge", year: 1970, origin: "USA", featured: false, category: 'classic', logo: "/assets/LOGO/dodge-brand.png", translationKey: "car.dodge_70" },

  // --- Misc ---
  { id: "mics/jiotto_caspita_f1_road_car_1989_by_alex.ka..glb", name: "Jiotto Caspita F1", brand: "Jiotto", year: 1989, origin: "Japan", featured: false, category: 'hypercar', logo: "", translationKey: "car.jiotto_caspita" },
  { id: "mics/pixar_cars_series_lightning_mcqueen.glb", name: "Lightning McQueen", brand: "Pixar", year: 2006, origin: "USA", featured: false, category: 'other', logo: "", translationKey: "car.mcqueen" },

  // --- Mazda ---
  { id: "mazda/garage_vary_mazda_mazdaspeed_3_bodykit.glb", name: "Mazdaspeed 3 Bodykit", brand: "Mazda", year: 2010, origin: "Japan", featured: false, category: 'jdm', logo: "/assets/LOGO/mazda-brand.png", translationKey: "car.mazda_3_gv" },

  // --- Chevrolet ---
  { id: "chevrolet/2015_chevrolet_camaro_z28.glb", name: "Chevrolet Camaro Z28", brand: "Chevrolet", year: 2015, origin: "USA", featured: false, category: 'sport', logo: "/assets/LOGO/chevrolet-brand.png", translationKey: "car.chevy_camaro_z28" },
  { id: "chevrolet/2010_chevrolet_camaro_ss.glb", name: "Chevrolet Camaro SS", brand: "Chevrolet", year: 2010, origin: "USA", featured: false, category: 'sport', logo: "/assets/LOGO/chevrolet-brand.png", translationKey: "car.chevy_camaro_ss" },

  // --- Alfa Romeo & Abarth ---
  { id: "alfa_romeo/2008_alfa_romeo_8c_competizione.glb", name: "Alfa Romeo 8C", brand: "Alfa Romeo", year: 2008, origin: "Italy", featured: false, category: 'sport', logo: "/assets/LOGO/alfaromeo-brand.png", translationKey: "car.alfa_8c" },
  { id: "abarth/2014_abarth_500.glb", name: "Abarth 500", brand: "Abarth", year: 2014, origin: "Italy", featured: false, category: 'sport', logo: "/assets/LOGO/abarth-brand.png", translationKey: "car.abarth_500" },

  // --- Marussia ---
  { id: "marussia/2010_marussia_b2.glb", name: "Marussia B2", brand: "Marussia", year: 2010, origin: "Russia", featured: false, category: 'hypercar', logo: "/assets/LOGO/marussia-brand.png", translationKey: "car.marussia_b2" },

  // --- Toyota ---
  { id: "toyota/2014_toyota_gt86_zn6.glb", name: "Toyota GT86 ZN6", brand: "Toyota", year: 2014, origin: "Japan", featured: false, category: 'sport', logo: "/assets/LOGO/toyota-brand.png", translationKey: "car.toyota_gt86" },

  // --- Bentley ---
  { id: "bentley/2013_bentley_continental_gt_speed.glb", name: "Bentley Continental GT", brand: "Bentley", year: 2013, origin: "UK", featured: false, category: 'sport', logo: "/assets/LOGO/bentley-brand.png", translationKey: "car.bentley_continental" },

  // --- Bugatti ---
  { id: "bugatti/2021_bugatti_bolide.glb", name: "Bugatti Bolide", brand: "Bugatti", year: 2021, origin: "France", featured: false, category: 'hypercar', logo: "/assets/LOGO/bugatti-brand.png", translationKey: "car.bugatti_bolide" }
];