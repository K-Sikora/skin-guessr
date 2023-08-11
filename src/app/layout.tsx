import "./globals.css";
import { VolumeProvider } from "@/context/context";
import DIN from "next/font/local";

export const metadata = {
  title: "Skin Guessr",
  description: "Skin Guessr game",
};
const din = DIN({
  src: [
    {
      path: "./fonts/DIN.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/DIN-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/DINBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/DIN-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={din.className}>
        <VolumeProvider>{children}</VolumeProvider>
      </body>
    </html>
  );
}
