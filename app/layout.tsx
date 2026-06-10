import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";

export const metadata: Metadata = {
  title: "Nova AI",
  description: "Enterprise Data Integrity & System Corruption Monitoring Platform",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 min-h-screen relative overflow-x-hidden">
        <Background />
        <Navbar />
        {children}
      </body>
    </html>
  );
}