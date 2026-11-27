import React from "react";
import Link from "next/link";
import { Lock, ShieldCheck } from "lucide-react";
import { DuckDBLogo, PolarsLogo, PostgresLogo } from "./BrandLogos";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[88svh] lg:min-h-[90svh] pt-28 pb-20 sm:pb-24 flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden">
      {/* Radial Mint Glow Spotlight behind Floating Navbar & Hero */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(65% 58% at 50% 0%, rgba(14, 165, 122, 0.14) 0%, rgba(14, 165, 233, 0.06) 44%, rgba(248, 250, 252, 0) 76%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full mx-auto flex flex-col items-center gap-5">
        {/* Eyebrow Pill with Colored Polars + DuckDB Logos */}
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50/95 border border-emerald-200/90 px-3.5 py-1.5 text-xs font-medium text-emerald-800 shadow-xs">
          <PolarsLogo size={15} />
          <DuckDBLogo size={15} />
          <span>v2.4 Streaming Engine · Zero-OOM Polars + DuckDB</span>
        </div>

        {/* Two-line Crisp Headline Stack */}
        <h1 className="text-4xl w-full py-2 sm:text-6xl lg:text-[64px] font-semibold tracking-tight leading-[1.06] text-foreground">
          <span className="block">Reliable Data,</span>
          <span className="block text-primary">Ready for AI.</span>
        </h1>

        <p className="text-base w-full py-4 sm:text-lg text-muted-foreground max-w-162.5 mx-auto leading-relaxed">
          Automate ingestion, validation, and cryptographic dataset
          versioning—so every training run is deterministic, multi-tenant
          isolated, and audit-ready.
        </p>

        {/* Dual Action Pills with Icons */}
        <div className="flex flex-col py-5 sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-[15px] font-medium shadow-md shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Start Automating</span>
          </Link>
          <a
            href="https://docs.xether.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-slate-200 text-slate-800 px-6 py-3.5 text-[15px] font-medium shadow-xs hover:bg-slate-50 hover:border-primary/40 transition-all"
          >
            <span>Read the Docs</span>
          </a>
        </div>

        {/* Trust Micro-Row with Colored PostgreSQL Emblem */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-1 text-[12px] text-slate-600">
          <span className="inline-flex bg-white/85 border border-slate-200/90 px-3 py-1 rounded-full items-center justify-center gap-1.5 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
            <span>Free secure Sandbox included</span>
          </span>
          <span className="inline-flex bg-white/85 border border-slate-200/90 rounded-full px-3 py-1 items-center justify-center gap-1.5 shadow-2xs">
            <Lock className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span>Zero credit card required</span>
          </span>
          <span className="inline-flex bg-white/85 border border-slate-200/90 rounded-full px-3 py-1 justify-center items-center gap-1.5 shadow-2xs">
            <PostgresLogo size={14} />
            <span>PostgreSQL FORCE RLS isolated</span>
          </span>
        </div>
      </div>
    </section>
  );
}
