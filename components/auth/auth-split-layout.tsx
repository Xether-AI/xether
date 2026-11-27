"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { AuthVisualHero } from "./auth-visual-hero";
import {
  AmazonS3Logo,
  DuckDBLogo,
  NatsLogo,
  PolarsLogo,
  PostgresLogo,
  SnowflakeLogo,
  XetherBrandMark,
} from "@/components/BrandLogos";

const SCATTERED_STACK_TAGS = [
  {
    name: "Polars",
    Logo: PolarsLogo,
    desktopClass: "top-[13%] left-[3%] -rotate-3",
    mobileRotate: "-rotate-2",
  },
  {
    name: "DuckDB",
    Logo: DuckDBLogo,
    desktopClass: "top-[10%] left-[44%] rotate-2",
    mobileRotate: "rotate-1",
  },
  {
    name: "Snowflake",
    Logo: SnowflakeLogo,
    desktopClass: "top-[12%] right-[4%] rotate-3",
    mobileRotate: "-rotate-1",
  },
  {
    name: "PostgreSQL",
    Logo: PostgresLogo,
    desktopClass: "bottom-[13%] left-[4%] rotate-2",
    mobileRotate: "rotate-2",
  },
  {
    name: "Amazon S3",
    Logo: AmazonS3Logo,
    desktopClass: "bottom-[10%] left-[43%] -rotate-2",
    mobileRotate: "-rotate-2",
  },
  {
    name: "NATS JetStream",
    Logo: NatsLogo,
    desktopClass: "bottom-[14%] right-[3%] -rotate-3",
    mobileRotate: "rotate-1",
  },
];

export function AuthSplitLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Auth");

  return (
    <div className="relative min-h-screen w-full bg-[#f8fafc] text-slate-900 overflow-x-hidden flex flex-col">
      {/* Unified Light Architectural Grid + Soft Ambient Washes */}
      <div className="pointer-events-none fixed inset-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="unified-auth-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(15, 23, 42, 0.05)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#unified-auth-grid)" />
        </svg>
      </div>
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 52% 48% at 15% 18%, rgba(14, 165, 122, 0.11), transparent 70%), radial-gradient(ellipse 50% 48% at 88% 82%, rgba(14, 165, 233, 0.08), transparent 70%)",
        }}
      />

      {/* Scattered Floating Native Data Stack Tags (Desktop Perimeter) */}
      <div
        className="pointer-events-none select-none hidden lg:block fixed inset-0 z-10 overflow-hidden"
        aria-hidden="true"
      >
        {SCATTERED_STACK_TAGS.map(({ name, Logo, desktopClass }) => (
          <div
            key={name}
            className={`absolute inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/85 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-[0_8px_24px_-6px_rgba(15,23,42,0.10)] ${desktopClass}`}
          >
            <Logo size={16} />
            <span>{name}</span>
          </div>
        ))}
      </div>

      {/* Unified Top Bar */}
      <header className="relative z-20 max-w-7xl mx-auto w-full px-5 sm:px-8 pt-6 pb-2 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full pr-1"
        >
          <XetherBrandMark size={30} variant="light" />
          <span className="text-lg font-bold tracking-tight text-slate-950">
            Xether{" "}
            <span className="text-primary group-hover:opacity-90 transition-opacity">
              AI
            </span>
          </span>
          <span className="hidden sm:inline-flex rounded-full border border-slate-200 bg-white/85 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 shadow-2xs">
            {t("cloudPlatform")}
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-950 hover:border-primary/40 shadow-2xs transition-all group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>{t("backToHome")}</span>
        </Link>
      </header>

      {/* Unified Content Canvas (No Split Line) */}
      <main className="relative z-20 flex-1 w-full max-w-6xl mx-auto px-5 sm:px-8 py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="hidden lg:block lg:col-span-6">
          <AuthVisualHero />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="lg:col-span-6 w-full flex justify-center lg:justify-end"
        >
          {children}
        </motion.div>
      </main>

      {/* Scattered Native Data Stack Tags on Smaller Screens */}
      <div
        className="lg:hidden relative z-20 flex flex-wrap items-center justify-center gap-2.5 px-4 pb-6"
        aria-hidden="true"
      >
        {SCATTERED_STACK_TAGS.map(({ name, Logo, mobileRotate }) => (
          <div
            key={name}
            className={`inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs ${mobileRotate}`}
          >
            <Logo size={15} />
            <span>{name}</span>
          </div>
        ))}
      </div>

      {/* Unified Bottom Footer */}
      <footer className="relative z-20 max-w-7xl mx-auto w-full px-6 pb-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>{t("operationalStatus")}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <span>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-primary font-semibold">Xether AI</span>.{" "}
            {t("allRightsReserved")}
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-3.5">
            <a
              href="https://docs.xether.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors"
            >
              {t("docs")}
            </a>
            <Link href="/api" className="hover:text-slate-900 transition-colors">
              {t("api")}
            </Link>
            <Link
              href="/contact"
              className="hover:text-slate-900 transition-colors"
            >
              {t("support")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
