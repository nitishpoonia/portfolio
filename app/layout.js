import { Montserrat } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Nitish Poonia — Developer & Creator",
  description:
    "Software engineer, sculptor, vermiculturist, and vegetable grower.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        {children}
        <GoogleAnalytics gaId="G-K9ZSKF1486" />
      </body>
    </html>
  );
}
