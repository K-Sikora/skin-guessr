"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import axios from "axios";
import GameBoard from "@/components/GameBoard";
import { RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";

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
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [priceHintUsed, setPriceHintUsed] = useState(false);
  const [seed, setSeed] = useState<Skin[]>([]);
  const [score, setScore] = useState<number>(0);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const getItems = async () => {
    try {
      const response = await axios.get("/api/getitems");

      let newSeed = seed;

      for (let i = 0; i < 5; i++) {
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

  return (
    <div className="w-full h-screen relative container-bg ">
      {isLoading ? (
        <div className="h-screen w-full bg-black flex items-center justify-center">
          Loading...
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
                    <GameBoard
                      hintUsed={hintUsed}
                      setPriceHintUsed={setPriceHintUsed}
                      setHintUsed={setHintUsed}
                      priceHintUsed={priceHintUsed}
                      seed={seed}
                      score={score}
                      setScore={setScore}
                      item={item}
                      index={index}
                      currentRound={currentRound}
                      setCurrentRound={setCurrentRound}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <button
            onClick={() => setMusicEnabled(!musicEnabled)}
            className="absolute flex items-center justify-center left-6 bottom-6 z-20 w-12 h-12 bg-gray-900 rounded-xl"
          >
            {musicEnabled ? (
              <RxSpeakerLoud className="text-white w-full h-full p-3" />
            ) : (
              <RxSpeakerOff className="text-white w-full h-full p-3" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayPage;
