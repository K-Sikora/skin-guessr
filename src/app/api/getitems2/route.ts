import { NextResponse } from "next/server";
type responseType = {
  name: string;
  rarity_color: string;
  icon_url: string;
  icon_url_large?: string;
  price: {
    all_time: {
      average: number;
    };
  };
};
export async function GET() {
  const response = await fetch("http://csgobackpack.net/api/GetItemsList/v2/");
  const data = await response.json();
  const items = data.items_list;
  const itemsList = [];
  for (let i in items) {
    itemsList.push(items[i].name);
  }
  return NextResponse.json({ itemsList });
}
