import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ELVIS MOYO | Full-Stack Engineer",
  description:
    "I build systems that think, scale, and endure. Explore the work, skills, and journey of Elvis Moyo, a full-stack engineer from Lupane, Zimbabwe.",
  openGraph: {
    title: "Elvis Moyo | Full-Stack Engineer",
    description: "I build systems that think, scale, and endure.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elvis Moyo | Full-Stack Engineer",
    description: "I build systems that think, scale, and endure.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
