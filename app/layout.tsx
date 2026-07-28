import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "David Adams | Fullstack Developer",
  description:
    "Portfolio of David Adams - Fullstack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords: [
    "Fullstack Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "David Adams" }],
  openGraph: {
    title: "David Adams | Fullstack Developer",
    description:
      "Building digital experiences with innovative design and seamless development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`
          ${barlowCondensed.variable}
          ${barlowCondensed.className}
          antialiased
          bg-black
          text-white
          selection:bg-[rgba(212,169,77,0.35)]
          selection:text-white
        `}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}