import React from "react";
import { IoIosHelpBuoy } from "react-icons/io";
import { BsQuestionLg } from "react-icons/bs";

const BottomPanel = ({
  setCurrentRound,
  index,
}: {
  setCurrentRound: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}) => {
  return (
    <div className="absolute bottom-5 w-full items-center px-8 grid grid-cols-3">
      <div></div>
      <div className="flex items-center justify-center w-full gap-2">
        <button className="bg-green-700 h-10 w-10 flex items-center justify-center group rounded-xl">
          <IoIosHelpBuoy className="w-full h-full p-1 text-gray-200 group-hover:text-white duration-200" />
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
          className=" flex items-center justify-center gap-2 bottom-10 right-10 bg-gradient-to-r from-green-500 to-green-600 w-48 h-10 rounded-xl"
        >
          <span className="text-lg">Next</span>
        </button>
      </div>
    </div>
  );
};

export default BottomPanel;
