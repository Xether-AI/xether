"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HelpCircle, Minus, Plus, Quote } from "lucide-react";
import { HuggingFaceLogo, PostgresLogo } from "./BrandLogos";

const FAQ_DATA = [
  {
    question:
      "How does Xether prevent out-of-memory crashes on multi-GB datasets?",
    answer:
      "All pipeline transforms compile to Polars LazyFrame streaming queries paired with DuckDB 2.0 out-of-core disk spill (DUCKDB_TEMP_DIR). Artifacts >=25 MB stream straight to S3 via multipart upload with incremental SHA-256 hashing.",
  },
  {
    question:
      "How is multi-tenant isolation enforced across compute and storage?",
    answer:
      "Every tenant database table enforces PostgreSQL FORCE ROW LEVEL SECURITY bound to session app.current_org_id, paired with hashed xth_live_ API keys, Redis jti revocation, and strict <org_id>/ S3 prefix scoping.",
  },
  {
    question: "What happens if a worker restarts mid-pipeline?",
    answer:
      "NATS JetStream pull workers send msg.in_progress() heartbeats and persist deterministic S3 stage checkpoints. Restarts resume cleanly from the last committed stage without recomputing completed transforms.",
  },
  {
    question: "Can we connect Postgres, Snowflake, or internal VPC sources?",
    answer:
      "Yes. Enterprise Dedicated workspaces support private VPC / BYOC worker deployments and vaulted credentials for Amazon S3, PostgreSQL incremental watermarks, Snowflake, MinIO, and paginated REST APIs.",
  },
  {
    question: "How are compute hours and storage quotas tracked?",
    answer:
      "Execution workers and storage services emit idempotent UsageEvent ledgers reconciled dynamically into org_quotas, powering live quota bars inside your Team Dashboard.",
  },
];

const ENGINEER_QUOTES = [
  {
    quote:
      "Rolling back a corrupted merge took four seconds thanks to SHA-256 dataset snapshots.",
    author: "Alex Chen · Staff ML Engineer",
    avatar: "/images/avatars/annette-black.png",
    Logo: HuggingFaceLogo,
  },
  {
    quote:
      "PostgreSQL FORCE RLS gave our security review team immediate sign-off.",
    author: "David Park · Head of Security",
    avatar: "/images/avatars/robert-fox.png",
    Logo: PostgresLogo,
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="w-full py-16 md:py-20 px-4 sm:px-6 border-y border-white/[0.06] bg-[#0C111A]/85">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 lg:gap-12 items-start">
        {/* Left Column: Intro + Proof Cards */}
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#10292B] border border-[#265955] px-3 py-1 text-[11px] font-mono font-semibold tracking-wider uppercase text-primary">
            <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Architecture &amp; FAQ</span>
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
            Engineering-Grade Answers
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Built for teams running sensitive production workloads that cannot
            afford silent schema drift or noisy-neighbor failures.
          </p>

          <div className="space-y-3 pt-2">
            {ENGINEER_QUOTES.map((item) => {
              const Logo = item.Logo;
              return (
                <div
                  key={item.author}
                  className="rounded-xl border border-[#222E3F] bg-card p-4 space-y-2.5"
                >
                  <div className="flex items-start gap-2.5">
                    <Quote
                      className="w-4 h-4 text-primary shrink-0 mt-0.5 fill-primary/20"
                      aria-hidden="true"
                    />
                    <p className="text-[13px] text-foreground leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pl-6 text-[11px] font-mono font-medium text-primary">
                    <Image
                      src={item.avatar}
                      alt={item.author}
                      width={20}
                      height={20}
                      className="w-5 h-5 rounded-full object-cover border border-[#265955] shrink-0"
                    />
                    <Logo size={14} />
                    <span>{item.author}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Accessible Accordion */}
        <div className="space-y-3">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`rounded-xl border transition-colors ${
                  isOpen
                    ? "bg-[#131C2A] border-[#265955]"
                    : "bg-card border-[#222E3F] hover:border-[#2C3D54]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
                >
                  <span className="text-[15px] font-semibold text-foreground">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  ) : (
                    <Plus className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-[13px] text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
