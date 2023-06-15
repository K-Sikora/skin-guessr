import React, { useState } from "react";
import BottomPanel from "./GameBoard/BottomPanel";
import { Skin } from "@/types/SkinType";
import SkinImage from "./GameBoard/SkinImage";
import NameGuess from "./GameBoard/NameGuess";
import ConditionGuess from "./GameBoard/ConditionGuess";
import PriceGuess from "./GameBoard/PriceGuess";

const GameBoard = ({
  currentRound,
  setCurrentRound,
  item,
  score,
  setScore,
  setInfoPopupVisible,
  hintsEnabled,
  priceGuessEnabled,
  conditionGuessEnabled,
}: {
  currentRound: number;
  setCurrentRound: React.Dispatch<React.SetStateAction<number>>;
  item: Skin;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setInfoPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  hintsEnabled: boolean;
  priceGuessEnabled: boolean;
  conditionGuessEnabled: boolean;
}) => {
  const [hint, setHint] = useState("");
  const [priceHint, setPriceHint] = useState("");
  const [isAnsweredName, setIsAnsweredName] = useState("");
  const [isAnsweredCondition, setIsAnsweredCondition] = useState("");
  const [isAnsweredPrice, setIsAnsweredPrice] = useState("");
  const [nameValue, setNameValue] = useState("");

  const handleShowHint = () => {
    const itemName = item.name.split("|")[1].trim().split("(")[0].trim();
    const twoLetters = itemName.slice(0, 2);
    setHint(twoLetters + "...");
    setScore(score - 500);
  };
  const handleShowPriceHint = () => {
    setPriceHint(item.price.toString().charAt(0));
    setScore(score - 500);
  };

  return (
    <div className="rounded-2xl relative w-11/12 max-w-6xl h-full flex pt-16 items-center gap-6 justify-start flex-col bg-[#0C1115]/70 backdrop-blur-sm">
      <SkinImage item={item} />
      <NameGuess
        item={item}
        nameValue={nameValue}
        setNameValue={setNameValue}
        setScore={setScore}
        isAnsweredName={isAnsweredName}
        setIsAnsweredName={setIsAnsweredName}
        hint={hint}
      />

      {conditionGuessEnabled && (
        <ConditionGuess
          item={item}
          setScore={setScore}
          setIsAnsweredCondition={setIsAnsweredCondition}
          isAnsweredCondition={isAnsweredCondition}
          conditionGuessEnabled={conditionGuessEnabled}
        />
      )}
      {priceGuessEnabled && (
        <PriceGuess
          item={item}
          priceGuessEnabled={priceGuessEnabled}
          setScore={setScore}
          setIsAnsweredPrice={setIsAnsweredPrice}
          isAnsweredPrice={isAnsweredPrice}
          priceHint={priceHint}
        />
      )}

      <BottomPanel
        setScore={setScore}
        setCurrentRound={setCurrentRound}
        handleShowHint={handleShowHint}
        handleShowPriceHint={handleShowPriceHint}
        isAnsweredName={isAnsweredName}
        isAnsweredCondition={isAnsweredCondition}
        isAnsweredPrice={isAnsweredPrice}
        rarity_color={item.rarity_color}
        setInfoPopupVisible={setInfoPopupVisible}
        hintsEnabled={hintsEnabled}
        priceGuessEnabled={priceGuessEnabled}
        conditionGuessEnabled={conditionGuessEnabled}
      />
      <div
        style={{ backgroundColor: "#" + item.rarity_color }}
        className="absolute top-0 left-0 w-full flex items-center px-4 md:px-10 justify-between h-16 rounded-t-2xl"
      >
        <span className="font-medium text-xl md:text-2xl text-gray-100">
          Round {currentRound + 1}
        </span>
        <span className="font-medium text-xl md:text-2xl text-gray-100">
          Money: ${score}
        </span>
      </div>
    </div>
  );
};

export default GameBoard;
