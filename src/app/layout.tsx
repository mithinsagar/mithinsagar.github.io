import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/chrome/SmoothScroll";
import CustomCursor from "@/components/chrome/CustomCursor";
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import ScrollProgress from "@/components/chrome/ScrollProgress";
import TransitionProvider from "@/components/chrome/Transition";
import { site } from "@/data/site";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Mithin Sagar — AI / ML Engineer",
    template: "%s — Mithin Sagar",
  },
  description:
    "Mithin Sagar S builds intelligent systems with machine learning, deep learning and generative AI — systems that show the evidence behind every answer.",
  keywords: [
    "Mithin Sagar",
    "AI Engineer",
    "Machine Learning Engineer",
    "Explainable AI",
    "Computer Vision",
    "Generative AI",
    "Portfolio",
  ],
  authors: [{ name: "Mithin Sagar S", url: site.github }],
  openGraph: {
    title: "Mithin Sagar — AI / ML Engineer",
    description:
      "Building intelligent systems that solve real-world problems. Machine learning, deep learning and generative AI.",
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: "Mithin Sagar",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mithin Sagar — AI / ML Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mithin Sagar — AI / ML Engineer",
    description: "Building intelligent systems that solve real-world problems.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050302",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body className="min-h-screen bg-void antialiased">
        <TransitionProvider>
          <SmoothScroll />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
          >
            Skip to content
          </a>
          <main id="main">{children}</main>
          <Footer />
        </TransitionProvider>
      </body>
    </html>
  );
}
