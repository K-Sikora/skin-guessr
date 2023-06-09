"use client";
import BackgroundPlayer from "@/components/BackgroundPlayer";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
const Homepage: React.FC = () => {
  return (
    <main className="relative flex items-center justify-start w-full min-h-screen ">
      <BackgroundPlayer />
      <div className="max-w-6xl items-start menu flex px-4 flex-col gap-12 uppercase text-5xl w-full mx-auto z-20">
        <Link href="/play">
          <h2 className="text-white relative group duration-200">
            Start game
            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full duration-300 h-1 bg-white"></div>
          </h2>
        </Link>
        <Link href="/options">
          <h2 className="text-white relative group duration-200">
            Options
            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full duration-300 h-1 bg-white"></div>
          </h2>
        </Link>
        <Link href="/credits">
          <h2 className="text-white relative group duration-200">
            Credits
            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full duration-300 h-1 bg-white"></div>
          </h2>
        </Link>
      </div>
    </main>
  );
};

export default Homepage;
