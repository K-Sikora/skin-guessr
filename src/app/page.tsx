"use client";
import BackgroundPlayer from "@/components/BackgroundPlayer";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Options from "@/components/Options/Options";
const Homepage: React.FC = () => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [openCredits, setOpenCredits] = useState(false);
  const [isBackgroundEnabled, setIsBackgroundEnabled] = useState(true);
  useEffect(() => {
    const localStorageBackgroundOption = window.localStorage.getItem(
      "backgroundVideoOption"
    );
    if (localStorageBackgroundOption) {
      setIsBackgroundEnabled(
        localStorageBackgroundOption === "Enabled" ? true : false
      );
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative flex items-center justify-start w-full min-h-screen">
        {isBackgroundEnabled ? (
          <BackgroundPlayer />
        ) : (
          <div className="play absolute top-0 left-0 w-full h-full">
            <div className="absolute bg-black/30 w-full h-full top-0 left-0"></div>
          </div>
        )}
        {!optionsVisible && (
          <div className="items-start menu flex px-4 md:px-8 flex-col gap-12 uppercase text-4xl md:text-5xl w-full mx-auto z-20">
            <Link href="/play">
              <h2 className="text-white relative group duration-200">
                Start game
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full duration-300 h-1 bg-white"></div>
              </h2>
            </Link>
            <h2
              onClick={() => {
                setOptionsVisible(true);
                setOpenCredits(false);
              }}
              className="text-white relative group duration-200 cursor-pointer"
            >
              Options
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full duration-300 h-1 bg-white"></div>
            </h2>
            <h2
              onClick={() => {
                setOptionsVisible(true);
                setOpenCredits(true);
              }}
              className="text-white relative group duration-200 cursor-pointer"
            >
              Credits
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full duration-300 h-1 bg-white"></div>
            </h2>
          </div>
        )}
        <AnimatePresence>
          {optionsVisible && (
            <Options
              openCredits={openCredits}
              setIsBackgroundEnabled={setIsBackgroundEnabled}
              setOptionsVisible={setOptionsVisible}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default Homepage;
