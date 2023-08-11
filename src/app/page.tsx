"use client";
import BackgroundPlayer from "@/components/BackgroundPlayer";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import Link from "next/link";
import { useVolume } from "@/context/context";
import Navbar from "@/components/Navbar";
import CounterStrike from "next/font/local";
import Options from "@/components/Options/Options";
const counterStrike = CounterStrike({
  src: "./fonts/Counter-StrikeRegular.woff2",
  weight: "500",
  style: "normal",
});
const Homepage: React.FC = () => {
  const { contextVolume } = useVolume();
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
  const clickSound2 = new Howl({
    src: "./click2.mp3",
    html5: true,
    volume: contextVolume,
  });
  return (
    <>
      <Navbar />
      <main className="relative flex items-center justify-start w-full min-h-screen">
        {isBackgroundEnabled ? (
          <BackgroundPlayer />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full play">
            <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>
          </div>
        )}
        {!optionsVisible && (
          <div
            className={`z-20 flex flex-col items-start w-full gap-12 px-4 mx-auto text-4xl uppercase md:px-8 md:text-5xl ${counterStrike.className}`}
          >
            <Link
              onClick={() => {
                clickSound2.play();
              }}
              href="/play"
            >
              <h2 className="relative text-white duration-200 group">
                Start game
                <div className="absolute bottom-0 left-0 w-0 h-1 duration-300 bg-white group-hover:w-full"></div>
              </h2>
            </Link>
            <h2
              onClick={() => {
                setOptionsVisible(true);
                setOpenCredits(false);
                clickSound2.play();
              }}
              className="relative text-white duration-200 cursor-pointer group"
            >
              Options
              <div className="absolute bottom-0 left-0 w-0 h-1 duration-300 bg-white group-hover:w-full"></div>
            </h2>
            <h2
              onClick={() => {
                setOptionsVisible(true);
                setOpenCredits(true);
                clickSound2.play();
              }}
              className="relative text-white duration-200 cursor-pointer group"
            >
              Credits
              <div className="absolute bottom-0 left-0 w-0 h-1 duration-300 bg-white group-hover:w-full"></div>
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
