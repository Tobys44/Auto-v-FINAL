import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Splash from "@/components/Splash";
import GalleryView from "@/components/GalleryView";
import CarDetailView from "@/components/CarDetailView";
import GlobeView from "@/components/GlobeView";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  
  const [currentView, setCurrentView] = useState<"gallery" | "globe">("gallery"); 
  const [savedScroll, setSavedScroll] = useState(0);
  
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // NOVÉ: Globální naslouchání na klávesu ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && currentView === "globe") {
        setCurrentView("gallery");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentView]);

  const handleSelectCar = (carId: string) => {
    if (currentView === "gallery") {
      setSavedScroll(window.scrollY);
    }
    setSelectedCar(carId);
  };

  return (
    <>
      <CustomCursor />
      <Splash isVisible={showSplash} />

      {!showSplash && (
        <>
          <Navbar 
            onSelectCar={handleSelectCar} 
            currentView={currentView}
            onToggleView={() => {
              if (currentView === "gallery") setSavedScroll(window.scrollY);
              setCurrentView(currentView === "gallery" ? "globe" : "gallery");
              setSelectedCar(null); 
            }}
          />

          <AnimatePresence mode="wait">
            {selectedCar ? (
              <CarDetailView
                key="detail"
                carId={selectedCar}
                onBack={() => setSelectedCar(null)}
              />
            ) : currentView === "globe" ? (
              <motion.div
                key="globe"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {/* Přidána prop onClose pro glóbus */}
                <GlobeView onSelectCar={handleSelectCar} onClose={() => setCurrentView("gallery")} />
              </motion.div>
            ) : (
              <motion.div
                key="gallery"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Přidána prop onOpenMap pro velké lákadlo v galerii */}
                <GalleryView 
                  onSelectCar={handleSelectCar} 
                  initialScroll={savedScroll} 
                  onOpenMap={() => {
                    setSavedScroll(window.scrollY);
                    setCurrentView("globe");
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {currentView === "gallery" && !selectedCar && (
            <footer id="contact" className="mt-24 border-t border-[#1C1C1E]">
              <div className="max-w-5xl mx-auto px-6 py-10 text-center space-y-4">
                <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
                  {language === 'en' ? 'CONTACT' : 'KONTAKT'}
                </p>
                <a
                  href="mailto:hello@autovault.com"
                  className="text-xl md:text-2xl text-foreground hover:text-[#0A84FF] transition-colors"
                  data-cursor-hover
                >
                  hello@autovault.com
                </a>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'Prague, Czech Republic — 2026 Archive' : 'Praha, Česká republika — Archiv 2026'}
                </p>
              </div>
            </footer>
          )}
        </>
      )}
    </>
  );
};

export default Index;