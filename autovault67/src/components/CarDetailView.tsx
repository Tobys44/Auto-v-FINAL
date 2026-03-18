import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/contexts/SoundContext";
import { cars } from "@/data/cars";
import { ArrowLeft, Play } from "lucide-react";
import CarViewer from "./CarViewer";

interface CarDetailViewProps {
  carId: string;
  onBack: () => void;
}

const CarDetailView = ({ carId, onBack }: CarDetailViewProps) => {
  const { t } = useLanguage();
  const { playEngineStart } = useSound();
  const car = cars.find((c) => c.id === carId);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onBack();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onBack]);

  if (!car) return null;

  const specs = [
    { label: t("detail.power"), value: t(`${car.translationKey}.power`) },
    { label: t("detail.torque"), value: t(`${car.translationKey}.torque`) },
    { label: t("detail.engine"), value: t(`${car.translationKey}.engineSpec`) },
    { label: t("detail.topSpeed"), value: t(`${car.translationKey}.topSpeed`) },
  ];

  return (
    <motion.div
      className="min-h-screen pt-24 pb-12 px-6"
      initial={{ opacity: 0, x: 30 }} // Zmenšený posun = okamžitější reakce
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: "easeOut" }} // Rychlejší a plynulejší animace bez houpání
    >
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row gap-12">
        <div className="flex-1 w-full">
          <CarViewer modelPath={`/models/${car.id}.glb`} />
        </div>

        <div className="lg:w-96 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="group flex items-center gap-2 text-neutral-500 hover:text-white transition-colors font-medium text-xs tracking-[0.2em] uppercase"
              data-cursor-hover
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              {t("detail.back")}
            </button>
            <span className="text-[9px] font-black uppercase tracking-widest text-neutral-600 bg-white/5 px-2 py-1 rounded-md">
              ESC
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tighter">
            {t(`${car.translationKey}.name`)}
          </h2>

          <p className="text-neutral-400 leading-relaxed text-sm font-light">
            {t(`${car.translationKey}.long`)}
          </p>

          <div className="mt-4">
            <h3 className="text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-4 font-bold">
              {t("detail.specs")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {specs.map((spec) => (
                <div key={spec.label} className="p-4 rounded-xl bg-[#1C1C1E] border border-white/5">
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1">{spec.label}</p>
                  <p className="text-base font-bold text-white">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => playEngineStart()}
            className="w-full mt-6 py-5 rounded-xl bg-white text-black font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-[#0A84FF] hover:text-white transition-colors duration-200"
            data-cursor-hover
          >
            <Play className="w-4 h-4 fill-current" />
            {t("detail.startEngine")}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarDetailView;