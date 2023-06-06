"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import axios from "axios";
import GameBoard from "@/components/GameBoard";
import Image from "next/image";
const PlayPage: React.FC = () => {
  type Skin = {
    rarity_color: string;
    icon_url: string;
    icon_url_large?: string;
    name: string;
    price: {
      all_time: {
        average: number;
      };
    };
    classid: number;
  };
  const [seed, setSeed] = useState<Skin[]>([]);
  const [score, setScore] = useState<number>(0);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const getItems = async () => {
    try {
      const response = await axios.get("/api/getitems");
      const arrayList = [];
      for (let i in response.data.data.items_list) {
        arrayList.push(response.data.data.items_list[i]);
      }
      let newSeed = seed;

      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * arrayList.length);
        if (
          arrayList[randomIndex].name.toLowerCase().includes("sticker") ||
          arrayList[randomIndex].name.toLowerCase().includes("graffiti") ||
          arrayList[randomIndex].name.toLowerCase().includes("patch") ||
          arrayList[randomIndex].name.toLowerCase().includes("music kit") ||
          arrayList[randomIndex].name.toLowerCase().includes("pin") ||
          arrayList[randomIndex].name.toLowerCase().includes("package") ||
          arrayList[randomIndex].name.toLowerCase().includes("case") ||
          arrayList[randomIndex].name.toLowerCase().includes("capsule") ||
          arrayList[randomIndex].name.toLowerCase().includes("stattrak™") ||
          arrayList[randomIndex].name.toLowerCase().includes("cmdr.") ||
          arrayList[randomIndex].name.toLowerCase().includes("mr.") ||
          !arrayList[randomIndex].name.toLowerCase().includes("|") ||
          arrayList[randomIndex].price === undefined
        ) {
          i--;
          continue;
        } else {
          newSeed = newSeed.concat(arrayList[randomIndex]);
        }
      }

      setSeed(newSeed);
      return response.data.data.items_list;
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
    <div className="w-full h-screen relative ">
      {isLoading ? (
        ""
      ) : (
        <div className="relative flex-col overflow-hidden flex h-full w-full items-center justify-center">
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
                    className=" overflow-hidden text-white relative z-20 h-full w-full flex items-center justify-center "
                  >
                    <GameBoard
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
          <Image
            src="/bg.jpg"
            width={1920}
            height={1080}
            alt=""
            className="w-full h-full absolute top-0 left-0"
          ></Image>
        </div>
      )}
    </div>
  );
};

export default PlayPage;
