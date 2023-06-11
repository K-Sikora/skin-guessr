import Link from "next/link";
import React from "react";

const CreditsContent = ({
  selectedCreditIndex,
}: {
  selectedCreditIndex: number;
}) => {
  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-8">
      {selectedCreditIndex === 0 ? (
        <>
          <h4 className="text-lg md:text-2xl font-semibold">API</h4>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Name</p>
              <p>Csgobackpack</p>
            </li>
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Author</p>
              <p>Only</p>
            </li>
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Link</p>
              <Link href="https://csgobackpack.net/api/">
                csgobackpack.net/api
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <h4 className="md:text-2xl font-semibold">Graphic elements</h4>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Background video</p>
              <p className="hidden md:block">
                Wild Lotus [CSGO CGI Short Film]
              </p>
              <p className="block md:hidden">Wild Lotus</p>
            </li>
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Author</p>
              <p>PoPw0w</p>
            </li>
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Link</p>
              <Link href="https://youtu.be/lBb7tv6CEMU">YouTube</Link>
            </li>
          </ul>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Background image</p>
              <p>AI generated</p>
            </li>

            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Link</p>
              <Link href="/bg.jpg">bg.jpg</Link>
            </li>
          </ul>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Menu font</p>
              <p>Counter-Strike</p>
            </li>
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Authors</p>
              <p>Valve</p>
            </li>

            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Link</p>
              <Link href="https://www.dafont.com/counter-strike.font">
                dafont.com
              </Link>
            </li>
          </ul>
          <ul className="flex text-sm md:text-lg font-medium flex-col gap-5">
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>App font</p>
              <p>DIN</p>
            </li>
            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Author</p>
              <p>Albert-Jan Pool</p>
            </li>

            <li className="border-b-[1px] last:border-none py-2 border-gray-300/30 flex w-full justify-between items-center">
              <p>Link</p>
              <Link href="https://betterstudio.com/fonts/steam-font/">
                betterstudio.com
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default CreditsContent;
