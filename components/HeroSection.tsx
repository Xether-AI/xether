import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Lock, ShieldCheck, Zap } from "lucide-react";
import { DuckDBLogo, PolarsLogo, PostgresLogo } from "./BrandLogos";

export function HeroSection() {
  return (
    <section className="relative w-full pt-28 sm:pt-32 pb-44 sm:pb-48 md:pb-52 flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden">
      {/* Radial Mint Glow Spotlight behind Floating Navbar & Hero */}
      <div
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(62% 58% at 50% 4%, rgba(19, 51, 54, 0.92) 0%, rgba(11, 15, 23, 0) 76%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-5">
        {/* Eyebrow Pill with Colored Polars + DuckDB Logos */}
        <div className="inline-flex items-center gap-2 rounded-full bg-[#10292B]/90 border border-[#265955] px-3.5 py-1.5 text-xs font-mono font-medium text-primary shadow-sm">
          <PolarsLogo size={15} />
          <DuckDBLogo size={15} />
          <span>v2.4 Streaming Engine · Zero-OOM Polars + DuckDB</span>
        </div>

        {/* Two-line Crisp Headline Stack */}
        <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-tight leading-[1.06] text-foreground">
          <span className="block">Reliable Data,</span>
          <span className="block text-primary">Ready for AI.</span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground max-w-[650px] mx-auto leading-relaxed">
          Xether AI automates ingestion, validation, and cryptographic dataset
          versioning—so every training run is deterministic, multi-tenant
          isolated, and audit-ready.
        </p>

        {/* Dual Action Pills with Icons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-1">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-[15px] font-bold shadow-[0_10px_28px_rgba(120,252,214,0.25)] hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Zap className="w-4 h-4" aria-hidden="true" />
            <span>Start Automating</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <a
            href="https://docs.xether.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#131B28] border border-[#2C3D54] text-foreground px-6 py-3.5 text-[15px] font-medium hover:bg-[#192436] hover:border-primary/40 transition-all"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>Read the Docs</span>
          </a>
        </div>

        {/* Trust Micro-Row with Colored PostgreSQL Emblem */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-1 text-[11px] font-mono text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span>Free Sandbox included</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            <span>Zero credit card required</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <PostgresLogo size={14} />
            <span>PostgreSQL FORCE RLS isolated</span>
          </span>
        </div>
      </div>
    </section>
  );
}
