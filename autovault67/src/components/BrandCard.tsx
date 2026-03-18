import { motion } from "framer-motion";
import { Car } from "@/data/cars";
import { ArrowRight, Globe, Calendar } from "lucide-react";

interface BrandCardProps {
  car: Car;
  index: number;
  onSelect: (carId: string) => void;
  isLarge?: boolean; 
}

const BrandCard = ({ car, index, onSelect, isLarge }: BrandCardProps) => {
  if (!car) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={() => onSelect(car.id)}
      className={`group relative rounded-[2rem] border border-white/5 bg-[#111112] ${isLarge ? 'p-8' : 'p-6'} flex flex-col justify-between transition-colors duration-200 hover:border-white/20 cursor-pointer overflow-hidden shadow-2xl h-full will-change-transform`}
    >
      {/* Záře v pozadí karty při hoveru */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-[#0A84FF]/0 blur-[100px] group-hover:bg-[#0A84FF]/15 transition-colors duration-200 pointer-events-none" />

      <div>
        <div className="flex justify-between items-start mb-6">
          
          {/* LOGO BEZ RÁMEČKU S JEDNOTNOU VELIKOSTÍ */}
          {/* w-16 h-12 definuje fixní "obdélník", object-contain zajistí, že logo nevyteče */}
          <div className="w-16 h-12 flex items-center justify-start relative z-10 transition-all duration-300 group-hover:scale-110 origin-left">
            {car.logo ? (
              <img 
                src={car.logo} 
                alt={`${car.brand} logo`} 
                className="max-w-full max-h-full object-contain filter drop-shadow-md brightness-90 group-hover:brightness-125 transition-all" 
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-[9px] font-black text-white tracking-widest">{car.brand.slice(0, 2).toUpperCase()}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-end gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity duration-200 relative z-10 text-right">
            <span className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-white font-black">
              <Globe className="w-3 h-3 text-[#0A84FF]" /> {car.origin}
            </span>
            <span className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-white font-black">
              <Calendar className="w-3 h-3 text-[#0A84FF]" /> {car.year}
            </span>
          </div>
        </div>

        {/* mt-4 vytváří hezkou mezeru mezi logem a názvem auta */}
        <h3 className={`${isLarge ? 'text-3xl' : 'text-xl'} font-bold text-white mb-1 tracking-tight relative z-10 uppercase mt-4`}>
          {car.name}
        </h3>
        <p className="text-[8px] tracking-[0.3em] text-[#0A84FF] font-black uppercase relative z-10">
          {car.category}
        </p>
      </div>

      <div className="mt-8 flex items-center gap-2 text-white/20 group-hover:text-white transition-colors duration-200 relative z-10">
        <span className="text-[8px] font-black tracking-[0.2em] uppercase">Prozkoumat vůz</span>
        <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform duration-200 ease-out" />
      </div>
    </motion.div>
  );
};

export default BrandCard;