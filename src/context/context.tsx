"use client";
import { useState, useContext, createContext } from "react";
export const VolumeContext = createContext({
  contextVolume: 0.5,
  changeVolume: (value: number) => {},
});

export const VolumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [contextVolume, setVolume] = useState(0.3);
  const changeVolume = (value: number) => {
    setVolume(value);
  };
  return (
    <VolumeContext.Provider value={{ contextVolume, changeVolume }}>
      {children}
    </VolumeContext.Provider>
  );
};
export const useVolume = () => useContext(VolumeContext);
