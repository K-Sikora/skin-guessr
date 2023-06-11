"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import axios from "axios";
import GameBoard from "@/components/GameBoard";
import Link from "next/link";
import Lottie from "lottie-react";
import loading from "../../../public/loading.json";
import InfoPopup from "@/components/InfoPopup";
import Navbar from "@/components/Navbar";

const PlayPage: React.FC = () => {
  type Skin = {
    rarity_color: string;
    icon_url: string;
    icon_url_large?: string;
    name: string;
    price: number;
  };
  const [infoPopupVisible, setInfoPopupVisible] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [seed, setSeed] = useState<Skin[]>([]);
  const [score, setScore] = useState(8000);

  const [currentRound, setCurrentRound] = useState(0);
  const getItems = async () => {
    try {
      const response = await axios.get("/api/getitems");

      let newSeed = seed;

      for (let i = 0; i < 100; i++) {
        const randomIndex = Math.floor(
          Math.random() * response.data.itemsList.length
        );

        newSeed = newSeed.concat(response.data.itemsList[randomIndex]);
      }

      setSeed(newSeed);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  const { isLoading } = useQuery({
    queryKey: "items",
    queryFn: getItems,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const storedBestScore = localStorage.getItem("bestScore");
    if (storedBestScore === null) {
      setBestScore(0);
    } else {
      setBestScore(parseInt(storedBestScore));
    }
    if (bestScore !== null && currentRound > bestScore) {
      window.localStorage.setItem("bestScore", currentRound.toString());
    }
  }, [currentRound]);

  const [hintsEnabled, setHintsEnabled] = useState(true);
  const [priceGuessEnabled, setPriceGuessEnabled] = useState(true);
  const [conditionGuessEnabled, setConditionGuessEnabled] = useState(true);
  useEffect(() => {
    const localStorageHintsEnabled = window.localStorage.getItem(
      "selectedHintsOption"
    );
    if (localStorageHintsEnabled === "Disabled") {
      setHintsEnabled(false);
    } else {
      setHintsEnabled(true);
    }
    const localStoragePriceGuessEnabled =
      window.localStorage.getItem("selectedPriceGuess");
    if (localStoragePriceGuessEnabled === "Disabled") {
      setPriceGuessEnabled(false);
    } else {
      setPriceGuessEnabled(true);
    }
    const localStorageConditionGuessEnabled = window.localStorage.getItem(
      "selectedConditionGuess"
    );
    if (localStorageConditionGuessEnabled === "Disabled") {
      setConditionGuessEnabled(false);
    } else {
      setConditionGuessEnabled(true);
    }
    const localStorageMoneyOption = window.localStorage.getItem(
      "selectedMoneyOption"
    );
    if (localStorageMoneyOption) {
      setScore(
        localStorageMoneyOption === "0"
          ? 2000
          : localStorageMoneyOption === "1"
          ? 4000
          : localStorageMoneyOption === "2"
          ? 6000
          : localStorageMoneyOption === "3"
          ? 8000
          : 10000
      );
    } else {
      setScore(8000);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen play flex items-center justify-center relative pt-24 pb-4 container-bg">
        {isLoading ? (
          <div className="rounded-2xl text-center text-2xl text-white w-3/4 h-[500px] flex items-center gap-6 justify-center flex-col bg-[#0C1115]/70 backdrop-blur-sm">
            Generating seed for your game...
            <div className="w-40 h-40 ">
              <Lottie
                animationData={loading}
                loop={true}
              />
            </div>
          </div>
        ) : (
          <div className="relative flex-col overflow-x-hidden flex h-[600px] w-full items-center justify-center">
            {seed.map((item, index) => (
              <div
                className="w-full h-full absolute"
                key={index}
              >
                <AnimatePresence>
                  {currentRound === index && (
                    <motion.div
                      animate={{ opacity: 1, x: 0 }}
                      initial={{ opacity: 0, x: 2000 }}
                      transition={{ duration: 0.7 }}
                      exit={{ opacity: 0, x: -2000 }}
                      className="text-white relative z-20 h-full w-full flex items-center justify-center "
                    >
                      {score >= 0 ? (
                        <GameBoard
                          score={score}
                          setScore={setScore}
                          item={item}
                          currentRound={currentRound}
                          setCurrentRound={setCurrentRound}
                          setInfoPopupVisible={setInfoPopupVisible}
                          hintsEnabled={hintsEnabled}
                          priceGuessEnabled={priceGuessEnabled}
                          conditionGuessEnabled={conditionGuessEnabled}
                        />
                      ) : (
                        <div className="rounded-2xl w-11/12 h-[600px] flex items-center gap-6 justify-center flex-col bg-[#0C1115]/70 backdrop-blur-sm">
                          <h2 className="text-4xl text-red-400 font-bold">
                            You lost!
                          </h2>
                          <h3 className="text-2xl">
                            Your best result is round{" "}
                            {bestScore !== null && currentRound > bestScore
                              ? currentRound
                              : bestScore}
                            .
                          </h3>
                          <div className="flex flex-col md:flex-row gap-4">
                            <Link href="/">
                              <button className="flex shadow-md shadow-gray-400/5 hover:shadow-lg hover:shadow-gray-400/5 duration-300 font-semibold text-lg items-center justify-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 w-36 h-9 rounded-xl">
                                Title screen
                              </button>
                            </Link>
                            <button
                              onClick={() => {
                                window.location.reload();
                              }}
                              className="flex shadow-md shadow-gray-400/5 hover:shadow-lg hover:shadow-gray-400/5 duration-300 font-semibold text-lg items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 w-36 h-9 rounded-xl"
                            >
                              Play again
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <AnimatePresence>
              {infoPopupVisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  exit={{ opacity: 0 }}
                  className="z-50"
                >
                  <InfoPopup setInfoPopupVisible={setInfoPopupVisible} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </>
  );
};

export default PlayPage;
