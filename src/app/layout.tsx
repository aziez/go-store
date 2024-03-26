import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import Providers from "./provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Go-store",
  description: "Store management from go-design store",
  metadataBase: new URL("https://go-store13.vercel.app/"),
  authors: [
    { name: "Abdul Aziz", url: "https://www.linkedin.com/in/aziez13/" },
  ],
  keywords: ["store app", "store management", "go-design", "next.js"],
  openGraph: {
    title: "go-design store management",
    description: "official project from go-design store",
    url: "https://go-store13.vercel.app/",
    type: "website",
  },
  twitter: {
    site: "@go-design",
    description: "go-design store",
    title: "Go-design store app",
    creator: "@aziz13",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextTopLoader
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="3 3 10px #2299DD,0 0 5px #2299DD"
        />
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
