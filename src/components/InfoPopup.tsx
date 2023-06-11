import React from "react";
import { motion, AnimatePresence } from "framer-motion";
const InfoPopup = ({
  setInfoPopupVisible,
}: {
  setInfoPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed text-white flex items-center justify-center z-50 left-0 top-0 w-full h-full bg-black/50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className=" w-11/12 bg-gray-900 max-w-5xl rounded-xl p-3 md:p-4 text-sm md:text-lg flex flex-col justify-between"
      >
        <ul className="list-disc list-inside mb-4">
          <h3 className="text-center text-lg md:text-2xl mb-4">
            Instructions of the game
          </h3>
          <li>
            The game starts with <span className="font-semibold">$8,000</span>.
          </li>
          <li>
            Each round of the game consists of three fields to guess: the skin
            name, the skin price, and the skin condition.
          </li>
          <li>
            Correctly guessing the skin name adds{" "}
            <span className="font-semibold text-green-600">$1,000</span> to your
            account, while an incorrect guess deducts{" "}
            <span className="font-semibold text-red-600">$1,000</span>.
          </li>
          <li>
            Correctly guessing the skin price adds{" "}
            <span className="font-semibold text-green-600">$1,000</span> to your
            account, while an incorrect guess deducts{" "}
            <span className="font-semibold text-red-600">$1,000</span>.
          </li>
          <li>
            Correctly guessing the skin condition adds{" "}
            <span className="font-semibold text-green-600">$750</span> to your
            account, while an incorrect guess deducts{" "}
            <span className="font-semibold text-red-600">$750</span>.
          </li>
          <li>
            At the beginning of each round, you have the option to purchase two
            hints for{" "}
            <span className="font-semibold text-yellow-600">$500</span> each.
          </li>
          <li>
            The first hint reveals the first digit of the skin price, and the
            second hint reveals the first two letters of the skin name.
          </li>
          <li>
            If your money drops below{" "}
            <span className="font-semibold text-red-600">$0</span>, the game
            ends.
          </li>
          Remember, the goal is to play as many rounds as possible by making
          correct guesses and wisely using the hints. Good luck and have fun
          playing!
        </ul>

        <button
          onClick={() => setInfoPopupVisible(false)}
          className="self-end flex shadow-md shadow-gray-400/5 hover:shadow-lg hover:shadow-gray-400/5 duration-300 font-medium items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 w-36 h-9 rounded-xl"
        >
          Got it!
        </button>
      </motion.div>
    </div>
  );
};

export default InfoPopup;
