import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import "./globals.css";


const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-share-tech-mono'
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={shareTechMono.className}>
        {children}
      </body>
    </html>
  );
}
