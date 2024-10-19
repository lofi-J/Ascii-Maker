import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import { Sixtyfour } from "next/font/google";
import "./globals.css";


const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-share-tech-mono'
});

const sixtyFour = Sixtyfour({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-sixty-four'
});

export const metadata: Metadata = {
  title: "ASCII Art Maker",
  description: "Create stunning ASCII art from your images easily. Upload, customize, and build your unique ASCII artwork with powerful tools. Perfect for those who love retro-inspired digital art. Start now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sixtyFour.className} ${shareTechMono.className}`}>
        {children}
      </body>
    </html>
  );
}
