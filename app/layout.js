import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const DESCRIPTION =
  "Software developer building mobile and web products end to end with React Native, Next.js, Node and PostgreSQL, now building AI systems in Python. Open to full-time roles.";

export const metadata = {
  title: {
    default: "Nitish Poonia — Software Developer",
    template: "%s | Nitish Poonia",
  },
  description:
    DESCRIPTION,
  metadataBase: new URL("https://nitishpoonia.in"),
  alternates: {
    canonical: "https://nitishpoonia.in",
  },
  openGraph: {
    title: "Nitish Poonia — Software Developer",
    description:
      DESCRIPTION,
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
      DESCRIPTION,
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
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body>
        {children}
        <GoogleAnalytics gaId="G-K9ZSKF1486" />
      </body>
    </html>
  );
}
