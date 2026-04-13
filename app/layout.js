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
    default: "Nitish Poonia — Mobile & Web App Developer",
    template: "%s | Nitish Poonia",
  },
  description:
    "I build mobile apps and web platforms for startups and small businesses. React Native, Next.js, Node.js. Based in India, working globally.",
  metadataBase: new URL("https://nitishpoonia.in"),
  openGraph: {
    siteName: "Nitish Poonia",
    locale: "en_IN",
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
