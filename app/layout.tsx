// app/layout.tsx
import React from "react";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

import { Analytics } from "@vercel/analytics/react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import Providers from "./providers";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

interface LayoutProps {
  readonly children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <Providers>
          <Header />
          {children}
          <Analytics />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
