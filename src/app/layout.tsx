import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import { Ubuntu_Mono } from "next/font/google";
import "./globals.css";


const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-share-tech-mono'
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ubuntu-mono'
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
      <body className={`${ubuntuMono.className} ${shareTechMono.className}`}>
        {children}
      </body>
    </html>
  );
}
