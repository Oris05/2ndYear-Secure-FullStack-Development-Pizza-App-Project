import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavClient from "./NavClient";   // ← add this

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ORESTO PIZZERIA",
  description: "Deliver pizza anywhere in Navan for the cheapest price!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>

        <NavClient />   {/* ← renders your header + nav with username */}

        {children}

        <footer>
          <p>© B00172214 — All rights reserved</p>
        </footer>

      </body>
    </html>
  );
}
