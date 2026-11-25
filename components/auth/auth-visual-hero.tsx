"use client";

import React from "react";
import { motion } from "framer-motion";
import { DatabaseZap, GitBranch, ShieldCheck, Sparkles } from "lucide-react";

const highlights = [
  {
    icon: DatabaseZap,
    title: "Automated Data Cleaning",
    description: "Detect anomalies and validate schemas before training.",
    iconBg: "bg-emerald-500/15 border-emerald-500/25 text-emerald-400",
  },
  {
    icon: GitBranch,
    title: "Git-Style Versioning",
    description: "Branch, diff, and rollback datasets with full lineage.",
    iconBg: "bg-sky-500/15 border-sky-500/25 text-sky-400",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Governance",
    description: "RBAC, audit trails, and compliance built into every run.",
    iconBg: "bg-violet-500/15 border-violet-500/25 text-violet-400",
  },
];

export function AuthVisualHero() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-10 overflow-hidden bg-muted/20">
      {/* Ambient glow orbs aligned with landing page */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-sky-500/10 blur-[110px]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md space-y-8"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Data Infrastructure for AI</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-4xl font-bold tracking-tight text-foreground leading-tight">
            Reliable data,{" "}
            <span className="text-primary italic">ready for production</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Xether AI automates the fragile parts of data pipelines so ML teams
            can ship reproducible models faster.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card/60 backdrop-blur-md p-4 transition-colors hover:border-primary/30"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${item.iconBg}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
