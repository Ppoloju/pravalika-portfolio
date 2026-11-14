import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pravalika | Full Stack Developer",
  description:
    "Full-stack developer portfolio — building modern web experiences with React, Next.js, and scalable backend systems.",
  keywords: [
    "full stack developer",
    "web developer",
    "React",
    "Next.js",
    "TypeScript",
    "portfolio",
  ],
  openGraph: {
    title: "Pravalika | Full Stack Developer",
    description:
      "Full-stack developer portfolio — building modern web experiences with React, Next.js, and scalable backend systems.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pravalika | Full Stack Developer",
    description:
      "Full-stack developer portfolio — building modern web experiences with React, Next.js, and scalable backend systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth motion-reduce:scroll-auto`}
    >
      <body className="min-h-screen text-white antialiased" suppressHydrationWarning>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
