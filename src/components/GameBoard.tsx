import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import distance from "jaro-winkler";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { RxCrosshair2 } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import BottomPanel from "./GameBoard/BottomPanel";

type Skin = {
  rarity_color: string;
  icon_url: string;
  icon_url_large?: string;
  name: string;
  price: number;
};
const GameBoard = ({
  seed,
  index,
  currentRound,
  setCurrentRound,
  item,
  score,
  setScore,
}: {
  seed: Skin[];
  index: number;
  currentRound: number;
  setCurrentRound: React.Dispatch<React.SetStateAction<number>>;
  item: Skin;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isAnsweredName, setIsAnsweredName] = useState<string>("");
  const [isAnsweredCondition, setIsAnsweredCondition] = useState<string>("");
  const [isAnsweredPrice, setIsAnsweredPrice] = useState<string>("");
  const [nameValue, setNameValue] = useState<string>("");
  const [conditionValue, setConditionValue] = useState<string>("");
  const [priceValue, setPriceValue] = useState<number>(0);
  const handleCheckName = () => {
    if (nameValue.length > 0) {
      const modifiedNameValue = nameValue.replace(/&#39s/g, "'");
      const onlyName: string = item.name
        .split("|")[1]
        .trim()
        .split("(")[0]
        .trim();
      if (
        distance(onlyName.toLowerCase(), modifiedNameValue.toLowerCase()) > 0.88
      ) {
        setScore((prev) => prev + 1);
        setIsAnsweredName("right");
      } else {
        setIsAnsweredName("wrong");
      }
    }
  };
  const handleCheckCondition = () => {
    if (conditionValue.length > 0) {
      const onlyCondition = item.name.split("|")[1].trim().split("(")[1].trim();
      console.log(
        onlyCondition.substring(0, onlyCondition.length - 1).toLowerCase()
      );
      if (
        distance(
          conditionValue.toLowerCase(),
          onlyCondition.substring(0, onlyCondition.length - 1).toLowerCase()
        ) > 0.92
      ) {
        setScore((prev) => prev + 0.5);
        setIsAnsweredCondition("right");
      } else {
        setIsAnsweredCondition("wrong");
      }
    }
  };
  const handleCheckPrice = () => {
    const actualPrice = item.price;
    const userPrice = priceValue;

    if (isNaN(userPrice)) {
      setScore((prev) => prev);
    } else {
      const lowerBound = actualPrice - actualPrice * 0.3;
      const upperBound = actualPrice + actualPrice * 0.3;

      if (userPrice >= lowerBound && userPrice <= upperBound) {
        setScore((prev) => prev + 0.5);
        setIsAnsweredPrice("right");
      } else {
        setIsAnsweredPrice("wrong");
      }
    }
  };

  return (
    <div className="rounded-2xl w-10/12 h-[90%] flex items-center gap-6 justify-center flex-col bg-[#0C1115]/70 backdrop-blur-sm">
      <div className="flex h-2/6  justify-center">
        <Image
          className=" object-contain pointer-events-none"
          alt="skin image"
          src={`https://community.cloudflare.steamstatic.com/economy/image/${
            item.icon_url_large ? item.icon_url_large : item.icon_url
          }`}
          width={1000}
          height={1000}
        ></Image>
      </div>
      <div className="flex gap-2 text-2xl items-center w-[550px]  justify-between">
        <h3 className="flex gap-1 items-center">
          {item.name.split("|")[0].trim()}
          <AiFillQuestionCircle className="w-6 h-6" />
        </h3>
        <div className="flex gap-2 relative justify-end h-9 items-center">
          <AnimatePresence>
            {isAnsweredName.length > 0 ? (
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6 }}
                exit={{ opacity: 0, y: -50 }}
                key={1}
                className="h-9 absolute w-48 justify-end right-10 flex items-center text-xl"
              >
                {item.name
                  .split("|")[1]
                  .trim()
                  .split("(")[0]
                  .trim()
                  .replace(/&#39/g, "'")}
              </motion.p>
            ) : (
              <motion.input
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.code === "Enter") {
                    handleCheckName();
                  }
                }}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6 }}
                exit={{ opacity: 0, y: 50 }}
                key={2}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNameValue(e.target.value);
                }}
                value={nameValue}
                placeholder="e.g. fire serpent"
                className="bg-[#0C1115] absolute right-10 text-base border-[1px] border-transparent focus:border-gray-200/30 rounded-lg h-9 w-48 outline-none px-2"
              ></motion.input>
            )}
          </AnimatePresence>
          <motion.button
            style={{
              backgroundColor:
                isAnsweredName === "right"
                  ? "#16a34a"
                  : isAnsweredName === "wrong"
                  ? "#dc2626"
                  : "",
            }}
            disabled={isAnsweredName.length > 0}
            onClick={handleCheckName}
            whileTap={{ scale: 0.7 }}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-yellow-600"
          >
            {isAnsweredName === "right" ? (
              <BsCheck />
            ) : isAnsweredName === "wrong" ? (
              <MdClose />
            ) : (
              <RxCrosshair2 className="p-0.5" />
            )}
          </motion.button>
        </div>
      </div>
      <div className="flex gap-2 w-[550px] text-2xl items-center justify-between">
        <h3 className="flex gap-1 items-center">
          Price
          <AiFillQuestionCircle className="w-6 h-6" />
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
                className="flex items-center absolute right-10 h-9 text-xl"
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
                  placeholder="e.g. 10"
                  className="bg-[#0C1115] text-base pr-12 border-[1px] border-transparent  focus:border-gray-200/30 rounded-lg h-9 w-48 outline-none px-2"
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
              <RxCrosshair2 className="p-0.5" />
            )}
          </motion.button>
        </div>
      </div>
      <div className="flex gap-2 w-[550px] text-2xl items-center justify-between">
        <h3 className="flex gap-1 items-center">
          Condition
          <AiFillQuestionCircle className="w-6 h-6" />
        </h3>
        <div className="flex gap-2 h-9 relative w-full justify-end items-center">
          <AnimatePresence>
            {isAnsweredCondition.length > 0 ? (
              <motion.p
                key={1}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6 }}
                exit={{ opacity: 0, y: -50 }}
                className="h-9 absolute right-10 flex items-center text-xl"
              >
                {item.name
                  .split("|")[1]
                  .trim()
                  .split("(")[1]
                  .trim()
                  .substring(
                    0,
                    item.name.split("|")[1].trim().split("(")[1].trim().length -
                      1
                  )}
              </motion.p>
            ) : (
              <motion.input
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.code === "Enter") {
                    handleCheckCondition();
                  }
                }}
                key={2}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6 }}
                exit={{ opacity: 0, y: 50 }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setConditionValue(e.target.value);
                }}
                value={conditionValue}
                placeholder="e.g. factory new"
                className="bg-[#0C1115] absolute right-10 text-base pr-12 border-[1px] border-transparent  focus:border-gray-200/30 rounded-lg h-9 w-48 outline-none px-2"
              ></motion.input>
            )}
          </AnimatePresence>
          <motion.button
            style={{
              backgroundColor:
                isAnsweredCondition === "right"
                  ? "#16a34a"
                  : isAnsweredCondition === "wrong"
                  ? "#dc2626"
                  : "",
            }}
            disabled={isAnsweredCondition.length > 0}
            onClick={handleCheckCondition}
            whileTap={{ scale: 0.7 }}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-yellow-600"
          >
            {isAnsweredCondition === "right" ? (
              <BsCheck />
            ) : isAnsweredCondition === "wrong" ? (
              <MdClose />
            ) : (
              <RxCrosshair2 className="p-0.5" />
            )}
          </motion.button>
        </div>
      </div>

      <BottomPanel
        setCurrentRound={setCurrentRound}
        index={index}
      />
      <div
        style={{ backgroundColor: "#" + item.rarity_color }}
        className="absolute top-0 left-0 w-full flex items-center px-10 justify-between h-20 rounded-t-2xl"
      >
        <span className=" text-2xl text-gray-100">
          Round {currentRound + 1}/{seed.length}
        </span>
        <span className=" text-2xl text-gray-100">Score: {score}</span>
      </div>
    </div>
  );
};

export default GameBoard;
