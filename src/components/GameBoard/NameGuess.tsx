import React, { useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { Howl } from "howler";
import { Skin } from "@/types/SkinType";
import { motion, AnimatePresence } from "framer-motion";
import { BsCheck } from "react-icons/bs";
import { RxCrosshair2 } from "react-icons/rx";
import { MdClose } from "react-icons/md";

import distance from "jaro-winkler";
import { useVolume } from "@/context/context";
const NameGuess = ({
  item,
  nameValue,
  setNameValue,
  setScore,
  isAnsweredName,
  setIsAnsweredName,
  hint,
}: {
  item: Skin;
  nameValue: string;
  setNameValue: React.Dispatch<React.SetStateAction<string>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  isAnsweredName: string;
  setIsAnsweredName: React.Dispatch<React.SetStateAction<string>>;
  hint: string;
}) => {
  const { contextVolume } = useVolume();

  const [isHoveredNameInfo, setIsHoveredNameInfo] = useState(false);
  const guessSound = new Howl({
    src: ["./guessSound.mp3"],
    html5: true,
    preload: true,
    volume: contextVolume,
  });
  const handleCheckName = () => {
    if (nameValue.length > 0) {
      guessSound.play();
      const modifiedNameValue = nameValue.replace(/&#39s/g, "'");
      const onlyName: string = item.name
        .split("|")[1]
        .trim()
        .split("(")[0]
        .trim();
      if (
        distance(onlyName.toLowerCase(), modifiedNameValue.toLowerCase()) > 0.88
      ) {
        setScore((prev) => prev + 1000);
        setIsAnsweredName("right");
      } else {
        setIsAnsweredName("wrong");
        setScore((prev) => prev - 1000);
      }
    }
  };
  return (
    <div className="flex gap-2 text-base md:text-2xl items-center w-full px-4 md:px-0 md:w-[550px]  justify-between">
      <h3 className="flex gap-1 items-center">
        <span className="hidden md:block">
          {item.name.split("|")[0].trim()}
        </span>
        <div className="relative">
          <AiFillQuestionCircle
            onMouseOver={() => {
              setIsHoveredNameInfo(true);
            }}
            onMouseLeave={() => {
              setIsHoveredNameInfo(false);
            }}
            className="w-6 h-6"
          />
          <AnimatePresence>
            {isHoveredNameInfo && (
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
                  . Your guess has a slight margin of error (0.88) in the
                  Jaro-Winkler distance. If the distance exceeds this threshold,
                  it will be considered incorrect.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
              className="h-9 absolute w-48 justify-end right-10 flex items-center text-base md:text-xl"
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
              placeholder={hint.length > 0 ? hint : "e.g. safari mesh"}
              className="bg-[#0C1115] absolute right-10 text-sm md:text-base border-[1px] border-transparent focus:border-gray-200/30 rounded-lg h-9 w-32 md:w-48 outline-none px-2"
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
            <RxCrosshair2 className="md:p-0.5" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default NameGuess;
