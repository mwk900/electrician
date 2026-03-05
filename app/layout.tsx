import type { Metadata } from "next";
import { Barlow_Condensed, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { themeScript } from "@/lib/theme";
import HangingBulb from "@/components/BulbToggle";

const barlowCondensed = Barlow_Condensed({
  weight: "900",
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arc & Line Electrical | Nottingham",
  description:
    "Clean wiring. No guesswork. Domestic, commercial, EV chargers and EICR across Nottingham and surrounding areas. Fully insured, NICEIC certified.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${barlowCondensed.variable} ${inter.variable} ${ibmPlexMono.variable}`}
      >
        <HangingBulb />
        {children}
      </body>
    </html>
  );
}
