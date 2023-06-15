import React, { useState } from "react";
import { AiFillQuestionCircle, AiOutlineCheck } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { BsCheck } from "react-icons/bs";
import { RxCrosshair2 } from "react-icons/rx";
import distance from "jaro-winkler";
import { Howl } from "howler";
import { BiChevronDown } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { Listbox } from "@headlessui/react";
import { Skin } from "@/types/SkinType";
import { useVolume } from "@/context/context";
const conditions = [
  "Factory New",
  "Minimal Wear",
  "Field-Tested",
  "Well-Worn",
  "Battle-Scarred",
];
const ConditionGuess = ({
  conditionGuessEnabled,
  item,
  setScore,
  setIsAnsweredCondition,
  isAnsweredCondition,
}: {
  conditionGuessEnabled: boolean;
  item: Skin;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setIsAnsweredCondition: React.Dispatch<React.SetStateAction<string>>;
  isAnsweredCondition: string;
}) => {
  const { contextVolume } = useVolume();
  const [selectedCondition, setSelectedCondition] = useState(conditions[0]);

  const guessSound = new Howl({
    src: ["./guessSound.mp3"],
    html5: true,
    preload: true,
    volume: contextVolume,
  });
  const [isHoveredConditionInfo, setIsHoveredConditionInfo] = useState(false);
  const handleCheckCondition = () => {
    if (conditionGuessEnabled) {
      guessSound.play();

      const onlyCondition = item.name.split("|")[1].trim().split("(")[1].trim();

      if (
        distance(
          selectedCondition.toLowerCase(),
          onlyCondition.substring(0, onlyCondition.length - 1).toLowerCase()
        ) > 0.92
      ) {
        setScore((prev) => prev + 750);
        setIsAnsweredCondition("right");
      } else {
        setIsAnsweredCondition("wrong");
        setScore((prev) => prev - 750);
      }
    }
  };
  return (
    <div className="flex gap-2 w-full px-4 md:px-0 md:w-[550px] text-base md:text-2xl items-center justify-between">
      <h3 className="flex gap-1 items-center">
        <span className="hidden md:block">Condition</span>
        <div className="relative">
          <AiFillQuestionCircle
            onMouseOver={() => {
              setIsHoveredConditionInfo(true);
            }}
            onMouseLeave={() => {
              setIsHoveredConditionInfo(false);
            }}
            className="w-6 h-6"
          />
          <AnimatePresence>
            {isHoveredConditionInfo && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                exit={{ y: -20, opacity: 0 }}
                className="absolute bottom-8 left-0 w-64  bg-gray-900 border-[1px] rounded-md"
              >
                <p className="text-white text-sm  p-1">
                  This guess will increase or reduce your account balance by{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "#" + item.rarity_color }}
                  >
                    $750
                  </span>
                  .
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
              className="h-9 absolute right-10 flex items-center text-base md:text-xl"
            >
              {item.name
                .split("|")[1]
                .trim()
                .split("(")[1]
                .trim()
                .substring(
                  0,
                  item.name.split("|")[1].trim().split("(")[1].trim().length - 1
                )}
            </motion.p>
          ) : (
            <Listbox
              value={selectedCondition}
              onChange={setSelectedCondition}
            >
              <Listbox.Button className="bg-[#0C1115] flex items-center justify-between absolute right-10 text-sm md:text-base rounded-lg h-9 w-32 md:w-48 outline-none px-2">
                {selectedCondition}
                <BiChevronDown />
              </Listbox.Button>
              <Listbox.Options className="bg-gray-900 text-sm md:text-base rounded-lg flex flex-col absolute top-9 right-10 w-32 md:w-48 z-40">
                {conditions.map((condition, index) => (
                  <Listbox.Option
                    className="py-2 px-1 z-40 hover:bg-gray-600 duration-100 cursor-pointer last:rounded-b-lg first:rounded-t-lg"
                    key={index}
                    value={condition}
                  >
                    {({ selected }) => (
                      <span
                        className={`${
                          selected ? "text-white" : "text-gray-200"
                        } flex items-center pl-5 relative`}
                      >
                        {selected && (
                          <div className="absolute left-0 top-0 h-full flex items-center">
                            <AiOutlineCheck />
                          </div>
                        )}
                        {condition}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
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
            <RxCrosshair2 className="md:p-0.5" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ConditionGuess;
