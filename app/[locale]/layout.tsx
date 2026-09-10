import type { Metadata } from "next";
import { Oswald, Manrope, JetBrains_Mono, Caveat } from "next/font/google";
import Cursor from "@/components/Cursor";
import { locales, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import "../globals.css";

// All four fonts are picked specifically because they ship a Cyrillic
// subset — the site's original fonts (Anton / Archivo / Space Mono /
// Permanent Marker) are Latin-only and would silently fall back to a
// system font for every Ukrainian headline.
const display = Oswald({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

const hand = Caveat({
  weight: "700",
  subsets: ["latin", "cyrillic"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FREEDOM INSIDE",
  description: "Freedom Inside. One cap, made properly.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  return (
    <html lang={locale}>
      <body className={`${display.variable} ${body.variable} ${mono.variable} ${hand.variable}`}>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
