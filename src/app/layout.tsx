import type { Metadata } from "next";
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
  title: "Hazzlee Labs | Website Rescue, Speed Cleanup, Automation",
  description:
    "Hazzlee Labs helps businesses rescue fragile websites, improve speed, clean up technical workflows, and build practical software systems.",
  metadataBase: new URL("https://hazzleelabs.com"),
  openGraph: {
    title: "Hazzlee Labs",
    description:
      "Website rescue, performance cleanup, automation, and practical engineering systems.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#06080d] font-sans">{children}</body>
    </html>
  );
}
