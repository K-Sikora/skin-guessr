import "./globals.css";
import { VolumeProvider } from "@/context/context";
export const metadata = {
  title: "Skin Guessr",
  description: "Skin Guessr game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <VolumeProvider>{children}</VolumeProvider>
      </body>
    </html>
  );
}
