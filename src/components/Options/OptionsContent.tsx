import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Listbox } from "@headlessui/react";
import { Money } from "@/types/Money";
import { BiChevronDown } from "react-icons/bi";
import { useVolume } from "@/context/context";
import { Howl } from "howler";
const OptionsContent = ({
  selectedOptionIndex,
  setIsBackgroundEnabled,
}: {
  selectedOptionIndex: number;
  setIsBackgroundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { contextVolume, changeVolume, contextMusicVolume, changeMusicVolume } =
    useVolume();

  const moneyOptions: Money[] = [
    {
      id: 0,
      amount: 2000,
    },
    {
      id: 1,
      amount: 4000,
    },
    {
      id: 2,
      amount: 6000,
    },
    {
      id: 3,
      amount: 8000,
    },
    {
      id: 4,
      amount: 10000,
    },
  ];
  const hintsOptions = ["Enabled", "Disabled"];
  const priceGuessOptions = ["Enabled", "Disabled"];
  const conditionGuessOptions = ["Enabled", "Disabled"];
  const backgroundVideo = ["Enabled", "Disabled"];

  const [selectedPriceGuess, setSelectedPriceGuess] = useState(
    priceGuessOptions[0]
  );
  const [backgroundVideoOption, setBackgroundVideoOption] = useState(
    backgroundVideo[0]
  );
  const [selectedConditionGuess, setSelectedConditionGuess] = useState(
    conditionGuessOptions[0]
  );
  const [selectedHintsOption, setSelectedHintsOption] = useState(
    hintsOptions[0]
  );

  const [selectedMoneyOption, setSelectedMoneyOption] = useState(
    moneyOptions[3]
  );
  useEffect(() => {
    const localStorageVolume = window.localStorage.getItem("volume");
    if (localStorageVolume) {
      changeVolume(parseFloat(localStorageVolume));
    } else {
      changeVolume(0.5);
      window.localStorage.setItem("volume", "0.5");
    }

    const localStorageMusicVolume = window.localStorage.getItem("musicVolume");
    if (localStorageMusicVolume) {
      changeMusicVolume(parseFloat(localStorageMusicVolume));
    } else {
      changeMusicVolume(0.5);
      window.localStorage.setItem("musicVolume", "0.5");
    }
    const localStorageHintsOptions = window.localStorage.getItem(
      "selectedHintsOption"
    );
    if (localStorageHintsOptions) {
      setSelectedHintsOption(
        localStorageHintsOptions === "Enabled"
          ? hintsOptions[0]
          : hintsOptions[1]
      );
    }
    const localStoragePriceGuess =
      window.localStorage.getItem("selectedPriceGuess");
    if (localStoragePriceGuess) {
      setSelectedPriceGuess(
        localStoragePriceGuess === "Enabled"
          ? priceGuessOptions[0]
          : priceGuessOptions[1]
      );
    }
    const localStorageConditionGuess = window.localStorage.getItem(
      "selectedConditionGuess"
    );
    if (localStorageConditionGuess) {
      setSelectedConditionGuess(
        localStorageConditionGuess === "Enabled"
          ? conditionGuessOptions[0]
          : conditionGuessOptions[1]
      );
    }

    const localStorageBackgroundOption = window.localStorage.getItem(
      "backgroundVideoOption"
    );
    if (localStorageBackgroundOption) {
      setBackgroundVideoOption(
        localStorageBackgroundOption === "Enabled"
          ? backgroundVideo[0]
          : backgroundVideo[1]
      );
    }
    const localStorageMoneyOption = window.localStorage.getItem(
      "selectedMoneyOption"
    );
    if (localStorageMoneyOption) {
      setSelectedMoneyOption(moneyOptions[parseInt(localStorageMoneyOption)]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("musicVolume", contextMusicVolume.toString());
    window.localStorage.setItem("volume", contextVolume.toString());
    window.localStorage.setItem(
      "selectedMoneyOption",
      selectedMoneyOption.id.toString()
    );
    window.localStorage.setItem("selectedHintsOption", selectedHintsOption);
    window.localStorage.setItem("selectedPriceGuess", selectedPriceGuess);
    window.localStorage.setItem(
      "selectedConditionGuess",
      selectedConditionGuess
    );
    window.localStorage.setItem("backgroundVideoOption", backgroundVideoOption);
    setIsBackgroundEnabled(backgroundVideoOption === "Enabled" ? true : false);
  }, [
    contextMusicVolume,
    contextVolume,
    selectedMoneyOption,
    selectedHintsOption,
    selectedPriceGuess,
    selectedConditionGuess,
    backgroundVideoOption,
  ]);

  const hoverSound = new Howl({
    src: "./hover.mp3",
    html5: true,
    volume: contextVolume,
  });

  return (
    <div className="flex flex-col gap-8 pb-8 md:gap-12">
      {selectedOptionIndex === 0 ? (
        <>
          <h4 className="text-lg font-semibold md:text-2xl">Game</h4>
          <ul className="flex flex-col gap-5 text-sm font-medium md:text-lg">
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Starting money</p>
              <div className="relative">
                <Listbox
                  value={selectedMoneyOption}
                  onChange={setSelectedMoneyOption}
                >
                  <Listbox.Button className="flex items-center justify-end px-2 rounded-lg outline-none md:text-lg h-9">
                    {selectedMoneyOption.amount}
                    <BiChevronDown className="text-xl" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute right-0 z-40 flex flex-col items-start text-base font-medium bg-gradient-to-r from-gray-950 to-gray-900 rounded-xl top-9">
                    {moneyOptions.map((option, index) => (
                      <Listbox.Option
                        className="z-40 w-full px-4 py-3 cursor-pointer hover:bg-gray-800 first:rounded-t-xl last:rounded-b-xl"
                        key={index}
                        value={option}
                      >
                        {({ selected }) => (
                          <span
                            className={`${
                              selected ? "text-white" : "text-gray-200"
                            } flex items-center`}
                          >
                            {option.amount}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </div>
            </li>
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Hints</p>
              <div className="relative">
                <Listbox
                  value={selectedHintsOption}
                  onChange={setSelectedHintsOption}
                >
                  <Listbox.Button className="flex items-center justify-end px-2 rounded-lg outline-none md:text-lg h-9">
                    {selectedHintsOption}
                    <BiChevronDown className="text-xl" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute right-0 z-40 flex flex-col items-start text-base font-medium bg-gradient-to-r from-gray-950 to-gray-900 rounded-xl top-9">
                    {hintsOptions.map((option, index) => (
                      <Listbox.Option
                        className="z-40 w-full px-4 py-3 cursor-pointer hover:bg-gray-800 first:rounded-t-xl last:rounded-b-xl"
                        key={index}
                        value={option}
                      >
                        {({ selected }) => (
                          <span
                            className={`${
                              selected ? "text-white" : "text-gray-200"
                            } flex items-center`}
                          >
                            {option}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </div>
            </li>
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Price guess</p>
              <div className="relative">
                <Listbox
                  value={selectedPriceGuess}
                  onChange={setSelectedPriceGuess}
                >
                  <Listbox.Button className="flex items-center justify-end px-2 rounded-lg outline-none md:text-lg h-9">
                    {selectedPriceGuess}
                    <BiChevronDown className="text-xl" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute right-0 z-40 flex flex-col items-start text-base font-medium bg-gradient-to-r from-gray-950 to-gray-900 rounded-xl top-9">
                    {priceGuessOptions.map((option, index) => (
                      <Listbox.Option
                        className="z-40 w-full px-4 py-3 cursor-pointer hover:bg-gray-800 first:rounded-t-xl last:rounded-b-xl"
                        key={index}
                        value={option}
                      >
                        {({ selected }) => (
                          <span
                            className={`${
                              selected ? "text-white" : "text-gray-200"
                            } flex items-center`}
                          >
                            {option}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </div>
            </li>
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Condition guess</p>
              <div className="relative">
                <Listbox
                  value={selectedConditionGuess}
                  onChange={setSelectedConditionGuess}
                >
                  <Listbox.Button className="flex items-center justify-end px-2 rounded-lg outline-none md:text-lg h-9">
                    {selectedConditionGuess}
                    <BiChevronDown className="text-xl" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute right-0 z-40 flex flex-col items-start text-base font-medium bg-gradient-to-r from-gray-950 to-gray-900 rounded-xl top-9">
                    {conditionGuessOptions.map((option, index) => (
                      <Listbox.Option
                        className="z-40 w-full px-4 py-3 cursor-pointer hover:bg-gray-800 first:rounded-t-xl last:rounded-b-xl"
                        key={index}
                        value={option}
                      >
                        {({ selected }) => (
                          <span
                            className={`${
                              selected ? "text-white" : "text-gray-200"
                            } flex items-center`}
                          >
                            {option}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </div>
            </li>
          </ul>
        </>
      ) : selectedOptionIndex === 1 ? (
        <>
          <h4 className="text-lg font-semibold md:text-2xl">Sound</h4>
          <ul className="flex flex-col gap-5 text-sm font-medium md:text-lg">
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Effects</p>
              <div className="flex items-center w-1/2 gap-6">
                <Slider
                  min={0}
                  trackStyle={{ backgroundColor: "white" }}
                  railStyle={{ backgroundColor: "gray" }}
                  handleStyle={{
                    backgroundColor: "white",
                    border: "none",
                    boxShadow: "none",
                  }}
                  max={1}
                  step={0.01}
                  defaultValue={contextVolume}
                  onChange={(e) => {
                    if (typeof e === "number") {
                      changeVolume(e);
                    }
                  }}
                />
                <span className="border-2 rounded-lg border-gray-300/50 py-0.5 w-16 flex items-center justify-center text-sm font-bold">
                  {contextVolume}
                </span>
              </div>
            </li>
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Music</p>
              <div className="flex items-center w-1/2 gap-6">
                <Slider
                  min={0}
                  trackStyle={{ backgroundColor: "white" }}
                  railStyle={{ backgroundColor: "gray" }}
                  handleStyle={{
                    backgroundColor: "white",
                    border: "none",
                    boxShadow: "none",
                  }}
                  max={1}
                  step={0.01}
                  defaultValue={contextMusicVolume}
                  onChange={(e) => {
                    if (typeof e === "number") {
                      changeMusicVolume(e);
                    }
                  }}
                />
                <span className="border-2 rounded-lg border-gray-300/50 py-0.5 w-16 flex items-center justify-center text-sm font-bold">
                  {contextMusicVolume}
                </span>
              </div>
            </li>
          </ul>
        </>
      ) : (
        <>
          <h4 className="text-lg font-semibold md:text-2xl">Video</h4>
          <ul className="flex flex-col gap-5 text-sm font-medium md:text-lg">
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Background video</p>
              <div className="relative">
                <Listbox
                  value={backgroundVideoOption}
                  onChange={setBackgroundVideoOption}
                >
                  <Listbox.Button className="flex items-center justify-end px-2 rounded-lg outline-none md:text-lg h-9">
                    {backgroundVideoOption}
                    <BiChevronDown className="text-xl" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute right-0 z-40 flex flex-col items-start text-base font-medium bg-gradient-to-r from-gray-950 to-gray-900 rounded-xl top-9">
                    {backgroundVideo.map((option, index) => (
                      <Listbox.Option
                        className="z-40 w-full px-4 py-3 cursor-pointer hover:bg-gray-800 first:rounded-t-xl last:rounded-b-xl"
                        key={index}
                        value={option}
                      >
                        {({ selected }) => (
                          <span
                            className={`${
                              selected ? "text-white" : "text-gray-200"
                            } flex items-center`}
                          >
                            {option}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </div>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default OptionsContent;
