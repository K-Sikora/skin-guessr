import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("http://csgobackpack.net/api/GetItemsList/v2/");
  const data = await response.json();
  return NextResponse.json({ data });
}
