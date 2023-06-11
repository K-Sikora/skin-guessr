import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Listbox } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { useVolume } from "@/context/context";
const OptionsContent = ({
  selectedOptionIndex,
  setIsBackgroundEnabled,
}: {
  selectedOptionIndex: number;
  setIsBackgroundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { contextVolume, changeVolume, contextMusicVolume, changeMusicVolume } =
    useVolume();
  type Money = {
    id: number;
    amount: number;
  };
  const soundOptions = ["Yes", "No"];
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
  const [selectedDisableOption, setSelectedDisabledOption] = useState(
    soundOptions[1]
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
    const localStorageDisableAll =
      window.localStorage.getItem("disableAllSound");
    if (localStorageDisableAll) {
      setSelectedDisabledOption(
        localStorageDisableAll === "No" ? soundOptions[1] : soundOptions[0]
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
  useEffect(() => {
    window.localStorage.setItem("disableAllSound", selectedDisableOption);
  }, [selectedDisableOption]);

  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-8">
      {selectedOptionIndex === 0 ? (
        <>
          <h4 className="text-lg md:text-2xl font-semibold">Game</h4>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Starting money</p>
              <div className="relative">
                <Listbox
                  value={selectedMoneyOption}
                  onChange={setSelectedMoneyOption}
                >
                  <Listbox.Button className="md:text-lg flex items-center justify-end rounded-lg  h-9 outline-none px-2">
                    {selectedMoneyOption.amount}
                    <BiChevronDown className="text-xl" />
                  </Listbox.Button>
                  <Listbox.Options className="text-base font-medium flex bg-gradient-to-r from-gray-950 to-gray-900 rounded-xl items-start right-0  flex-col absolute top-9 z-40">
                    {moneyOptions.map((option, index) => (
                      <Listbox.Option
                        className="py-3 hover:bg-gray-800 w-full first:rounded-t-xl last:rounded-b-xl px-4 z-40 cursor-pointer"
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
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Hints</p>
              <div className="relative">
                <Listbox
                  value={selectedHintsOption}
                  onChange={setSelectedHintsOption}
                >
                  <Listbox.Button className="md:text-lg flex items-center justify-end rounded-lg  h-9 outline-none px-2">
                    {selectedHintsOption}
                    <BiChevronDown className="text-xl" />
                  </Listbox.Button>
                  <Listbox.Options className="text-base font-medium flex bg-gradient-to-r from-gray-950 to-gray-900 rounded-xl items-start right-0  flex-col absolute top-9 z-40">
                    {hintsOptions.map((option, index) => (
                      <Listbox.Option
                        className="py-3 hover:bg-gray-800 w-full first:rounded-t-xl last:rounded-b-xl px-4 z-40 cursor-pointer"
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
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Price guess</p>
              <div className="relative">
                <Listbox
                  value={selectedPriceGuess}
                  onChange={setSelectedPriceGuess}
                >
                  <Listbox.Button className="md:text-lg flex items-center justify-end rounded-lg  h-9 outline-none px-2">
                    {selectedPriceGuess}
                    <BiChevronDown className="text-xl" />
                  </Listbox.Button>
                  <Listbox.Options className="text-base font-medium flex bg-gradient-to-r from-gray-950 to-gray-900 rounded-xl items-start right-0  flex-col absolute top-9 z-40">
                    {priceGuessOptions.map((option, index) => (
                      <Listbox.Option
                        className="py-3 hover:bg-gray-800 w-full first:rounded-t-xl last:rounded-b-xl px-4 z-40 cursor-pointer"
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
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Condition guess</p>
              <div className="relative">
                <Listbox
                  value={selectedConditionGuess}
                  onChange={setSelectedConditionGuess}
                >
                  <Listbox.Button className="md:text-lg flex items-center justify-end rounded-lg  h-9 outline-none px-2">
                    {selectedConditionGuess}
                    <BiChevronDown className="text-xl" />
                  </Listbox.Button>
                  <Listbox.Options className="text-base font-medium flex bg-gradient-to-r from-gray-950 to-gray-900 rounded-xl items-start right-0  flex-col absolute top-9 z-40">
                    {conditionGuessOptions.map((option, index) => (
                      <Listbox.Option
                        className="py-3 hover:bg-gray-800 w-full first:rounded-t-xl last:rounded-b-xl px-4 z-40 cursor-pointer"
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
          <h4 className="text-lg md:text-2xl font-semibold">Sound</h4>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Effects</p>
              <div className="w-1/2 flex items-center gap-6">
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
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Music</p>
              <div className="w-1/2 flex items-center gap-6">
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
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Disable all</p>
              <div className="relative">
                <Listbox
                  value={selectedDisableOption}
                  onChange={setSelectedDisabledOption}
                >
                  <Listbox.Button className="md:text-lg flex items-center justify-end rounded-lg  h-9 outline-none px-2">
                    {selectedDisableOption}
                    <BiChevronDown className="text-xl" />
                  </Listbox.Button>
                  <Listbox.Options className="text-base font-medium flex bg-gradient-to-r from-gray-950 to-gray-900 rounded-xl items-start right-0  flex-col absolute top-9 z-40">
                    {soundOptions.map((option, index) => (
                      <Listbox.Option
                        className="py-3 hover:bg-gray-800 w-full first:rounded-t-xl last:rounded-b-xl px-4 z-40 cursor-pointer"
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
      ) : (
        <>
          <h4 className="text-lg md:text-2xl font-semibold">Video</h4>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Background video</p>
              <div className="relative">
                <Listbox
                  value={backgroundVideoOption}
                  onChange={setBackgroundVideoOption}
                >
                  <Listbox.Button className="md:text-lg flex items-center justify-end rounded-lg  h-9 outline-none px-2">
                    {backgroundVideoOption}
                    <BiChevronDown className="text-xl" />
                  </Listbox.Button>
                  <Listbox.Options className="text-base font-medium flex bg-gradient-to-r from-gray-950 to-gray-900 rounded-xl items-start right-0  flex-col absolute top-9 z-40">
                    {backgroundVideo.map((option, index) => (
                      <Listbox.Option
                        className="py-3 hover:bg-gray-800 w-full first:rounded-t-xl last:rounded-b-xl px-4 z-40 cursor-pointer"
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
