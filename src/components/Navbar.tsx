import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";
import { TbMusic, TbMusicOff } from "react-icons/tb";
import { AiFillGithub } from "react-icons/ai";
import { useVolume } from "@/context/context";
import { musicArray } from "./Navbar/music";
import Sound, { ReactSoundProps } from "react-sound";

const Navbar = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(0);
  const { contextVolume, changeVolume, contextMusicVolume, changeMusicVolume } =
    useVolume();

  useEffect(() => {
    const localStorageVolume = window.localStorage.getItem("volume");
    if (localStorageVolume) {
      changeVolume(parseFloat(localStorageVolume));
    } else {
      changeVolume(0.5);
      window.localStorage.setItem("volume", "0.5");
    }

    const localStorageMusicVolume = window.localStorage.getItem("musicVolume");
    if (localStorageMusicVolume) {
      changeMusicVolume(parseFloat(localStorageMusicVolume));
    } else {
      changeMusicVolume(0.5);
      window.localStorage.setItem("musicVolume", "0.5");
    }
  }, []);

  const handleChangeVolume = () => {
    const localStorageVolume = window.localStorage.getItem("volume");
    if (localStorageVolume && parseFloat(localStorageVolume) > 0) {
      changeVolume(0);
      window.localStorage.setItem("volume", "0");
    } else {
      changeVolume(0.5);
      window.localStorage.setItem("volume", "0.5");
    }
  };
  const [status, setStatus] = useState<ReactSoundProps["playStatus"]>("PAUSED");

  function togglePlayStatus() {
    setStatus((status) => (status === "PAUSED" ? "PLAYING" : "PAUSED"));
  }

  function statusLabel(status: ReactSoundProps["playStatus"]): string {
    switch (status) {
      case "PAUSED":
        return "PLAY";
      case "PLAYING":
        return "STOP";
      default:
        return "STOP";
    }
  }

  return (
    <header className="px-4 md:px-8 h-24 flex items-center justify-between bg-gradient-to-b from-gray-950 -mt-24 sticky top-0 left-0 z-50 to-gray-950/0">
      <Link href="/">
        <img
          src="./logo.svg"
          className="w-16"
        ></img>
      </Link>
      <div className="flex items-center justify-center gap-6 py-3 px-6 bg-gradient-to-r backdrop-blur-sm from-gray-800/10 to-gray-900/10 rounded-full">
        <motion.button onClick={handleChangeVolume}>
          {contextVolume > 0 ? (
            <RxSpeakerLoud className="text-white h-6 w-6" />
          ) : (
            <RxSpeakerOff className="text-white h-6 w-6" />
          )}
        </motion.button>
        <motion.button onClick={togglePlayStatus}>
          {status === "PLAYING" ? (
            <TbMusic className="text-white h-6 w-6" />
          ) : (
            <TbMusicOff className="text-white h-6 w-6" />
          )}
        </motion.button>
        <Link
          target="_blank"
          href="https://github.com/K-Sikora"
        >
          <motion.div>
            <AiFillGithub className="text-white w-6 h-6" />
          </motion.div>
        </Link>
      </div>
      <Sound
        onFinishedPlaying={() => {
          setCurrentlyPlaying((prev) => prev + 1);
        }}
        url={musicArray[currentlyPlaying]}
        playStatus={status}
        volume={contextMusicVolume * 100}
      />
    </header>
  );
};

export default Navbar;
