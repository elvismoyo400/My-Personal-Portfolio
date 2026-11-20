import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LoadingStateProvider } from "./contexts/LoadingState";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elvis Moyo | Junior Full-Stack Developer",
  description:
    "Junior Full-Stack Developer based in Lupane, Zimbabwe. I build practical web applications with Django and React for real businesses, schools, and communities.",
  openGraph: {
    title: "Elvis Moyo | Junior Full-Stack Developer",
    description:
      "Junior Full-Stack Developer based in Lupane, Zimbabwe. I build practical web applications with Django and React for real businesses, schools, and communities.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elvis Moyo | Junior Full-Stack Developer",
    description:
      "Junior Full-Stack Developer based in Lupane, Zimbabwe. I build practical web applications with Django and React for real businesses, schools, and communities.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LoadingStateProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LoadingStateProvider>
      </body>
    </html>
  );
}
