"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, GitBranch, ShieldCheck, Sparkles } from "lucide-react";

const capabilities = [
  {
    icon: Cpu,
    title: "Zero-OOM Streaming ETL",
    tag: "Polars + DuckDB",
    description:
      "Process 100GB+ Parquet streams with bounded worker memory.",
    iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600",
    tagStyle: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  {
    icon: GitBranch,
    title: "Immutable Dataset Lineage",
    tag: "SHA-256 + S3",
    description:
      "Branch, diff, and rollback snapshots with cryptographic provenance.",
    iconBg: "bg-sky-50 border-sky-200 text-sky-600",
    tagStyle: "border-sky-200 bg-sky-50 text-sky-700",
  },
  {
    icon: ShieldCheck,
    title: "Multi-Tenant Isolation",
    tag: "PostgreSQL RLS",
    description:
      "Workspace-scoped RBAC, encrypted credentials, and full audit trails.",
    iconBg: "bg-violet-50 border-violet-200 text-violet-600",
    tagStyle: "border-violet-200 bg-violet-50 text-violet-700",
  },
];

export function AuthVisualHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="w-full max-w-lg space-y-6"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-medium text-emerald-700 shadow-2xs">
        <Sparkles className="h-3.5 w-3.5" />
        <span>Deterministic ML Data Infrastructure</span>
      </div>

      <div className="space-y-3">
        <h2 className="text-4xl xl:text-[44px] font-bold tracking-tight text-slate-950 leading-[1.12]">
          Ship training data with{" "}
          <span className="text-primary">git-grade precision</span>
        </h2>
        <p className="text-slate-600 text-base leading-relaxed">
          Streaming ETL execution, immutable dataset versioning, and strict
          multi-tenant isolation—built so ML teams move faster with zero
          pipeline drift.
        </p>
      </div>

      <div className="space-y-3 pt-1">
        {capabilities.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex items-start gap-3.5 rounded-2xl border border-slate-200/90 bg-white/85 backdrop-blur-md p-4 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.07)] hover:border-primary/40 transition-all"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${item.iconBg}`}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium font-mono ${item.tagStyle}`}
                  >
                    {item.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
