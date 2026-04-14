import { Montserrat } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    default: "Nitish Poonia — React Native & Full-Stack Developer",
    template: "%s | Nitish Poonia",
  },
  description:
    "React Native and full-stack developer building mobile apps and web platforms for startups and small businesses. Fixed price projects from wireframe to App Store.",
  metadataBase: new URL("https://nitishpoonia.in"),
  alternates: {
    canonical: "https://nitishpoonia.in",
  },
  openGraph: {
    title: "Nitish Poonia — React Native & Full-Stack Developer",
    description:
      "React Native and full-stack developer building mobile apps and web platforms for startups and small businesses. Fixed price projects from wireframe to App Store.",
    url: "https://nitishpoonia.in",
    siteName: "Nitish Poonia",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://nitishpoonia.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nitish Poonia — React Native & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitish Poonia — React Native & Full-Stack Developer",
    description:
      "React Native and full-stack developer building mobile apps and web platforms for startups and small businesses.",
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
    <html lang="en" className={montserrat.variable}>
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
