import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crystals",
  description: "Sparkle your spirit with our enchanting crystals!",
};

import { Toaster } from "@/components/ui/toaster";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <div className="w-full h-full">
            {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
