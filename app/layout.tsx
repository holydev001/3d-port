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
  title: "David Adams — Building digital things with intent.",
  description:
    "The creative portfolio of David Adams, a full-stack developer crafting expressive and useful digital experiences.",
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
    title: "David Adams — Building digital things with intent.",
    description:
      "Creative full-stack development where engineering, motion, and design meet.",
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
