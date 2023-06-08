import React, { useState } from "react";
import { IoIosHelpBuoy } from "react-icons/io";
import { BsQuestionLg } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa";
import { TbLetterCase } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
const BottomPanel = ({
  setCurrentRound,
  index,
  handleShowHint,
  handleShowPriceHint,
  hintUsed,
  priceHintUsed,
}: {
  setCurrentRound: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  handleShowHint: Function;
  handleShowPriceHint: Function;
  hintUsed: boolean;
  priceHintUsed: boolean;
}) => {
  const [hintMenuVisible, setHintMenuVisible] = useState(false);
  return (
    <div className="absolute bottom-5 w-full items-center px-4 md:px-8 grid grid-cols-2 md:grid-cols-3">
      <div className="hidden md:block"></div>
      <div className="flex  items-center justify-start md:justify-center w-full gap-2">
        <button
          onClick={() => {
            setHintMenuVisible(!hintMenuVisible);
          }}
          className="bg-green-700 relative h-10 w-10 flex items-center justify-center group rounded-xl"
        >
          <IoIosHelpBuoy className="w-full h-full p-1 text-gray-200 group-hover:text-white duration-200" />
          <AnimatePresence>
            {hintMenuVisible && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.2 }}
                className="absolute cursor-default rounded-lg flex items-center justify-center gap-3 -top-16 h-14 w-28 bg-gray-900 border-2"
              >
                <span
                  style={{
                    backgroundColor: priceHintUsed ? "#4b5563" : "",
                    pointerEvents: priceHintUsed ? "none" : "all",
                  }}
                  onClick={() => {
                    if (!priceHintUsed) {
                      handleShowPriceHint();
                    }
                  }}
                  className="bg-green-600 hover:bg-green-500 duration-200 cursor-pointer shadow-md shadow-green-300/10 h-9 w-9 flex items-center justify-center group rounded-full"
                >
                  <FaDollarSign />
                </span>
                <span
                  style={{
                    backgroundColor: hintUsed ? "#4b5563" : "",
                    pointerEvents: hintUsed ? "none" : "all",
                  }}
                  onClick={() => {
                    if (!hintUsed) {
                      handleShowHint();
                    }
                  }}
                  className="bg-green-600 hover:bg-green-500 duration-200 cursor-pointer shadow-md shadow-green-300/10 h-9 w-9 flex items-center justify-center group rounded-full"
                >
                  <TbLetterCase />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        <button className="bg-green-700 h-10 w-10 flex items-center justify-center group rounded-xl">
          <BsQuestionLg className="w-full h-full p-2 text-gray-200 group-hover:text-white duration-200" />
        </button>
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={() => {
            setCurrentRound(index + 1);
          }}
          className="flex items-center justify-center gap-2  bg-gradient-to-r from-green-500 to-green-600 w-48 h-10 rounded-xl"
        >
          <span className="text-lg">Next</span>
        </button>
      </div>
    </div>
  );
};

export default BottomPanel;
