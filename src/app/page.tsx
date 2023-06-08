"use client";
import BackgroundPlayer from "@/components/BackgroundPlayer";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
const Homepage: React.FC = () => {
  return (
    <main className="relative flex items-center justify-start w-full min-h-screen ">
      <BackgroundPlayer />
      <div className="max-w-6xl items-start menu flex flex-col gap-12 uppercase text-5xl w-full mx-auto z-20">
        <Link href="/play">
          <h2 className="text-white hover:text-gray-300 duration-200">
            Start game
          </h2>
        </Link>
        <Link href="/options">
          <h2 className="text-white hover:text-gray-300 duration-200">
            Options
          </h2>
        </Link>
        <Link href="/credits">
          <h2 className="text-white hover:text-gray-300 duration-200">
            Credits
          </h2>
        </Link>
      </div>
    </main>
  );
};

export default Homepage;
