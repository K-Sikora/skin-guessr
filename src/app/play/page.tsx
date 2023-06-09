"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import axios from "axios";
import GameBoard from "@/components/GameBoard";
import { RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";
import Link from "next/link";
import Lottie from "lottie-react";
import loading from "../../../public/loading.json";
import InfoPopup from "@/components/InfoPopup";
const musicArray = [
  "https://cf-media.sndcdn.com/jzhOR38cB0JQ.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vanpoT1IzOGNCMEpRLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjg2MjIwMzEzfX19XX0_&Signature=O~n~N-K-Ymc-uvdH89mXcPxcmf92LqZSEKpdnZdiaXqjAdg8H4aFJR1ntmQCeUrqcHje5sZpFe-P3zUwAau2wve4Tj7uEIkk3KaTrSdtoXyul6Wt-pbOBdrLBMeOFIOxmESoeU6VCyNGtAC6JhI~ob9DTTuhhFQxpCcC5bgOPEF2WqiI-Lj1iUiXdOBN8Tud0SUELZsPm7-V8tWTM6b6FJdBz7GxOlmW~uwKmotD6bj5xn8IDoy3RoK4ZlaSFA52vMixNx55GVKtoDMVjQHDZGAIdaCMKamp9-1uTuaF9XLKalN7fsJs052zCSHEjeEp89HGQTcvwYZEkAKMpZAW7Q__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
  "https://cf-media.sndcdn.com/dL8J13exDWb9.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vZEw4SjEzZXhEV2I5LjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjg2MjIwNTcyfX19XX0_&Signature=FORRJ0zV4iQjkvYi1KWHxhxSNKPSMFQkcW5o1fO-ecrP3DqkzNQ3mYglnAL6781mEZ5IgfBcwanmglFx6x64Qvj9iWfcowzyPWHyjzaDACgRaoTnsoJW8XbtMSUwYbuf8mgRtqPIshUGgy0oXrN~jBaZB3XYsCX-3zB5~aZHW3hUBDgl9ZDAHPbRQ50eXte6QeloIsmBW6xSMYq1tZni272~leT4N4teTIj3S9hf6HLMAD87pTELCEgj2TQ5RCfk5ULdpHPpc9Q-jVAVzm626NhldmMkWbKwA9tI5CWTz~CrUYSlEf3d64a~91vrSwulNHbrfXAJYYkYfSDoEIDeSA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
  "https://cf-media.sndcdn.com/1cjyFAco4OWH.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vMWNqeUZBY280T1dILjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjg2MjIwNTQ4fX19XX0_&Signature=OpYDZnrHtNWuFV6LTgoRBpjmMw52rnH5fEsLo0KQHENjN2o1~Dv7E5nHNgE3JXmUM83GRVqXQJI5EtKVTJEPXujYfnuNP~-E5f8udySasBGF2yDvn0X0sIzunGkY4K-TuBvnGwtJy56WkMDlypoURcj1lFdIvQq3LJ7Vbszy4Scf57MSdi0-D0XKm8pQPb9~UPWda5QddKGxa4sCeBVjz45yA-HuQYnKs49tjFE3ADGdhD7KX6jvQr4Pxx82-TOm0H015EwDaNzTmzLApasTnaia3u0Xhyir28jFQtXWQInjAFJm73~lvP7x7qICH4XbFQPu70wncTbYQeDi~1gdvw__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
];
const PlayPage: React.FC = () => {
  type Skin = {
    rarity_color: string;
    icon_url: string;
    icon_url_large?: string;
    name: string;
    price: number;
  };
  const [infoPopupVisible, setInfoPopupVisible] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [musicEnabled, setMusicEnabled] = useState(1);
  const [seed, setSeed] = useState<Skin[]>([]);
  const [score, setScore] = useState(16000);
  const [currentRound, setCurrentRound] = useState(0);
  const getItems = async () => {
    try {
      const response = await axios.get("/api/getitems");

      let newSeed = seed;

      for (let i = 0; i < 100; i++) {
        const randomIndex = Math.floor(
          Math.random() * response.data.itemsList.length
        );

        newSeed = newSeed.concat(response.data.itemsList[randomIndex]);
      }

      setSeed(newSeed);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  const { isLoading } = useQuery({
    queryKey: "items",
    queryFn: getItems,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (seed.length > 0) {
      console.log(seed);
    }
  }, [seed]);
  // get item first
  useEffect(() => {
    const storedBestScore = localStorage.getItem("bestScore");
    if (storedBestScore === null) {
      setBestScore(0);
    } else {
      setBestScore(parseInt(storedBestScore));
    }
    console.log(bestScore);
    if (bestScore !== null && currentRound > bestScore) {
      window.localStorage.setItem("bestScore", currentRound.toString());
    }
  }, [currentRound]);

  return (
    <div className="w-full h-screen flex items-center justify-center relative container-bg ">
      {isLoading ? (
        <div className="rounded-2xl text-center text-2xl text-white w-3/4 h-[500px] flex items-center gap-6 justify-center flex-col bg-[#0C1115]/70 backdrop-blur-sm">
          Generating seed for your game...
          <div className="w-40 h-40 ">
            <Lottie
              animationData={loading}
              loop={true}
            />
          </div>
        </div>
      ) : (
        <div className="relative flex-col overflow-x-hidden flex h-full w-full items-center justify-center">
          {seed.map((item, index) => (
            <div
              className="w-full h-full absolute"
              key={index}
            >
              <AnimatePresence>
                {currentRound === index && (
                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 2000 }}
                    transition={{ duration: 0.7 }}
                    exit={{ opacity: 0, x: -2000 }}
                    className="text-white relative z-20 h-full w-full flex items-center justify-center "
                  >
                    {score >= 0 ? (
                      <GameBoard
                        seed={seed}
                        score={score}
                        setScore={setScore}
                        item={item}
                        index={index}
                        currentRound={currentRound}
                        setCurrentRound={setCurrentRound}
                        setInfoPopupVisible={setInfoPopupVisible}
                        musicEnabled={musicEnabled}
                      />
                    ) : (
                      <div className="rounded-2xl w-10/12 h-[500px]  flex items-center gap-6 justify-center flex-col bg-[#0C1115]/70 backdrop-blur-sm">
                        <h2 className="text-4xl text-red-400 font-bold">
                          You lost!
                        </h2>
                        <h3 className="text-2xl">
                          Your best result is round{" "}
                          {bestScore !== null && currentRound > bestScore
                            ? currentRound
                            : bestScore}
                          .
                        </h3>
                        <div className="flex flex-col md:flex-row gap-4">
                          <Link href="/">
                            <button className="flex shadow-md shadow-gray-400/5 hover:shadow-lg hover:shadow-gray-400/5 duration-300 font-semibold text-lg items-center justify-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 w-36 h-9 rounded-xl">
                              Title screen
                            </button>
                          </Link>
                          <button
                            onClick={() => {
                              window.location.reload();
                            }}
                            className="flex shadow-md shadow-gray-400/5 hover:shadow-lg hover:shadow-gray-400/5 duration-300 font-semibold text-lg items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 w-36 h-9 rounded-xl"
                          >
                            Play again
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <button
            onClick={() => setMusicEnabled(musicEnabled === 0 ? 1 : 0)}
            className="absolute flex items-center justify-center left-6 bottom-6 z-20 w-12 h-12 bg-gray-900 rounded-xl"
          >
            {musicEnabled > 0 ? (
              <RxSpeakerLoud className="text-white w-full h-full p-3" />
            ) : (
              <RxSpeakerOff className="text-white w-full h-full p-3" />
            )}
          </button>
          <AnimatePresence>
            {infoPopupVisible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0 }}
                className="z-50"
              >
                <InfoPopup setInfoPopupVisible={setInfoPopupVisible} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default PlayPage;
