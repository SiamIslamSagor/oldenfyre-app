import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeContext";
import dynamic from "next/dynamic";

const FacebookPixel = dynamic(import("../components/facebook/FacebookPixel"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oldenfyre | Vintage Lighters",
  description:
    "Crafted with passion, ignited with nostalgia. Discover our collection of premium vintage lighters.",
  keywords: [
    "vintage lighters",
    "luxury lighters",
    "antique lighters",
    "premium lighters",
    "Oldenfyre",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <CustomCursor />
          <SmoothScroll>
            <FacebookPixel />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
