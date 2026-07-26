import { Fraunces, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Nitish Poonia — Software Developer",
    template: "%s | Nitish Poonia",
  },
  description:
    "Software developer building mobile and web products end to end — React Native and Next.js on the front, Node and PostgreSQL behind. Open to full-time roles.",
  metadataBase: new URL("https://nitishpoonia.in"),
  alternates: {
    canonical: "https://nitishpoonia.in",
  },
  openGraph: {
    title: "Nitish Poonia — Software Developer",
    description:
      "Software developer building mobile and web products end to end — React Native and Next.js on the front, Node and PostgreSQL behind. Open to full-time roles.",
    url: "https://nitishpoonia.in",
    siteName: "Nitish Poonia",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://nitishpoonia.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nitish Poonia — Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitish Poonia — Software Developer",
    description:
      "Software developer building mobile and web products end to end — React Native and Next.js on the front, Node and PostgreSQL behind. Open to full-time roles.",
    creator: "@nitishpoonia",
    images: ["https://nitishpoonia.in/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${workSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {children}
        <GoogleAnalytics gaId="G-K9ZSKF1486" />
      </body>
    </html>
  );
}
