import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";
import { TbMusic, TbMusicOff } from "react-icons/tb";
import { AiFillGithub } from "react-icons/ai";
import { useVolume } from "@/context/context";
import { musicArray } from "./music";
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
    <header className="sticky top-0 left-0 z-50 flex items-center justify-between h-24 px-4 -mt-24 md:px-8 bg-gradient-to-b from-gray-950 to-gray-950/0">
      <Link href="/">
        <img
          src="./logo.svg"
          className="w-16"
        ></img>
      </Link>
      <div className="flex items-center justify-center gap-6 px-6 py-3 rounded-full bg-gradient-to-r backdrop-blur-sm from-gray-800/10 to-gray-900/10">
        <motion.button onClick={handleChangeVolume}>
          {contextVolume > 0 ? (
            <RxSpeakerLoud className="w-6 h-6 text-white" />
          ) : (
            <RxSpeakerOff className="w-6 h-6 text-white" />
          )}
        </motion.button>
        <motion.button onClick={togglePlayStatus}>
          {status === "PLAYING" ? (
            <TbMusic className="w-6 h-6 text-white" />
          ) : (
            <TbMusicOff className="w-6 h-6 text-white" />
          )}
        </motion.button>
        <Link
          target="_blank"
          href="https://github.com/K-Sikora"
        >
          <motion.div>
            <AiFillGithub className="w-6 h-6 text-white" />
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
