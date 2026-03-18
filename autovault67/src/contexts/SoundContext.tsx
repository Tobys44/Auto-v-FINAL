import { createContext, useContext, useState, ReactNode } from "react";

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  // TODO: Inject Howler.js here for actual audio playback
  playHover: () => void;
  playClick: () => void;
  playEngineStart: () => void;
  playAmbient: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = () => setSoundEnabled((prev) => !prev);

  // TODO: Inject Howler.js here - replace these with actual audio playback
  const playHover = () => {
    if (!soundEnabled) return;
    // TODO: Inject Howler.js here - play UI hover sound
  };

  const playClick = () => {
    if (!soundEnabled) return;
    // TODO: Inject Howler.js here - play UI click sound
  };

  const playEngineStart = () => {
    if (!soundEnabled) return;
    // TODO: Inject Howler.js here - play loud engine start sound
  };

  const playAmbient = () => {
    if (!soundEnabled) return;
    // TODO: Inject Howler.js here - play ambient background music
  };

  return (
    <SoundContext.Provider
      value={{ soundEnabled, toggleSound, playHover, playClick, playEngineStart, playAmbient }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
};
