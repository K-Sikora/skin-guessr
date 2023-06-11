import React, { useState } from "react";
import { IoIosHelpBuoy } from "react-icons/io";
import { BsQuestionLg } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa";
import { TbLetterCase } from "react-icons/tb";
import { useVolume } from "@/context/context";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
const BottomPanel = ({
  setCurrentRound,
  handleShowHint,
  handleShowPriceHint,
  isAnsweredName,
  isAnsweredCondition,
  isAnsweredPrice,
  rarity_color,
  setScore,
  setInfoPopupVisible,
  hintsEnabled,
  priceGuessEnabled,
  conditionGuessEnabled,
}: {
  setCurrentRound: React.Dispatch<React.SetStateAction<number>>;
  handleShowHint: Function;
  handleShowPriceHint: Function;
  isAnsweredName: string;
  isAnsweredCondition: string;
  isAnsweredPrice: string;
  rarity_color: string;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setInfoPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  hintsEnabled: boolean;
  priceGuessEnabled: boolean;
  conditionGuessEnabled: boolean;
}) => {
  const { contextVolume } = useVolume();
  const respawn = new Howl({
    src: "./respawn.wav",
    html5: true,
    volume: contextVolume,
  });
  const [notAnswered, setNotAnswered] = useState(false);
  const [nameHintMenuVisible, setNameHintMenuVisible] = useState(false);
  const [priceHintMenuVisible, setPriceHintMenuVisible] = useState(false);
  const [priceHintUsed, setPriceHintUsed] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintMenuVisible, setHintMenuVisible] = useState(false);
  return (
    <div className="absolute bottom-5 w-full items-center px-4 md:px-8 grid grid-cols-2 md:grid-cols-3">
      <div className="hidden md:block"></div>
      <div className="flex  items-center justify-start md:justify-center w-full gap-2">
        {hintsEnabled && (
          <button
            onClick={() => {
              setHintMenuVisible(!hintMenuVisible);
            }}
            className="bg-green-600 relative h-10 w-10 flex items-center justify-center group rounded-xl"
          >
            <IoIosHelpBuoy className="w-full h-full p-1 text-gray-200 group-hover:text-white duration-200" />
            <AnimatePresence>
              {hintMenuVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.2 }}
                  className="absolute cursor-default rounded-lg flex items-center justify-center gap-3 left-0 md:left-auto -top-16 h-14 w-28 bg-gray-900 border-2"
                >
                  <span
                    onMouseOver={() => setPriceHintMenuVisible(true)}
                    onMouseLeave={() => setPriceHintMenuVisible(false)}
                    style={{
                      backgroundColor: priceHintUsed ? "#4b5563" : "",
                      pointerEvents: priceHintUsed ? "none" : "all",
                    }}
                    onClick={() => {
                      if (!priceHintUsed) {
                        handleShowPriceHint();
                        setPriceHintUsed(true);
                      }
                    }}
                    className="bg-green-600 relative hover:bg-green-500 duration-200 cursor-pointer shadow-md shadow-green-300/10 h-9 w-9 flex items-center justify-center group rounded-full"
                  >
                    <FaDollarSign />
                    {priceHintMenuVisible && !priceHintUsed && (
                      <div className="text-sm p-1 absolute bottom-14 w-44 bg-gray-800 border-[1px] rounded-lg left-0 md:left-1/2 md:-translate-x-1/2">
                        For{" "}
                        <span
                          style={{ color: "#" + rarity_color }}
                          className="font-semibold"
                        >
                          $500
                        </span>
                        , this hint will show you the first digit of the skin
                        price.
                      </div>
                    )}
                  </span>
                  <span
                    onMouseOver={() => setNameHintMenuVisible(true)}
                    onMouseLeave={() => setNameHintMenuVisible(false)}
                    style={{
                      backgroundColor: hintUsed ? "#4b5563" : "",
                      pointerEvents: hintUsed ? "none" : "all",
                    }}
                    onClick={() => {
                      if (!hintUsed) {
                        handleShowHint();
                        setHintUsed(true);
                      }
                    }}
                    className="bg-green-600 relative hover:bg-green-500 duration-200 cursor-pointer shadow-md shadow-green-300/10 h-9 w-9 flex items-center justify-center group rounded-full"
                  >
                    <TbLetterCase />
                    {nameHintMenuVisible && !hintUsed && (
                      <div className="text-sm p-1 absolute bottom-14 w-44 bg-gray-800 border-[1px] rounded-lg left-0 md:left-1/2 md:-translate-x-1/2">
                        For{" "}
                        <span
                          style={{ color: "#" + rarity_color }}
                          className="font-semibold"
                        >
                          $500
                        </span>
                        , this hint will show you the two first letters of the
                        skin name.
                      </div>
                    )}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}

        <button
          onClick={() => setInfoPopupVisible(true)}
          className="bg-green-600 h-10 w-10 flex items-center justify-center group rounded-xl"
        >
          <BsQuestionLg className="w-full h-full p-2 text-gray-200 group-hover:text-white duration-200" />
        </button>
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={() => {
            if (
              (isAnsweredName.length !== 0 &&
                isAnsweredCondition.length !== 0 &&
                isAnsweredPrice.length !== 0) ||
              notAnswered
            ) {
              if (notAnswered) {
                if (isAnsweredName.length === 0) {
                  if (priceGuessEnabled) {
                    setScore((prev) => prev - 1000);
                  }
                }
                if (isAnsweredPrice.length === 0) {
                  setScore((prev) => prev - 1000);
                }
                if (isAnsweredCondition.length === 0) {
                  if (conditionGuessEnabled) {
                    setScore((prev) => prev - 750);
                  }
                }
                respawn.play();
              }
              setCurrentRound((prev) => prev + 1);
            } else {
              setNotAnswered(true);
            }
          }}
          className="flex items-center justify-center gap-2 font-medium bg-gradient-to-r from-green-500 to-green-600 w-48 h-10 rounded-xl"
        >
          <span className="text-base">
            {notAnswered ? "Are you sure?" : "Next"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default BottomPanel;
