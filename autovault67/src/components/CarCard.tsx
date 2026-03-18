import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Car } from "@/data/cars";
import { ArrowRight } from "lucide-react";

interface CarCardProps {
  car: Car;
  index: number;
  onSelect: (carId: string) => void;
}

const carImages: Record<string, string> = {
  porsche: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&h=400&fit=crop",
  mustang: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop",
  gtr: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop",
};

const CarCard = ({ car, index, onSelect }: CarCardProps) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.03, rotateY: 2, rotateX: -1 }}
      className="group relative rounded-xl overflow-hidden border border-border bg-card transition-all duration-300 hover:glow-border-blue"
      style={{ perspective: "1000px" }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={carImages[car.id]}
          alt={t(`${car.translationKey}.name`)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-display tracking-wider bg-primary/20 text-primary border border-primary/30">
          {car.origin}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl font-bold mb-2 text-foreground">
          {t(`${car.translationKey}.name`)}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {t(`${car.translationKey}.short`)}
        </p>
        <button
          onClick={() => onSelect(car.id)}
          className="w-full py-2.5 rounded-lg border border-primary/30 text-primary font-display text-sm tracking-wider flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors"
          data-cursor-hover
        >
          {t("card.explore")}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default CarCard;
