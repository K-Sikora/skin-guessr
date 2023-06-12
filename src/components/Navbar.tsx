import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";
import { TbMusic, TbMusicOff } from "react-icons/tb";
import { AiFillGithub } from "react-icons/ai";
import { useVolume } from "@/context/context";
import Sound, { ReactSoundProps } from "react-sound";
const musicArray = [
  `https://firebasestorage.googleapis.com/v0/b/icon-finder-91d39.appspot.com/o/mp3%2FM.O.O.N.%20-%20'Crystals'%20%5BHotline%20Miami%20Soundtrack%5D.mp3?alt=media&token=0650af10-be3d-4fe5-b7f6-5851c9c370d1`,
  "https://firebasestorage.googleapis.com/v0/b/icon-finder-91d39.appspot.com/o/mp3%2FCounter-Strike%20Global%20Offensive%20Soundtrack%20-%20Team%20Selection.mp3?alt=media&token=58e9942b-1a82-49f6-b21d-c7fe53153f5b",
  "https://firebasestorage.googleapis.com/v0/b/icon-finder-91d39.appspot.com/o/mp3%2FCounter-Strike%20Global%20Offensive%20Soundtrack%20-%20Storm%20the%20Front!.mp3?alt=media&token=dcfd5814-a2b1-4a63-b40d-0d8566ad870f",
  "https://firebasestorage.googleapis.com/v0/b/icon-finder-91d39.appspot.com/o/mp3%2FCounter-Strike%20Global%20Offensive%20Soundtrack%20-%20Stocking%20Up.mp3?alt=media&token=99555931-1e3b-4581-887c-0791b13b4dab",
  "https://firebasestorage.googleapis.com/v0/b/icon-finder-91d39.appspot.com/o/mp3%2FCounter-Strike%20Global%20Offensive%20Soundtrack%20-%20Main%20Theme.mp3?alt=media&token=aad19d27-fe18-43b4-bc11-51cda2bb660b",
  "https://firebasestorage.googleapis.com/v0/b/icon-finder-91d39.appspot.com/o/mp3%2FCounter-Strike%20Global%20Offensive%20Soundtrack%20-%20Guns%2C%20Gear%2C%20Grenades.mp3?alt=media&token=93981939-4c5a-466f-8809-1c6b77878f68",
  `https://firebasestorage.googleapis.com/v0/b/icon-finder-91d39.appspot.com/o/mp3%2FCounter-Strike%20Global%20Offensive%20Soundtrack%20-%20Lock'n'Load.mp3?alt=media&token=b9a2bd63-7c16-403a-8686-1cfba967c05c`,
  "https://firebasestorage.googleapis.com/v0/b/icon-finder-91d39.appspot.com/o/mp3%2FCounter-Strike%20Global%20Offensive%20Soundtrack%20-%20Black%20Market%20Guns.mp3?alt=media&token=1b854bf3-9804-458f-af5e-7a181639aa7d",
];
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
