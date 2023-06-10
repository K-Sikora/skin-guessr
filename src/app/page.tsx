"use client";
import BackgroundPlayer from "@/components/BackgroundPlayer";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Options from "@/components/Options/Options";
const Homepage: React.FC = () => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  return (
    <>
      <Navbar />
      <main className="relative flex items-center justify-start w-full min-h-screen">
        <BackgroundPlayer />
        {!optionsVisible && (
          <div className="items-start menu flex px-4 flex-col gap-12 uppercase text-5xl w-full mx-auto z-20">
            <Link href="/play">
              <h2 className="text-white relative group duration-200">
                Start game
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full duration-300 h-1 bg-white"></div>
              </h2>
            </Link>
            <h2
              onClick={() => setOptionsVisible(true)}
              className="text-white relative group duration-200 cursor-pointer"
            >
              Options
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full duration-300 h-1 bg-white"></div>
            </h2>
            <Link href="/credits">
              <h2 className="text-white relative group duration-200">
                Credits
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full duration-300 h-1 bg-white"></div>
              </h2>
            </Link>
          </div>
        )}
        <AnimatePresence>
          {optionsVisible && <Options setOptionsVisible={setOptionsVisible} />}
        </AnimatePresence>
      </main>
    </>
  );
};

export default Homepage;
