import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Spotlight from "@/components/motion/Spotlight";
import { GoogleAnalytics } from "@next/third-parties/google";
import ContactEvents from "@/components/ContactEvents";

// Analytics only on the live site, so local runs and builds don't count as visits.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-K9ZSKF1486";
const ANALYTICS = process.env.VERCEL_ENV === "production";


const DESCRIPTION =
  "Software developer building mobile and web products end to end with React Native, Next.js, Node and PostgreSQL, now building AI systems in Python. Open to full-time roles.";

export const metadata = {
  title: {
    default: "Nitish Poonia, Software Developer",
    template: "%s | Nitish Poonia",
  },
  description:
    DESCRIPTION,
  metadataBase: new URL("https://nitishpoonia.in"),
  alternates: {
    canonical: "https://nitishpoonia.in",
  },
  openGraph: {
    title: "Nitish Poonia, Software Developer",
    description:
      DESCRIPTION,
    url: "https://nitishpoonia.in",
    siteName: "Nitish Poonia",
    images: ["/opengraph-image"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitish Poonia, Software Developer",
    description:
      DESCRIPTION,
    creator: "@nitishpoonia",
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
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
        <Spotlight />
        {ANALYTICS && <GoogleAnalytics gaId={GA_ID} />}
        {ANALYTICS && <ContactEvents />}
      </body>
    </html>
  );
}
