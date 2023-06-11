import React, { useState } from "react";
import { motion } from "framer-motion";
import SidePanel from "./SidePanel";
import OptionsContent from "./OptionsContent";
import CreditsContent from "./CreditsContent";
import { Howl } from "howler";
const Options = ({
  setOptionsVisible,
  setIsBackgroundEnabled,
  openCredits,
}: {
  setOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBackgroundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  openCredits: boolean;
}) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(
    openCredits ? 1 : 0
  );
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [selectedCreditIndex, setSelectedCreditIndex] = useState(0);
  const clickSound2 = new Howl({
    src: "./click2.mp3",
    html5: true,
  });
  const clickSound = new Howl({
    src: "./click.mp3",
    html5: true,
  });
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="absolute flex top-0 left-0 w-full h-full overflow-y-hidden z-50 backdrop-blur-md text-white"
    >
      <SidePanel
        selectedCategoryIndex={selectedCategoryIndex}
        setSelectedCategoryIndex={setSelectedCategoryIndex}
        setOptionsVisible={setOptionsVisible}
      />
      <div className="flex flex-col w-full">
        <div className="h-20 flex-shrink-0 border-b-[1px] px-2 gap-4 md:px-5 md:gap-10 flex items-center border-gray-300/50 w-full">
          <h2
            style={{
              borderBottom:
                selectedCategoryIndex === 0
                  ? "3px solid white"
                  : "3px solid transparent",
            }}
            onClick={() => {
              setSelectedCategoryIndex(0);
              clickSound2.play();
            }}
            className="md:text-2xl font-bold uppercase cursor-pointer pb-1"
          >
            Settings
          </h2>
          <h2
            style={{
              borderBottom:
                selectedCategoryIndex === 1
                  ? "3px solid white"
                  : "3px solid transparent",
            }}
            onClick={() => {
              setSelectedCategoryIndex(1);
              clickSound2.play();
            }}
            className="md:text-2xl font-bold uppercase cursor-pointer pb-1"
          >
            Credits
          </h2>
        </div>
        <div className="h-14 border-b-[1px] p-2 md:p-5 flex items-center w-full border-gray-300/50">
          {selectedCategoryIndex === 0 ? (
            <ul className="flex gap-4 md:gap-9 font-medium text-lg">
              <li
                onClick={() => {
                  setSelectedOptionIndex(0);
                  clickSound.play();
                }}
                style={{
                  borderBottom:
                    selectedOptionIndex === 0
                      ? "2px solid white"
                      : "2px solid transparent",
                }}
                className="md:pb-1 cursor-pointer"
              >
                Game
              </li>
              <li
                onClick={() => {
                  setSelectedOptionIndex(1);
                  clickSound.play();
                }}
                style={{
                  borderBottom:
                    selectedOptionIndex === 1
                      ? "2px solid white"
                      : "2px solid transparent",
                }}
                className="md:pb-1 cursor-pointer"
              >
                Sound
              </li>
              <li
                onClick={() => {
                  setSelectedOptionIndex(2);
                  clickSound.play();
                }}
                style={{
                  borderBottom:
                    selectedOptionIndex === 2
                      ? "2px solid white"
                      : "2px solid transparent",
                }}
                className="md:pb-1 cursor-pointer"
              >
                Video
              </li>
            </ul>
          ) : (
            <ul className="flex gap-9 font-medium text-lg">
              <li
                style={{
                  borderBottom:
                    selectedCreditIndex === 0
                      ? "2px solid white"
                      : "2px solid transparent",
                }}
                onClick={() => {
                  setSelectedCreditIndex(0);
                  clickSound.play();
                }}
                className="md:pb-1 cursor-pointer"
              >
                API
              </li>
              <li
                style={{
                  borderBottom:
                    selectedCreditIndex === 1
                      ? "2px solid white"
                      : "2px solid transparent",
                }}
                onClick={() => {
                  setSelectedCreditIndex(1);
                  clickSound.play();
                }}
                className="md:pb-1 cursor-pointer"
              >
                Graphic elements
              </li>
            </ul>
          )}
        </div>
        <div className="w-full h-full backdrop-blur-xl bg-black/20 overflow-y-auto">
          <div className="max-w-3xl px-2 lg:px-0 mx-auto h-full pt-8">
            {selectedCategoryIndex === 0 ? (
              <OptionsContent
                setIsBackgroundEnabled={setIsBackgroundEnabled}
                selectedOptionIndex={selectedOptionIndex}
              />
            ) : (
              <CreditsContent selectedCreditIndex={selectedCreditIndex} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Options;
