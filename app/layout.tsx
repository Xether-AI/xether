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
  },
  twitter: {
    card: "summary_large_image",
    title: "Xether AI - Data Infrastructure for AI",
    description: "Automate data preparation, management, and improvement.",
    creator: "@xetherai",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        type: "image/png",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Header } from "@/components/Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${snPro.variable} font-sans antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Header />
            {children}
          </Providers>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
