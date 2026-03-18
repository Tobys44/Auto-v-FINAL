import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "cz";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "splash.text": "Igniting Engines...",
    "vault.title": "AutoVault",
    "vault.description": "Step into the ultimate digital archive of automotive engineering. Explore the legacy of the world's most iconic brands in immersive 3D.",
    "library.heading": "POPULAR BRANDS",
    "nav.sound": "Sound",
    "card.explore": "Explore",
    "detail.startEngine": "START ENGINE",
    "detail.back": "Back to Archive",
    "detail.canvas": "3D MODEL CANVAS PLACEHOLDER",
    "detail.specs": "Specifications",
    "detail.power": "Power",
    "detail.torque": "Torque",
    "detail.engine": "Engine",
    "detail.topSpeed": "Top Speed",

    "brand.porsche.name": "Porsche",
    "brand.porsche.featuring": "Featuring: 911 Turbo S",
    "brand.mustang.name": "Ford",
    "brand.mustang.featuring": "Featuring: Mustang GT",
    "brand.gtr.name": "Nissan",
    "brand.gtr.featuring": "Featuring: GT-R Nismo",
    "brand.m4.name": "BMW",
    "brand.m4.featuring": "Featuring: M4 Competition",
    "brand.r8.name": "Audi",
    "brand.r8.featuring": "Featuring: R8 V10",

    "car.porsche.name": "Porsche 911 Turbo S",
    "car.porsche.short": "The quintessential sports car, perfected over six decades of relentless engineering.",
    "car.porsche.long": "Born in 1963, the Porsche 911 has become the benchmark for sports car excellence. The Turbo S variant represents the pinnacle of the lineage, featuring a 3.8-liter twin-turbocharged flat-six engine producing 640 horsepower. Its rear-engine layout, refined through decades of motorsport heritage, delivers a driving experience that is both visceral and surgically precise.",
    "car.porsche.power": "640 HP",
    "car.porsche.torque": "800 Nm",
    "car.porsche.engineSpec": "3.8L Twin-Turbo Flat-6",
    "car.porsche.topSpeed": "330 km/h",

    "car.mustang.name": "Ford Mustang GT",
    "car.mustang.short": "An American icon that defined the muscle car era with 480 horsepower of pure freedom.",
    "car.mustang.long": "Since 1964, the Ford Mustang has been the heartbeat of American automotive culture. The latest GT is powered by the legendary 5.0-liter Coyote V8, a naturally aspirated masterpiece producing 480 horsepower. Its aggressive stance and thunderous exhaust note make it an unmistakable presence on any road.",
    "car.mustang.power": "480 HP",
    "car.mustang.torque": "569 Nm",
    "car.mustang.engineSpec": "5.0L Coyote V8",
    "car.mustang.topSpeed": "250 km/h",

    "car.gtr.name": "Nissan GT-R Nismo",
    "car.gtr.short": "Japan's ultimate supercar killer, nicknamed 'Godzilla'. Hand-built twin-turbo V6 defies physics.",
    "car.gtr.long": "The Nissan GT-R, codenamed R35, earned its 'Godzilla' moniker by consistently humbling supercars costing twice its price. The Nismo edition features a hand-assembled 3.8-liter twin-turbocharged V6 producing 600 horsepower. Its ATTESA E-TS all-wheel-drive system and advanced aerodynamics make it a technological tour de force.",
    "car.gtr.power": "600 HP",
    "car.gtr.torque": "652 Nm",
    "car.gtr.engineSpec": "3.8L Twin-Turbo V6",
    "car.gtr.topSpeed": "315 km/h",

    "car.m4.name": "BMW M4 Competition",
    "car.m4.short": "A razor-sharp M car blending daily usability with track-ready aggression.",
    "car.m4.long": "The BMW M4 Competition embodies the latest chapter in BMW M's performance lineage. Its 3.0-liter twin-turbocharged inline-six produces 503 horsepower, delivered through a finely tuned chassis that balances brutality with precision.",
    "car.m4.power": "503 HP",
    "car.m4.torque": "650 Nm",
    "car.m4.engineSpec": "3.0L Twin-Turbo Inline-6",
    "car.m4.topSpeed": "290 km/h",

    "car.r8.name": "Audi R8 V10",
    "car.r8.short": "A naturally aspirated V10 supercar that pairs quattro confidence with supercar drama.",
    "car.r8.long": "The Audi R8 V10 pairs everyday usability with the theater of a mid-engined supercar. Its 5.2-liter naturally aspirated V10 revs past 8,000 rpm, delivering 612 horsepower with a soundtrack that defines the modern supercar era.",
    "car.r8.power": "612 HP",
    "car.r8.torque": "580 Nm",
    "car.r8.engineSpec": "5.2L Naturally Aspirated V10",
    "car.r8.topSpeed": "331 km/h",
  },
  cz: {// PŘIDAT DO LanguageContext.tsx
    "car.porsche_gt3rs.name": "Porsche 911 GT3 RS",
    "car.porsche_gt3rs.long": "Nejdokonalejší okruhová zbraň s atmosférickým motorem a aktivní aerodynamikou.",
    "car.porsche_gt3rs.power": "525 HP",
    "car.porsche_gt3rs.torque": "465 Nm",
    "car.porsche_gt3rs.engineSpec": "4.0L Flat-6",
    "car.porsche_gt3rs.topSpeed": "296 km/h",
    
    "car.bmw_m5_carbon.name": "BMW M5 Carbon Storm",
    "car.bmw_m5_carbon.long": "Speciální edice M5 s extrémním využitím karbonových vláken pro snížení váhy a brutální zrychlení.",
    "car.bmw_m5_carbon.power": "720 HP",
    "car.bmw_m5_carbon.torque": "850 Nm",
    "car.bmw_m5_carbon.engineSpec": "4.4L V8 Twin-Turbo",
    "car.bmw_m5_carbon.topSpeed": "325 km/h",
    
    "car.bmw_e30_m3.name": "BMW M3 Sport Evo (E30)",
    "car.bmw_e30_m3.long": "Legenda motorsportu z roku 1990. Vrcholná verze E30, která definovala kategorii sportovních sedanů.",
    "car.bmw_e30_m3.power": "238 HP",
    "car.bmw_e30_m3.torque": "240 Nm",
    "car.bmw_e30_m3.engineSpec": "2.5L I4 S14",
    "car.bmw_e30_m3.topSpeed": "248 km/h",
    
    "car.ferrari_laferrari.name": "Ferrari LaFerrari",
    "car.ferrari_laferrari.long": "První hybridní hyperauto z Maranella. Dokonalé spojení V12 motoru a systému KERS.",
    "car.ferrari_laferrari.power": "963 HP",
    "car.ferrari_laferrari.torque": "900 Nm",
    "car.ferrari_laferrari.engineSpec": "6.3L V12 Hybrid",
    "car.ferrari_laferrari.topSpeed": "350 km/h",
    
    "car.ferrari_sp38.name": "Ferrari SP38 Deborah",
    "car.ferrari_sp38.long": "Unikátní kousek postavený na základu 488 GTB, inspirovaný legendární F40.",
    "car.ferrari_sp38.power": "670 HP",
    "car.ferrari_sp38.torque": "760 Nm",
    "car.ferrari_sp38.engineSpec": "3.9L V8 Twin-Turbo",
    "car.ferrari_sp38.topSpeed": "330 km/h",
    
    "car.nissan_r34_ztune.name": "Nissan Skyline R34 Z-Tune",
    "car.nissan_r34_ztune.long": "Nejvzácnější Skyline na světě. Postaveno pouze 19 kusů divizí NISMO k 20. výročí.",
    "car.nissan_r34_ztune.power": "500 HP",
    "car.nissan_r34_ztune.torque": "540 Nm",
    "car.nissan_r34_ztune.engineSpec": "2.8L RB28DETT",
    "car.nissan_r34_ztune.topSpeed": "290 km/h",
    
    "car.nissan_r35_nismo.name": "Nissan GT-R R35 Nismo",
    "car.nissan_r35_nismo.long": "Godzilla ve své nejagresivnější formě. Karbonové doplňky a vylepšená turba z GT3 závodního vozu.",
    "car.nissan_r35_nismo.power": "600 HP",
    "car.nissan_r35_nismo.torque": "652 Nm",
    "car.nissan_r35_nismo.engineSpec": "3.8L V6 Twin-Turbo",
    "car.nissan_r35_nismo.topSpeed": "315 km/h",
    
    "car.toyota_supra_ridox.name": "Toyota Supra MK IV Ridox",
    "car.toyota_supra_ridox.long": "Ikonická Supra s legendárním bodykitem Ridox od Max Orido. Srdcem je nesmrtelný motor 2JZ-GTE.",
    "car.toyota_supra_ridox.power": "800 HP",
    "car.toyota_supra_ridox.torque": "920 Nm",
    "car.toyota_supra_ridox.engineSpec": "3.0L 2JZ-GTE",
    "car.toyota_supra_ridox.topSpeed": "310 km/h",
    
    "car.lambo_revuelto.name": "Lamborghini Revuelto",
    "car.lambo_revuelto.long": "Nástupce Aventadoru. Hybridní monstrum s atmosférickým V12 a třemi elektromotory.",
    "car.lambo_revuelto.power": "1015 HP",
    "car.lambo_revuelto.torque": "725 Nm",
    "car.lambo_revuelto.engineSpec": "6.5L V12 Hybrid",
    "car.lambo_revuelto.topSpeed": "350 km/h",
    
    "car.bmw_m4_csl.name": "BMW M4 CSL",
    "car.bmw_m4_csl.long": "Lehká, surová a extrémně rychlá. M4 CSL je oslavou 50 let divize M.",
    "car.bmw_m4_csl.power": "550 HP",
    "car.bmw_m4_csl.torque": "650 Nm",
    "car.bmw_m4_csl.engineSpec": "3.0L I6 Twin-Turbo",
    "car.bmw_m4_csl.topSpeed": "307 km/h",
    
    "splash.text": "Startuji motory...",
    "vault.title": "AutoVault",
    "vault.description": "Vstupte do ultimátního digitálního archivu automobilového inženýrství. Prozkoumejte odkaz nejikoniztějších značek světa v pohlcujícím 3D.",
    "library.heading": "POPULÁRNÍ ZNAČKY",
    "nav.sound": "Zvuk",
    "card.explore": "Prozkoumat",
    "detail.startEngine": "NASTARTOVAT MOTOR",
    "detail.back": "Zpět do archivu",
    "detail.canvas": "PLACEHOLDER PRO 3D MODEL",
    "detail.specs": "Specifikace",
    "detail.power": "Výkon",
    "detail.torque": "Točivý moment",
    "detail.engine": "Motor",
    "detail.topSpeed": "Max. rychlost",

    "brand.porsche.name": "Porsche",
    "brand.porsche.featuring": "Představujeme: 911 Turbo S",
    "brand.mustang.name": "Ford",
    "brand.mustang.featuring": "Představujeme: Mustang GT",
    "brand.gtr.name": "Nissan",
    "brand.gtr.featuring": "Představujeme: GT-R Nismo",
    "brand.m4.name": "BMW",
    "brand.m4.featuring": "Představujeme: M4 Competition",
    "brand.r8.name": "Audi",
    "brand.r8.featuring": "Představujeme: R8 V10",

    "car.porsche.name": "Porsche 911 Turbo S",
    "car.porsche.short": "Dokonalý sportovní vůz, zdokonalovaný šest desetiletí neúnavného inženýrství.",
    "car.porsche.long": "Porsche 911, narozené v roce 1963, se stalo měřítkem sportovní dokonalosti. Varianta Turbo S představuje vrchol této linie s 3,8litrovým dvouturbovým plochým šestiválcem o výkonu 640 koní.",
    "car.porsche.power": "640 koní",
    "car.porsche.torque": "800 Nm",
    "car.porsche.engineSpec": "3.8L Twin-Turbo Flat-6",
    "car.porsche.topSpeed": "330 km/h",

    "car.mustang.name": "Ford Mustang GT",
    "car.mustang.short": "Americká ikona, která definovala éru muscle cars s 480 koňskými silami čisté svobody.",
    "car.mustang.long": "Od roku 1964 je Ford Mustang srdcem americké automobilové kultury. Nejnovější GT pohání legendární 5.0litrový Coyote V8, atmosférické mistrovské dílo produkující 480 koní.",
    "car.mustang.power": "480 koní",
    "car.mustang.torque": "569 Nm",
    "car.mustang.engineSpec": "5.0L Coyote V8",
    "car.mustang.topSpeed": "250 km/h",

    "car.gtr.name": "Nissan GT-R Nismo",
    "car.gtr.short": "Japonský zabiják supersportů, přezdívaný ‚Godzilla'. Ručně stavěný twin-turbo V6 vzdoruje fyzice.",
    "car.gtr.long": "Nissan GT-R, kódové označení R35, si vysloužil přezdívku ‚Godzilla' tím, že soustavně pokořoval supersporty za dvojnásobnou cenu. Edice Nismo disponuje ručně sestaveným 3,8litrovým twin-turbo V6 o výkonu 600 koní.",
    "car.gtr.power": "600 koní",
    "car.gtr.torque": "652 Nm",
    "car.gtr.engineSpec": "3.8L Twin-Turbo V6",
    "car.gtr.topSpeed": "315 km/h",

    "car.m4.name": "BMW M4 Competition",
    "car.m4.short": "Rychlé M kupé, které spojuje každodenní použitelnost s ostrým závodním charakterem.",
    "car.m4.long": "BMW M4 Competition představuje nejnovější kapitolu výkonové divize BMW M. Jeho 3,0litrový twin-turbo řadový šestiválec produkuje 503 koní a díky precizně naladěnému podvozku spojuje brutalitu s přesností.",
    "car.m4.power": "503 koní",
    "car.m4.torque": "650 Nm",
    "car.m4.engineSpec": "3.0L Twin-Turbo R6",
    "car.m4.topSpeed": "290 km/h",

    "car.r8.name": "Audi R8 V10",
    "car.r8.short": "Supersport s atmosférickým V10, který spojuje quattro jistotu s dramatem motoru uprostřed.",
    "car.r8.long": "Audi R8 V10 kombinuje každodenní použitelnost s divadlem skutečného supersportu s motorem uprostřed. Jeho 5,2litrový atmosférický desetiválec se vytáčí přes 8 000 ot./min a nabízí 612 koní s nezaměnitelným zvukem.",
    "car.r8.power": "612 koní",
    "car.r8.torque": "580 Nm",
    "car.r8.engineSpec": "5.2L atmosférický V10",
    "car.r8.topSpeed": "331 km/h",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => setLanguage((prev) => (prev === "en" ? "cz" : "en"));

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
