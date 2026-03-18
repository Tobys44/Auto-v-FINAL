import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, X, ArrowRight, Settings2, Calendar, Globe2 } from "lucide-react";
import { cars } from "@/data/cars";

interface NavbarProps {
  onSelectCar?: (id: string) => void;
  currentView?: "gallery" | "globe"; 
  onToggleView?: () => void; 
}

const getCountryCode = (origin: string) => {
  const map: Record<string, string> = {
    "Germany": "DE", "Německo": "DE", "Italy": "IT", "Itálie": "IT",
    "UK": "GB", "United Kingdom": "GB", "Velká Británie": "GB",
    "USA": "US", "Spojené státy": "US", "France": "FR", "Francie": "FR",
    "Japan": "JP", "Japonsko": "JP", "Sweden": "SE", "Švédsko": "SE",
  };
  return map[origin] || origin.substring(0, 2).toUpperCase();
};

const Navbar = ({ onSelectCar, currentView, onToggleView }: NavbarProps) => {
  const { language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchCategories, setSearchCategories] = useState(false);
  const [searchOrigin, setSearchOrigin] = useState(true);

  const allYears = cars.map(c => c.year);
  const absoluteMinYear = Math.min(...allYears);
  const absoluteMaxYear = Math.max(...allYears);

  const [minYear, setMinYear] = useState(absoluteMinYear);
  const [maxYear, setMaxYear] = useState(absoluteMaxYear);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      setSearchQuery("");
      setIsSettingsOpen(false);
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) setIsSearchOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const handleContactClick = () => {
    const section = document.getElementById("contact");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const goToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleArchiveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentView === "globe" && onToggleView) {
        onToggleView(); 
    }
    
    setTimeout(() => {
        if ((window as any).scrollToArchive) {
          (window as any).scrollToArchive();
        } else {
          const section = document.getElementById("database-section");
          if (section) window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
        }
    }, 100);
  };

  const filteredCars = useMemo(() => {
    if (!searchQuery && !isSettingsOpen) return []; 
    
    return cars.filter(c => {
        const q = searchQuery.toLowerCase();
        const matchId = c.id.toLowerCase().includes(q);
        const matchName = c.name.toLowerCase().includes(q);
        const matchOrigin = searchOrigin ? c.origin.toLowerCase().includes(q) : false;
        const matchCategory = searchCategories ? c.category.toLowerCase().includes(q) : false;
        
        const matchYear = c.year >= minYear && c.year <= maxYear;
        const matchesText = !searchQuery || (matchId || matchName || matchOrigin || matchCategory);
        
        return matchesText && matchYear;
    });
  }, [searchQuery, searchOrigin, searchCategories, minYear, maxYear, isSettingsOpen]);

  return (
    <>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(30px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4 md:p-6"
          >
            {/* SEARCH MODAL CODE REMAINS THE SAME AS PROVIDED */}
            <motion.div 
              initial={{ scale: 0.96, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 10, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-lg bg-[#111112]/95 backdrop-blur-xl border border-white/10 p-5 rounded-[2rem] relative shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col will-change-transform"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 relative z-20">
                <Search className="w-5 h-5 text-white/40 flex-shrink-0" />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'en' ? "Search AutoVault..." : "Hledat ve Vaultu..."}
                  className="w-full bg-transparent text-white text-xl md:text-2xl font-bold tracking-tight outline-none placeholder:text-white/20"
                />
                
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-white/40 hover:text-white transition-colors p-1 flex-shrink-0">
                    <X className="w-5 h-5" />
                  </button>
                )}

                <button 
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)} 
                  className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
                    isSettingsOpen ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Settings2 className="w-5 h-5" />
                </button>

                <div className="w-px h-5 bg-white/10 mx-1 flex-shrink-0"></div>

                <button onClick={() => setIsSearchOpen(false)} className="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 bg-white/5 px-2.5 py-1.5 rounded-md transition-colors flex-shrink-0">
                  ESC
                </button>
              </div>

              <AnimatePresence>
                {isSettingsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden border-b border-white/5"
                  >
                    <div className="py-4 px-2 flex flex-col gap-5">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-white/40" />
                          <span className="text-[9px] uppercase tracking-widest text-white/40 font-black">
                            {language === 'en' ? 'Production Year' : 'Rok výroby'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 flex flex-col gap-1">
                            <span className="text-[8px] text-white/20 uppercase">{language === 'en' ? 'From' : 'Od'}</span>
                            <input 
                              type="number" 
                              value={minYear}
                              onChange={(e) => setMinYear(Number(e.target.value))}
                              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#0A84FF]/50 [appearance:textfield]"
                            />
                          </div>
                          <div className="flex-1 flex flex-col gap-1">
                            <span className="text-[8px] text-white/20 uppercase">{language === 'en' ? 'To' : 'Do'}</span>
                            <input 
                              type="number" 
                              value={maxYear}
                              onChange={(e) => setMaxYear(Number(e.target.value))}
                              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#0A84FF]/50 [appearance:textfield]"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60 font-medium">{language === 'en' ? 'Search by Origin' : 'Hledat podle země'}</span>
                          <button onClick={() => setSearchOrigin(!searchOrigin)} className={`w-9 h-5 rounded-full transition-colors relative flex items-center ${searchOrigin ? 'bg-[#0A84FF]' : 'bg-white/10'}`}>
                            <motion.div layout transition={{ duration: 0.15 }} className="w-4 h-4 bg-white rounded-full absolute" style={{ left: searchOrigin ? 'calc(100% - 18px)' : '2px' }} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60 font-medium">{language === 'en' ? 'Search in Categories' : 'Hledat v kategoriích'}</span>
                          <button onClick={() => setSearchCategories(!searchCategories)} className={`w-9 h-5 rounded-full transition-colors relative flex items-center ${searchCategories ? 'bg-[#0A84FF]' : 'bg-white/10'}`}>
                            <motion.div layout transition={{ duration: 0.15 }} className="w-4 h-4 bg-white rounded-full absolute" style={{ left: searchCategories ? 'calc(100% - 18px)' : '2px' }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div className="flex flex-col gap-1 max-h-[45vh] overflow-y-auto pb-6 pr-2 pt-4 scrollbar-none">
                {filteredCars.map((car, i) => (
                  <motion.div 
                    key={car.id} 
                    onClick={() => { if (onSelectCar) { onSelectCar(car.id); setIsSearchOpen(false); } }}
                    className="group flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-lg md:text-xl font-bold text-white tracking-tight uppercase group-hover:text-[#0A84FF] transition-colors">{car.name}</div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[#0A84FF] text-[9px] font-black tracking-[0.15em] uppercase flex items-center gap-1.5">
                      {language === 'en' ? "Explore" : "Detail"} <ArrowRight className="w-3 h-3" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed left-0 right-0 z-[100] flex justify-center pointer-events-none">
        <motion.div
          layout
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`pointer-events-auto flex items-center justify-between overflow-hidden transition-all ${
            scrolled 
              ? "mt-4 w-full max-w-[700px] h-14 bg-[#111112]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)]" 
              : "w-full h-24 bg-transparent border-b border-white/5 px-10"
          }`}
        >
          {/* LOGO - zvětšená hit area pomocí paddingu */}
          <motion.div layout className="flex-shrink-0 flex items-center">
            <a href="#" onClick={goToTop} className="flex items-center py-2 px-1 group">
              <motion.span layout="position" className={`font-bold tracking-[0.3em] text-white uppercase transition-colors duration-200 group-hover:text-[#0A84FF] ${scrolled ? "text-[10px]" : "text-xl md:text-2xl"}`}>
                AUTO<span className="text-neutral-500 group-hover:text-[#0A84FF]/70 transition-colors">VAULT</span>
              </motion.span>
            </a>
          </motion.div>

          <motion.div layout className={`flex items-center transition-all duration-200 ${scrolled ? "gap-2 md:gap-4" : "gap-4 md:gap-8"}`}>
            {/* ODKAZY - zvětšený padding pro snadnější kliknutí */}
            <div className="hidden md:flex items-center">
              <motion.a 
                layout="position" 
                href="#database-section" 
                onClick={handleArchiveClick} 
                className={`px-4 py-2 font-medium tracking-[0.2em] uppercase text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer ${scrolled ? "text-[9px]" : "text-[11px]"}`}
              >
                {language === "en" ? "Archive" : "Archiv"}
              </motion.a>
              <motion.button 
                layout="position" 
                onClick={handleContactClick} 
                className={`px-4 py-2 font-medium tracking-[0.2em] uppercase text-neutral-400 hover:text-white transition-colors duration-200 ${scrolled ? "text-[9px]" : "text-[11px]"}`}
              >
                {language === "en" ? "Contact" : "Kontakt"}
              </motion.button>
            </div>

            <div className={`flex items-center border-l border-white/10 ${scrolled ? "gap-1 ml-1 pl-3" : "gap-2 ml-4 pl-6"}`}>
              
              {/* GLOBUS - definovaná větší plocha (40x40px) */}
              {onToggleView && (
                <motion.button 
                  onClick={onToggleView} 
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }} 
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.15 }} 
                  className={`relative rounded-full flex items-center justify-center transition-colors text-neutral-400 hover:text-[#0A84FF] ${
                    scrolled ? 'w-10 h-10' : 'w-12 h-12'
                  }`}
                  title={currentView === 'globe' ? 'Back to Gallery' : 'Open World Map'}
                >
                  <Globe2 className={scrolled ? "w-4 h-4" : "w-5 h-5"} />
                </motion.button>
              )}

              {/* SEARCH - definovaná větší plocha (40x40px) */}
              <motion.button 
                onClick={() => setIsSearchOpen(true)} 
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }} 
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }} 
                className={`relative rounded-full flex items-center justify-center transition-colors text-neutral-400 hover:text-white ${
                  scrolled ? 'w-10 h-10' : 'w-12 h-12'
                }`}
              >
                <Search className={scrolled ? "w-4 h-4" : "w-5 h-5"} />
              </motion.button>

              {/* JAZYK - výraznější tlačítko s lepším hitboxem */}
              <button 
                onClick={toggleLanguage} 
                className={`font-black border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300 active:scale-95 uppercase flex items-center justify-center ${
                  scrolled 
                    ? "text-[9px] w-10 h-10 ml-1" 
                    : "text-[10px] px-5 py-2.5 ml-2 min-w-[60px]"
                }`}
              >
                {language === "en" ? "CZ" : "EN"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </nav>
    </>
  );
};

export default Navbar;