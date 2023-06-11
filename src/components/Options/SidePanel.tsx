import React from "react";
import { AiFillPlayCircle, AiFillSetting } from "react-icons/ai";
import { MdCancel, MdInfo } from "react-icons/md";
import Link from "next/link";
import { Howl } from "howler";
const SidePanel = ({
  selectedCategoryIndex,
  setSelectedCategoryIndex,
  setOptionsVisible,
}: {
  selectedCategoryIndex: number;
  setSelectedCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const clickSound2 = new Howl({
    src: "./click2.mp3",
    html5: true,
  });

  return (
    <div className="w-20 md:w-32 flex flex-col items-center justify-start backdrop-blur-xl border-r-[1px] border-gray-300/30">
      <div className="h-20 w-full flex items-center justify-center border-b-[1px] border-gray-300/50 ">
        <img
          onClick={() => {
            setOptionsVisible(false);
            clickSound2.play();
          }}
          src="./logo.svg"
          className="h-full p-1.5 md:p-3 cursor-pointer"
        ></img>
      </div>
      <ul className="flex flex-col items-center mt-7 gap-10">
        <Link href="/play">
          <li
            onClick={() => {
              clickSound2.play();
            }}
            className="flex hover:text-gray-500 duration-200 items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full cursor-pointer"
          >
            <AiFillPlayCircle className="w-full h-full" />
          </li>
        </Link>
        <li
          onClick={() => {
            setSelectedCategoryIndex(0);
            clickSound2.play();
          }}
          className="flex items-center justify-center w-6 md:w-8 h-6 md:h-8 rounded-full cursor-pointer hover:text-gray-500 duration-200"
        >
          <AiFillSetting
            style={{ color: selectedCategoryIndex === 0 ? "#6b7280" : "" }}
            className="w-full h-full"
          />
        </li>
        <li
          onClick={() => {
            setSelectedCategoryIndex(1);
            clickSound2.play();
          }}
          className="flex items-center justify-center w-6 md:w-8 h-6 md:h-8 rounded-full cursor-pointer hover:text-gray-500 duration-200"
        >
          <MdInfo
            style={{ color: selectedCategoryIndex === 1 ? "#6b7280" : "" }}
            className="w-full h-full"
          />
        </li>
        <li
          onClick={() => {
            setOptionsVisible(false);
            clickSound2.play();
          }}
          className="flex items-center justify-center w-6 md:w-8 h-6 md:h-8 rounded-full cursor-pointer hover:text-gray-500 duration-200"
        >
          <MdCancel className="w-full h-full" />
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;
