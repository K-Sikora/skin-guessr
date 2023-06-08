import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
