import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hazzlee Labs | Software, Automation, Engineering",
  description:
    "Hazzlee Labs builds intelligent software, automation, and engineering systems that help people and businesses turn complex ideas into practical, working solutions.",
  metadataBase: new URL("https://hazzleelabs.com"),
  openGraph: {
    title: "Hazzlee Labs",
    description:
      "Software, automation, and engineering systems for practical business outcomes.",
    url: "https://hazzleelabs.com",
    siteName: "Hazzlee Labs",
    locale: "en_US",
    type: "website",
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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[var(--brand-near-black)] font-sans">
        {children}
      </body>
    </html>
  );
}
