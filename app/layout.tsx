import type { Metadata } from "next";
import { Fraunces, Inter, Work_Sans } from "next/font/google";
import "./globals.css";

// Variable font — SOFT/WONK axes applied per-element via font-variation-settings
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Justin Robinson — Design Leadership, Strategy to Execution",
  description:
    "Portfolio of enterprise design systems and circular-economy product work: Camio, Gunvor, Reyooz, BBC iPlayer, Saxo Bank, Barclays, Sedition.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${workSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
