import { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { cars } from "@/data/cars";
import BrandCard from "./BrandCard";
import { X, Globe2 } from "lucide-react";

// Databáze lokací
const locations = [
  { id: "japan", name: "Japan", nameCz: "Japonsko", lat: 36.2048, lng: 138.2529, originKey: "Japan" },
  { id: "germany", name: "Germany", nameCz: "Německo", lat: 51.1657, lng: 10.4515, originKey: "Germany" },
  { id: "italy", name: "Italy", nameCz: "Itálie", lat: 41.8719, lng: 12.5674, originKey: "Italy" },
  { id: "usa", name: "USA", nameCz: "USA", lat: 37.0902, lng: -95.7129, originKey: "USA" },
  { id: "uk", name: "United Kingdom", nameCz: "Velká Británie", lat: 55.3781, lng: -3.4360, originKey: "UK" },
];

function latLongToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  
  return new THREE.Vector3(x, y, z);
}

function Marker({ location, onClick, isSelected }: { location: any; onClick: (id: string) => void, isSelected: boolean }) {
  const { language } = useLanguage();
  const pos = useMemo(() => latLongToVector3(location.lat, location.lng, 2.02), [location.lat, location.lng]);
  const [hovered, setHovered] = useState(false);

  const count = cars.filter(c => c.origin === location.originKey).length;

  return (
    <group position={pos}>
      <mesh 
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }} 
        onPointerLeave={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
        onClick={(e) => { e.stopPropagation(); onClick(location.id); }}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={hovered || isSelected ? "#ffffff" : "#0A84FF"} />
      </mesh>
      
      <mesh>
        <ringGeometry args={[0.12, 0.18, 32]} />
        <meshBasicMaterial 
          color={hovered || isSelected ? "#ffffff" : "#0A84FF"} 
          transparent 
          opacity={hovered || isSelected ? 0.9 : 0.4} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      {(hovered || isSelected) && (
        <Html center zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
          <div className="bg-[#111112]/95 backdrop-blur-md border border-white/30 px-4 py-2.5 rounded-[1rem] shadow-[0_0_30px_rgba(10,132,255,0.4)] transform -translate-y-10 flex flex-col items-center min-w-[100px] transition-transform animate-in fade-in zoom-in duration-200">
            <h4 className="text-white font-bold text-sm mb-0.5 whitespace-nowrap">{language === 'en' ? location.name : location.nameCz}</h4>
            <p className="text-[8px] text-[#0A84FF] font-black uppercase tracking-[0.2em]">{count} {language === 'en' ? 'Vehicles' : 'Vozů'}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

function Globe({ onSelect, selectedId }: { onSelect: (id: string) => void, selectedId: string | null }) {
  const globeGroup = useRef<THREE.Group>(null);
  const earthTexture = useTexture("https://unpkg.com/three-globe/example/img/earth-day.jpg");

  useFrame(() => {
    if (globeGroup.current && !selectedId) {
      globeGroup.current.rotation.y += 0.0005; 
    }
  });

  return (
    <group ref={globeGroup}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          map={earthTexture}
          color="#ffffff" 
          roughness={0.6} 
          metalness={0.1} 
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.03, 64, 64]} />
        <meshBasicMaterial color="#0A84FF" transparent opacity={0.06} blending={THREE.AdditiveBlending} />
      </mesh>
      
      {locations.map((loc) => (
        <Marker key={loc.id} location={loc} onClick={onSelect} isSelected={selectedId === loc.id} />
      ))}
    </group>
  );
}

export default function GlobeView({ onSelectCar, onClose }: { onSelectCar: (id: string) => void, onClose: () => void }) {
  const { language } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const activeLocation = locations.find(l => l.id === selectedRegion);
  const regionalCars = activeLocation ? cars.filter(c => c.origin === activeLocation.originKey) : [];

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden flex pt-24">
      
      {/* TLAČÍTKO ESC VPRAVO NAHOŘE */}
      <div className="absolute top-32 right-10 z-20 pointer-events-auto">
        <button 
          onClick={onClose} 
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white hover:bg-white/10 bg-[#111112]/80 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl transition-all shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          ESC
        </button>
      </div>

      <div className="absolute top-32 left-10 z-20 pointer-events-none">
        <h2 className="text-[10px] tracking-[0.5em] text-[#0A84FF] font-black uppercase mb-4 flex items-center gap-2 drop-shadow-md">
          <Globe2 className="w-4 h-4" /> Global Origin
        </h2>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-2xl">
          {language === 'en' ? 'EXPLORE' : 'OBJEVUJ'} <br />
          <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.8)]">BY ORIGIN</span>
        </h1>
      </div>

      <div className={`flex-1 transition-all duration-700 ${selectedRegion ? 'lg:pr-[500px]' : ''}`}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            
            <ambientLight intensity={1.5} color="#ffffff" />
            <directionalLight position={[15, 10, 10]} intensity={3} color="#ffffff" />
            <directionalLight position={[-15, -10, -10]} intensity={1.5} color="#ffffff" />

            <Globe onSelect={setSelectedRegion} selectedId={selectedRegion} />
            
            <OrbitControls 
              enablePan={false} 
              enableZoom={true} 
              minDistance={2.5} 
              maxDistance={10}
              autoRotate={!selectedRegion}
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      <AnimatePresence>
        {selectedRegion && activeLocation && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-full lg:w-[500px] bg-[#0A0A0B]/90 backdrop-blur-2xl border-l border-white/10 z-50 flex flex-col pt-24 shadow-[-30px_0_60px_rgba(0,0,0,0.6)]"
          >
            <div className="p-8 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] tracking-[0.3em] text-[#0A84FF] font-black uppercase">Region</span>
                <h3 className="text-3xl font-bold text-white mt-1">{language === 'en' ? activeLocation.name : activeLocation.nameCz}</h3>
              </div>
              <button 
                onClick={() => setSelectedRegion(null)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TADY JE OPRAVA: Odstranil jsem z konce tohoto řádku to ></div> */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {regionalCars.length > 0 ? (
                regionalCars.map((car, index) => (
                  <BrandCard key={car.id} car={car} index={index} onSelect={onSelectCar} />
                ))
              ) : (
                <div className="h-40 flex items-center justify-center border border-dashed border-white/10 rounded-[2rem]">
                  <p className="text-neutral-500 italic text-sm">{language === 'en' ? 'No vehicles documented yet.' : 'Zatím žádné vozy.'}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}