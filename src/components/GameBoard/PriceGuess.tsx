import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { RxCrosshair2 } from "react-icons/rx";
import { Skin } from "@/types/SkinType";
import { MdClose } from "react-icons/md";
import { Howl } from "howler";
import { useVolume } from "@/context/context";

const PriceGuess = ({
  priceGuessEnabled,
  item,
  setScore,
  setIsAnsweredPrice,
  isAnsweredPrice,
  priceHint,
}: {
  priceGuessEnabled: boolean;
  item: Skin;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setIsAnsweredPrice: React.Dispatch<React.SetStateAction<string>>;
  isAnsweredPrice: string;
  priceHint: string;
}) => {
  const { contextVolume } = useVolume();
  const guessSound = new Howl({
    src: ["./guessSound.mp3"],
    html5: true,
    preload: true,
    volume: contextVolume,
  });
  const [isHoveredPriceInfo, setIsHoveredPriceInfo] = useState(false);
  const [priceValue, setPriceValue] = useState(0);

  const handleCheckPrice = () => {
    if (priceGuessEnabled) {
      const actualPrice = item.price;
      const userPrice = priceValue;

      if (priceValue <= 0) {
        setScore((prev) => prev);
      } else {
        guessSound.play();

        const lowerBound = actualPrice - actualPrice * 0.3;
        const upperBound = actualPrice + actualPrice * 0.3;

        if (userPrice >= lowerBound && userPrice <= upperBound) {
          setScore((prev) => prev + 1000);
          setIsAnsweredPrice("right");
        } else {
          setIsAnsweredPrice("wrong");
          setScore((prev) => prev - 1000);
        }
      }
    }
  };

  return (
    <div className="flex gap-2 w-full px-4 md:px-0 md:w-[550px] text-base md:text-2xl items-center justify-between">
      <h3 className="flex gap-1 items-center">
        <span className="hidden md:block">Price</span>
        <div className="relative">
          <AiFillQuestionCircle
            onMouseOver={() => {
              setIsHoveredPriceInfo(true);
            }}
            onMouseLeave={() => {
              setIsHoveredPriceInfo(false);
            }}
            className="w-6 h-6"
          />
          <AnimatePresence>
            {isHoveredPriceInfo && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                exit={{ y: -20, opacity: 0 }}
                className="absolute bottom-8 left-0 w-64 bg-gray-900 border-[1px] rounded-md"
              >
                <p className="text-white text-sm  p-1">
                  This guess will increase or reduce your account balance by{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "#" + item.rarity_color }}
                  >
                    $1000
                  </span>
                  . Keep in mind that your guess has a slight margin of error
                  (30%). Price is based on all-time average Steam price.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </h3>
      <div className="flex gap-2 w-full h-9 relative justify-end items-center ">
        <AnimatePresence>
          {isAnsweredPrice.length > 0 ? (
            <motion.p
              key={1}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
              exit={{ opacity: 0, y: -50 }}
              className="flex items-center absolute right-10 h-9 text-base md:text-xl"
            >
              ${item.price}
            </motion.p>
          ) : (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              exit={{ opacity: 0, y: 50 }}
              key={2}
              className="relative right-0  flex items-center h-9"
            >
              <input
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.code === "Enter") {
                    handleCheckPrice();
                  }
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!isNaN(parseFloat(e.target.value))) {
                    setPriceValue(parseFloat(e.target.value));
                  }
                }}
                placeholder={priceHint.length > 0 ? priceHint : "e.g. 10"}
                className="bg-[#0C1115] text-sm md:text-base pr-12 border-[1px] border-transparent  focus:border-gray-200/30 rounded-lg h-9 w-32 md:w-48 outline-none px-2"
              ></input>
              <span className="absolute pointer-events-none right-3 top-1/2 -translate-y-1/2 text-base">
                USD
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          style={{
            backgroundColor:
              isAnsweredPrice === "right"
                ? "#16a34a"
                : isAnsweredPrice === "wrong"
                ? "#dc2626"
                : "",
          }}
          disabled={isAnsweredPrice.length > 0}
          onClick={handleCheckPrice}
          whileTap={{ scale: 0.7 }}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-yellow-600"
        >
          {isAnsweredPrice === "right" ? (
            <BsCheck />
          ) : isAnsweredPrice === "wrong" ? (
            <MdClose />
          ) : (
            <RxCrosshair2 className="md:md:p-0.5" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default PriceGuess;
