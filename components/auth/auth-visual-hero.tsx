"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, GitBranch, ShieldCheck, Sparkles } from "lucide-react";
import {
  AmazonS3Logo,
  DuckDBLogo,
  NatsLogo,
  PolarsLogo,
  PostgresLogo,
  SnowflakeLogo,
  XetherBrandMark,
} from "@/components/BrandLogos";

const capabilities = [
  {
    icon: Cpu,
    title: "Zero-OOM Streaming ETL",
    tag: "Polars + DuckDB",
    description:
      "Process 100GB+ Parquet streams with bounded worker memory.",
    iconBg: "bg-emerald-500/15 border-emerald-500/25 text-emerald-400",
    tagStyle: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  },
  {
    icon: GitBranch,
    title: "Immutable Dataset Lineage",
    tag: "SHA-256 + S3",
    description:
      "Branch, diff, and rollback snapshots with cryptographic provenance.",
    iconBg: "bg-sky-500/15 border-sky-500/25 text-sky-400",
    tagStyle: "border-sky-500/25 bg-sky-500/10 text-sky-300",
  },
  {
    icon: ShieldCheck,
    title: "Multi-Tenant Isolation",
    tag: "PostgreSQL RLS",
    description:
      "Workspace-scoped RBAC, encrypted credentials, and full audit trails.",
    iconBg: "bg-violet-500/15 border-violet-500/25 text-violet-400",
    tagStyle: "border-violet-500/25 bg-violet-500/10 text-violet-300",
  },
];

const stackChips = [
  { name: "Polars", Logo: PolarsLogo },
  { name: "DuckDB", Logo: DuckDBLogo },
  { name: "PostgreSQL", Logo: PostgresLogo },
  { name: "Amazon S3", Logo: AmazonS3Logo },
  { name: "Snowflake", Logo: SnowflakeLogo },
  { name: "NATS", Logo: NatsLogo },
];

export function AuthVisualHero() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-10 xl:p-12 overflow-hidden bg-muted/20">
      {/* Ambient glow orbs aligned with landing page */}
      <div className="pointer-events-none absolute -top-28 -left-24 h-88 w-88 rounded-full bg-primary/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-sky-500/10 blur-[120px]" />

      {/* Top Brand Header */}
      <div className="relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 w-fit group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full pr-1"
        >
          <XetherBrandMark size={30} />
          <span className="text-lg font-bold tracking-tight text-foreground">
            Xether{" "}
            <span className="text-primary group-hover:opacity-90 transition-opacity">
              AI
            </span>
          </span>
          <span className="ml-1 rounded-full border border-border/80 bg-card/80 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            Cloud Platform
          </span>
        </Link>
      </div>

      {/* Middle Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg space-y-6 my-auto py-6"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Deterministic ML Data Infrastructure</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl xl:text-4xl font-bold tracking-tight text-foreground leading-[1.15]">
            Ship training data with{" "}
            <span className="text-primary">git-grade precision</span>
          </h2>
          <p className="text-muted-foreground text-sm xl:text-base leading-relaxed">
            Streaming ETL execution, immutable dataset versioning, and
            strict multi-tenant isolation—built so ML teams move faster with
            zero pipeline drift.
          </p>
        </div>

        <div className="space-y-2.5 pt-1">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-3.5 rounded-2xl border border-border/80 bg-card/75 backdrop-blur-md p-3.5 transition-colors hover:border-primary/30"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${item.iconBg}`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium font-mono ${item.tagStyle}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Native Data Stack Strip */}
        <div className="pt-1 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Native Data Stack
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {stackChips.map(({ name, Logo }) => (
              <div
                key={name}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/70 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-foreground/90"
              >
                <Logo size={16} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom Status Strip */}
      <div className="relative z-10 flex items-center gap-2.5 text-xs text-muted-foreground">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span>All data planes operational · TLS 1.3 · SOC 2 ready</span>
      </div>
    </div>
  );
}
