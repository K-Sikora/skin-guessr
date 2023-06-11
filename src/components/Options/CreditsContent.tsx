import Link from "next/link";
import React from "react";
import { Howl } from "howler";
import { useVolume } from "@/context/context";
const CreditsContent = ({
  selectedCreditIndex,
}: {
  selectedCreditIndex: number;
}) => {
  const { contextVolume } = useVolume();
  const hoverSound = new Howl({
    src: "./hover.mp3",
    html5: true,
    volume: contextVolume,
  });
  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-8">
      {selectedCreditIndex === 0 ? (
        <>
          <h4 className="text-lg md:text-2xl font-semibold">API</h4>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Name</p>
              <p>Csgobackpack</p>
            </li>
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Author</p>
              <p>Only</p>
            </li>
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Link</p>
              <Link href="https://csgobackpack.net/api/">
                csgobackpack.net/api
              </Link>
            </li>
          </ul>
        </>
      ) : selectedCreditIndex === 1 ? (
        <>
          <h4 className="md:text-2xl font-semibold">Graphic elements</h4>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Background video</p>
              <p className="hidden md:block">
                Wild Lotus [CSGO CGI Short Film]
              </p>
              <p className="block md:hidden">Wild Lotus</p>
            </li>
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Author</p>
              <p>PoPw0w</p>
            </li>
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Link</p>
              <Link href="https://youtu.be/lBb7tv6CEMU">YouTube</Link>
            </li>
          </ul>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Background image</p>
              <p>AI generated</p>
            </li>

            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Link</p>
              <Link href="/bg.jpg">bg.jpg</Link>
            </li>
          </ul>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Menu font</p>
              <p>Counter-Strike</p>
            </li>
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Authors</p>
              <p>Valve</p>
            </li>

            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Link</p>
              <Link href="https://www.dafont.com/counter-strike.font">
                dafont.com
              </Link>
            </li>
          </ul>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>App font</p>
              <p>DIN</p>
            </li>
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Author</p>
              <p>Albert-Jan Pool</p>
            </li>

            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Link</p>
              <Link href="https://betterstudio.com/fonts/steam-font/">
                betterstudio.com
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <h4 className="md:text-2xl font-semibold">Audio elements</h4>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Music</p>
              <p>Crystals, CS:GO Soundtrack</p>
            </li>
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Authors</p>
              <p>M.O.O.N., Valve</p>
            </li>
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Link</p>

              <p>
                <Link href="https://www.youtube.com/watch?v=QXkSYSPTpj4">
                  Crystals
                </Link>
                ,{" "}
                <Link href="https://www.youtube.com/playlist?list=PL18EB738386659D78">
                  CS:GO Soundtrack
                </Link>
              </p>
            </li>
          </ul>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Menu sounds</p>
              <p>Counter-Strike 2</p>
            </li>
          </ul>

          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li
              onMouseEnter={() => {
                hoverSound.play();
              }}
              className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center"
            >
              <p>Game sounds</p>
              <p>CS:GO</p>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default CreditsContent;
