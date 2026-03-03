import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Providers } from "./providers";

const snPro = localFont({
  src: [
    {
      path: "../public/fonts/sn-pro/SNPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/sn-pro/SNPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sn-pro",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://xether.ai"),
  title: {
    default: "Xether AI - Data Infrastructure for AI",
    template: "%s | Xether AI",
  },
  description:
    "Automate data preparation, management, and improvement with Xether AI.",
  keywords: ["AI", "Data Infrastructure", "Data Prep", "MLOps", "Xether AI"],
  authors: [{ name: "Xether AI Team" }],
  creator: "Xether AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://xether.ai",
    title: "Xether AI - Data Infrastructure for AI",
    description: "Automate data preparation, management, and improvement.",
    siteName: "Xether AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Xether AI - Data Infrastructure for AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xether AI - Data Infrastructure for AI",
    description: "Automate data preparation, management, and improvement.",
    images: ["/og-image.png"],
    creator: "@xetherai",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

import { Header } from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${snPro.variable} font-sans antialiased`}>
        <Providers>
          <Header />
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
