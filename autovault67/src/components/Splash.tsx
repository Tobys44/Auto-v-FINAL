import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface SplashProps {
  isVisible: boolean;
}

const Splash = ({ isVisible }: SplashProps) => {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* TEXTOVÉ LOGO STEJNÉ JAKO V NAVBARU (jen větší) */}
          <motion.div
            className="mb-6 flex items-center justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-bold tracking-[0.3em] text-white uppercase text-4xl md:text-5xl">
              AUTO<span className="text-neutral-500">VAULT</span>
            </span>
          </motion.div>

          <motion.p
            className="font-display text-sm tracking-[0.3em] text-muted-foreground uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t("splash.text")}
          </motion.p>

          <motion.div
            className="mt-8 h-[1px] bg-border w-48 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Splash;