import React from "react";

const OptionsContent = ({
  selectedOptionIndex,
}: {
  selectedOptionIndex: number;
}) => {
  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-8">
      {selectedOptionIndex === 0 ? (
        <>
          <h4 className="text-lg md:text-2xl font-semibold">Game</h4>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Starting money</p>
              <p>2k 4k 8k 10k 12k</p>
            </li>
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Hints</p>
              <p>off/on</p>
            </li>
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Price guess</p>
              <p>Enabled</p>
            </li>
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Condition guess</p>
              <p>Enabled</p>
            </li>
          </ul>
        </>
      ) : selectedOptionIndex === 1 ? (
        <>
          <h4 className="text-lg md:text-2xl font-semibold">Sound</h4>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Effects</p>
              <p>vol slider</p>
            </li>
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Music</p>
              <p>vol slider</p>
            </li>
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Disable all</p>
              <p>on/off</p>
            </li>
          </ul>
        </>
      ) : (
        <>
          <h4 className="text-lg md:text-2xl font-semibold">Video</h4>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Background video</p>
              <p>on/off</p>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default OptionsContent;
