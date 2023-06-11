"use client";
import { useState, useContext, createContext } from "react";
export const VolumeContext = createContext({
  contextVolume: 0.5,
  changeVolume: (value: number) => {},
  contextMusicVolume: 0.5,
  changeMusicVolume: (value: number) => {},
});

export const VolumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [contextVolume, setVolume] = useState(0.5);
  const [contextMusicVolume, setMusicVolume] = useState(0.5);
  const changeVolume = (value: number) => {
    setVolume(value);
  };
  const changeMusicVolume = (value: number) => {
    setMusicVolume(value);
  };
  return (
    <VolumeContext.Provider
      value={{
        contextVolume,
        changeVolume,
        contextMusicVolume,
        changeMusicVolume,
      }}
    >
      {children}
    </VolumeContext.Provider>
  );
};
export const useVolume = () => useContext(VolumeContext);
