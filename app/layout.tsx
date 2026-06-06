import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";

export const metadata: Metadata = {
  title: "NovaMind Cloud — AI-Powered Business Intelligence",
  description: "Transform your data into actionable insights with AI-powered analytics",
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