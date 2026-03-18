import { motion, animate, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { cars } from "@/data/cars";
import BrandCard from "./BrandCard";
import CarViewer from "./CarViewer";
import { useEffect, useRef, useState, useMemo } from "react";
// PŘIDÁNY NOVÉ IKONY ZDE:
import { Search, X, Globe2, ArrowRight } from "lucide-react"; 

interface GalleryViewProps {
  onSelectCar: (carId: string) => void;
  initialScroll?: number; 
  onOpenMap?: () => void; // NOVÁ PROP PRO LÁKADLO
}

const GalleryView = ({ onSelectCar, initialScroll = 0, onOpenMap }: GalleryViewProps) => {
  const { language } = useLanguage();
  const isAnimating = useRef(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<"hero" | "picks" | "database">("hero");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const topPicks = cars.filter((car) => car.featured);
  const categories = ["all", "hypercar", "sport", "classic", "jdm", "other"];

  const filteredArchive = cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || car.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Vypnuto randomizování - vždy se načte první auto z databáze (např. Porsche)
  const heroCar = cars.find(car => car.id === "nissan/2023_nissan_gt-r_r35_nismo") || cars[0];

  useEffect(() => {
    if (initialScroll > 0) {
      const timer = setTimeout(() => {
        window.scrollTo(0, initialScroll);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [initialScroll]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      const topPicksTop = document.getElementById("top-picks-section")?.offsetTop || 0;
      const databaseTop = document.getElementById("database-section")?.offsetTop || 0;

      if (scrollY < topPicksTop - 200) {
        setActiveSection("hero");
      } else if (scrollY >= topPicksTop - 200 && scrollY < databaseTop - 300) {
        setActiveSection("picks");
      } else {
        setActiveSection("database");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScrollTo = (targetY: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    animate(window.scrollY, targetY, {
      duration: 1, 
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (val) => window.scrollTo(0, val),
      onComplete: () => {
        setTimeout(() => { isAnimating.current = false; }, 200);
      }
    });
  };

  const goToHero = () => smoothScrollTo(0);
  const goToTopPicks = () => {
    const section = document.getElementById("top-picks-section");
    if (section) smoothScrollTo(section.offsetTop); 
  };
  const goToDatabase = () => {
    const section = document.getElementById("database-section");
    if (section) smoothScrollTo(section.offsetTop); 
  };

  useEffect(() => {
    (window as any).scrollToArchive = goToDatabase;
    return () => {
      delete (window as any).scrollToArchive;
    }
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      const topPicksTop = document.getElementById("top-picks-section")?.offsetTop || 0;
      const databaseTop = document.getElementById("database-section")?.offsetTop || 0;
      const scrollY = Math.round(window.scrollY);

      if (e.deltaY > 30) { 
        if (scrollY < 50) {
          e.preventDefault();
          goToTopPicks();
        } else if (scrollY >= topPicksTop - 10 && scrollY < databaseTop - 10) {
          e.preventDefault();
          goToDatabase();
        }
      } else if (e.deltaY < -30) {
        if (scrollY >= databaseTop - 10) {
          e.preventDefault();
          goToTopPicks();
        } else if (scrollY >= topPicksTop - 10 && scrollY <= topPicksTop + 10) {
          e.preventDefault();
          goToHero();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden relative">
      
      <div 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${
          activeSection === "database" ? "opacity-0 translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"
        }`}
      >
        <button 
          onClick={activeSection === "hero" ? goToTopPicks : goToDatabase} 
          className="group flex flex-col items-center gap-2.5 text-neutral-500 hover:text-white transition-all bg-[#050505]/50 backdrop-blur-sm p-3 rounded-2xl"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-white drop-shadow-md">
            {activeSection === "hero" ? (language === 'en' ? "Top Picks" : "Výběr") : (language === 'en' ? "Database" : "Databáze")}
          </span>
          <div className="w-[26px] h-[42px] border-2 border-white/20 rounded-full flex justify-center p-1 group-hover:border-[#0A84FF]/50 transition-colors bg-black/20">
            <motion.div 
              animate={{ y: [0, 15, 0], opacity: [1, 0.5, 1] }} 
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-[#0A84FF] rounded-full mt-1 shadow-[0_0_8px_#0A84FF]" 
            />
          </div>
        </button>
      </div>

      <section className="h-screen w-full relative flex flex-col justify-center overflow-hidden shrink-0">
        <div className="absolute inset-0 z-0 opacity-80">
          <CarViewer modelPath={`/models/${heroCar?.id}.glb`} />
        </div>

        <div className="container mx-auto px-6 relative z-20 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-3xl relative"
          >
            <h1 className="text-[10px] tracking-[0.8em] uppercase text-neutral-400 font-bold mb-4 drop-shadow-md">
              Premium 3D Showroom
            </h1>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none select-none flex items-center gap-2 md:gap-4 drop-shadow-2xl whitespace-nowrap">
              <span className="text-white">AUTO</span>
              <span className="text-transparent [-webkit-text-stroke:2px_#0A84FF]">VAULT</span>
            </h2>
            <p className="max-w-md text-neutral-300 text-sm md:text-base leading-relaxed font-medium mb-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {language === 'en' 
                ? 'Step into the ultimate digital archive of automotive engineering. Explore the legacy of iconic brands in immersive 3D.' 
                : 'Vstup do ultimátního digitálního archivu automobilového inženýrství. Prozkoumej odkaz ikonických značek v pohlcujícím 3D.'}
            </p>

            {/* NOVÉ LÁKADLO NA MAPU - pointer-events-auto, aby šlo kliknout */}
            {onOpenMap && (
              <div className="pointer-events-auto inline-block mt-4">
                <button 
                  onClick={onOpenMap}
                  className="group relative flex items-center gap-4 px-8 py-4 bg-[#111112]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#0A84FF]/60 hover:shadow-[0_0_50px_rgba(10,132,255,0.25)] hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A84FF]/0 via-[#0A84FF]/10 to-[#0A84FF]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  <div className="w-10 h-10 rounded-full bg-[#0A84FF]/10 flex items-center justify-center border border-[#0A84FF]/30 group-hover:bg-[#0A84FF] transition-colors duration-500">
                    <Globe2 className="w-5 h-5 text-[#0A84FF] group-hover:text-white transition-colors duration-500" />
                  </div>
                  
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/50 group-hover:text-white/80 transition-colors">
                      {language === 'en' ? 'New Feature' : 'Nová funkce'}
                    </span>
                    <span className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                      {language === 'en' ? 'Explore Global Map' : 'Prozkoumat 3D Mapu'}
                      <ArrowRight className="w-4 h-4 text-[#0A84FF] group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                  </div>
                </button>
              </div>
            )}
            
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A0A0B] to-transparent z-20 pointer-events-none" />
      </section>

      {/* Další kód pro sekce Top Picks a Database (je stejný jako dřív) */}
      <section id="top-picks-section" className="h-screen w-full relative z-30 bg-[#0A0A0B] flex flex-col justify-center border-t border-white/5 overflow-hidden pb-8 pt-20">
        <div className="container mx-auto px-6 relative flex flex-col items-center justify-center flex-1">
          <div className="mb-4">
            <h4 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic text-center">
              {language === 'en' ? 'Top Picks' : 'Výběr Redakce'}
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 max-w-6xl mx-auto w-full">
            {topPicks.slice(0, 3).map((car, index) => (
              <div key={car.id} className={`${index === 0 ? 'md:col-span-4' : 'md:col-span-2'}`}>
                <div className="scale-95 origin-center">
                  <BrandCard car={car} index={index} onSelect={onSelectCar} isLarge={index === 0} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="database-section" className="min-h-screen w-full relative z-30 bg-[#050505] pt-20 pb-32 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <h3 className="text-[10px] tracking-[0.5em] text-neutral-600 uppercase font-bold mb-4">Showroom Database</h3>
              <h4 className="text-4xl font-bold text-white tracking-tight italic">
                {language === 'en' ? 'The Archive' : 'Archiv'}
              </h4>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
              <div className="relative group flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-[#0A84FF] transition-colors" />
                <input 
                  type="text"
                  placeholder={language === 'en' ? "Search by model..." : "Hledat podle modelu..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#111112] border border-white/5 rounded-full py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#0A84FF]/50 w-full transition-all"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                    <X className="w-4 h-4 text-neutral-500 hover:text-white" />
                  </button>
                )}
              </div>

              <div className="flex bg-[#111112] p-1 rounded-full border border-white/5 overflow-x-auto no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      selectedCategory === cat 
                      ? "bg-[#0A84FF] text-white shadow-[0_0_20px_rgba(10,132,255,0.3)]" 
                      : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    {cat === 'all' ? (language === 'en' ? 'All' : 'Vše') : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredArchive.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredArchive.map((car, index) => (
                  <motion.div
                    key={car.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <BrandCard car={car} index={index} onSelect={onSelectCar} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[3rem]">
                <p className="text-neutral-500 italic">
                  {language === 'en' ? 'No vehicles found in the archive...' : 'V archivu nebyl nalezen žádný vůz...'}
                </p>
                <button onClick={() => {setSearchQuery(""); setSelectedCategory("all");}} className="mt-4 text-[#0A84FF] text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
                  {language === 'en' ? 'Reset Filters' : 'Resetovat Filtry'}
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default GalleryView;