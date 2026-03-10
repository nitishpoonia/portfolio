import { Montserrat } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Nitish Poonia — React Native & Full-Stack Developer",
  description:
    "React Native and full-stack developer based in India. I build mobile apps, web platforms, and software systems from design to deployment.",
  keywords: [
    "React Native developer India",
    "mobile app developer",
    "full stack developer India",
    "Next.js developer",
  ],
  openGraph: {
    title: "Nitish Poonia — React Native & Full-Stack Developer",
    description: "React Native and full-stack developer based in India.",
    url: "https://nitishpoonia.in",
    type: "website",
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
