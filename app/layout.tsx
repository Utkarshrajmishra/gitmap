import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CommitContextProvider } from "@/context/CommitContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitMap",
  description: "Visualize Your GitHub Repos Like Never Before With GitMap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="font-jakarta top-0 left-0 right-0 z-10">
          <CommitContextProvider>{children}</CommitContextProvider>
        </main>
      </body>
    </html>
  );
}
