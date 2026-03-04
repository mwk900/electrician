import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { themeScript } from "@/lib/theme";
import HangingBulb from "@/components/BulbToggle";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "600"],
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
        className={`${bebasNeue.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      >
        <HangingBulb />
        {children}
      </body>
    </html>
  );
}
