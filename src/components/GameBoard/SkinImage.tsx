import React from "react";
import Image from "next/image";
import { Skin } from "@/types/Skin";
const SkinImage = ({ item }: { item: Skin }) => {
  return (
    <div className="flex h-[40%] justify-center">
      <Image
        className="object-contain pointer-events-none"
        alt="skin image"
        src={`https://community.cloudflare.steamstatic.com/economy/image/${
          item.icon_url_large ? item.icon_url_large : item.icon_url
        }`}
        width={500}
        height={500}
      ></Image>
    </div>
  );
};

export default SkinImage;
