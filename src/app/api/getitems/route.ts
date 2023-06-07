import { NextResponse } from "next/server";
type responseType = {
  name: string;
  weapon_type?: string;
  type?: string;
  rarity_color: string;
  icon_url: string;
  icon_url_large?: string;
  price?: {
    all_time?: {
      average?: number;
    };
  };
};
export async function GET() {
  const response = await fetch("http://csgobackpack.net/api/GetItemsList/v2/");
  const data = await response.json();
  const items: responseType[] = data.items_list;
  const itemsList = [];
  for (let i in items) {
    if (
      (items[i].weapon_type?.toLowerCase() === "sniper rifle" ||
        items[i].weapon_type?.toLowerCase() === "rifle" ||
        items[i].weapon_type?.toLowerCase() === "pistol" ||
        items[i].weapon_type?.toLowerCase() === "machinegun" ||
        items[i].weapon_type?.toLowerCase() === "smg" ||
        items[i].weapon_type?.toLowerCase() === "shotgun" ||
        items[i].type?.toLowerCase() === "gloves") &&
      !items[i].name.toLowerCase().includes("stattrak™")
    ) {
      itemsList.push({
        name: items[i].name,
        rarity_color: items[i].rarity_color,
        icon_url: items[i].icon_url,
        icon_url_large: items[i].icon_url_large,
        price: items[i].price?.all_time?.average,
      });
    } else {
      continue;
    }
  }
  return NextResponse.json({ itemsList });
}
