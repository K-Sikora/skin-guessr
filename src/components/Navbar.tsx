import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";
import { AiFillGithub } from "react-icons/ai";
import { useVolume } from "@/context/context";
const Navbar = () => {
  const { contextVolume, changeVolume } = useVolume();
  const [currentVolume, setCurrentVolume] = useState(0);

  useEffect(() => {
    const localStorageVolume = window.localStorage.getItem("volume");
    if (localStorageVolume) {
      changeVolume(parseFloat(localStorageVolume));
    } else {
      changeVolume(0.5);
      window.localStorage.setItem("volume", "0.5");
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

  return (
    <header className="px-4 h-24 flex items-center justify-between bg-gradient-to-b from-gray-950 -mt-24 sticky top-0 left-0 z-50 to-gray-950/0">
      <Link href="/">
        <img
          src="./logo.svg"
          className="w-16"
        ></img>
      </Link>
      <div className="flex items-center justify-center gap-6">
        <motion.button
          onClick={handleChangeVolume}
          whileHover={{ marginBottom: "10px" }}
        >
          {contextVolume > 0 ? (
            <RxSpeakerLoud className="text-white h-7 w-7" />
          ) : (
            <RxSpeakerOff className="text-white h-7 w-7" />
          )}
        </motion.button>
        <Link href="https://github.com/K-Sikora">
          <motion.div whileHover={{ marginBottom: "10px" }}>
            <AiFillGithub className="text-white w-7 h-7" />
          </motion.div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
