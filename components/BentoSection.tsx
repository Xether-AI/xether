import React from "react";
import {
  Activity,
  ArrowRight,
  BarChart2,
  GitBranch,
  Plug,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  AmazonS3Logo,
  DuckDBLogo,
  GoLogo,
  MinIOLogo,
  NatsLogo,
  PolarsLogo,
  PostgresLogo,
  PrefectLogo,
  RedisLogo,
  RestApiLogo,
  SnowflakeLogo,
  StripeLogo,
} from "./BrandLogos";

export function BentoSection() {
  return (
    <section
      id="architecture-section"
      className="w-full px-4 sm:px-6 py-10 md:py-16 relative overflow-visible"
    >
      {/* Subtle Ambient Mint Glow */}
      <div
        className="pointer-events-none absolute top-72 left-1/2 -translate-x-1/2 w-135 h-135 rounded-full bg-primary/10 blur-[140px] z-0"
        aria-hidden="true"
      />

      <div className="max-w-310 mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="max-w-175 mx-auto flex flex-col items-center text-center gap-3.5">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#10292B] border border-[#265955] px-3 py-1 text-[12px] tracking-wider uppercase text-primary">
            <span>Core Infrastructure</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Data Quality as Infrastructure
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-157.5 leading-relaxed">
            Every pipeline stage streams out-of-core, checkpoints
            deterministically to S3, and verifies SHA-256 digests before model
            training begins.
          </p>
        </div>

        {/* Staggered Floating Bento Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
          {/* 1. Zero-OOM Streaming Engine (Wide Upper-Left) */}
          <article className="lg:col-span-5 rounded-2xl border border-[#222E3F] bg-card p-6 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-4 hover:border-primary/35 transition-colors">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <h3 className="text-base sm:text-[17px] font-bold text-foreground">
                  Zero-OOM Streaming Engine
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <PolarsLogo size={18} />
                <DuckDBLogo size={18} />
              </div>
            </div>

            <div className="rounded-xl bg-[#f8fafb] border border-[#1E293B] p-4 space-y-2.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Input Parquet Batch</span>
                <span className="font-semibold text-foreground">64.0 GiB</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-[#1B2535] overflow-hidden">
                <div className="h-full w-[90%] rounded-full bg-slate-600" />
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-primary">Worker Peak RSS (Spill OK)</span>
                <span className="font-semibold text-primary">1.4 GiB</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-[#1B2535] overflow-hidden">
                <div className="h-full w-[16%] rounded-full bg-primary" />
              </div>
            </div>

            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Polars LazyFrame scans and DuckDB out-of-core disk spill process
              multi-GB Parquet tables inside strict bounded RSS.
            </p>
          </article>

          {/* 2. Cryptographic Versioning (Offset Center-Top + Floating DuckDB Badge) */}
          <div className="lg:col-span-4 lg:mt-4 flex flex-col items-start justify-center gap-3">
            <span className="hidden lg:inline-flex items-center justify-center gap-2 rounded-full bg-[#1D1B11] border border-[#4D441A] px-3 py-1.5 text-[11px] text-amber-200 shadow-sm">
              <DuckDBLogo size={15} />
              <span>DuckDB 2.0 Out-of-Core Spill</span>
            </span>

            <article className="w-full rounded-2xl border border-[#222E3F] bg-card p-6 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-4 hover:border-primary/35 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2.5">
                  <GitBranch className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  <h3 className="text-base sm:text-[17px] font-bold text-foreground">
                    Cryptographic Versioning
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <AmazonS3Logo size={18} />
                  <MinIOLogo size={18} />
                </div>
              </div>

              <div className="rounded-xl bg-[#0D131D] border border-[#1E293B] p-3.5 space-y-2.5">
                <div className="flex items-center justify-between gap-2 rounded-lg bg-[#112529] border border-[#265955] px-3 py-2 text-[11px] font-mono">
                  <span className="font-semibold text-primary">v2.3.0 · main</span>
                  <span className="text-slate-400">sha256:9f3a8c1</span>
                </div>
                <div className="flex items-center justify-between gap-2 rounded-lg bg-[#141C2A] border border-[#222E3F] px-3 py-2 text-[11px] font-mono">
                  <span className="font-semibold text-foreground">v2.2.4 · feat/dedup</span>
                  <span className="text-slate-500">sha256:4b12e09</span>
                </div>
              </div>

              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Branch datasets like Git, verify &gt;=25 MB S3 multipart uploads
                with SHA-256, and roll back cleanly.
              </p>
            </article>
          </div>

          {/* 3. Multi-Tenant FORCE RLS (Tall Upper-Right Staggered Higher) */}
          <article className="lg:col-span-3 lg:-mt-3 rounded-2xl border border-[#222E3F] bg-card p-6 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-4 hover:border-primary/35 transition-colors">
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <h3 className="text-base font-bold text-foreground">
                  Multi-Tenant RLS
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <PostgresLogo size={17} />
                <RedisLogo size={17} />
              </div>
            </div>

            <div className="rounded-xl bg-[#0D131D] border border-[#1E293B] p-3 space-y-2">
              <div className="flex items-center gap-2 rounded-md bg-[#131B28] border border-[#222E3F] px-2.5 py-2 text-[10px] font-mono text-primary truncate">
                <PostgresLogo size={14} />
                <span className="truncate">app.current_org_id = &apos;org_7f2a&apos;</span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-[#131B28] border border-[#222E3F] px-2.5 py-2 text-[10px] font-mono text-sky-400 truncate">
                <RedisLogo size={14} />
                <span className="truncate">jti:revoked · xth_live_sha256</span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-[#131B28] border border-[#222E3F] px-2.5 py-2 text-[10px] font-mono text-emerald-400 truncate">
                <AmazonS3Logo size={14} />
                <span className="truncate">s3://artifacts/org_7f2a/ds_09/</span>
              </div>
            </div>

            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Isolation enforced inside PostgreSQL row-level security, hashed
              xth_live_ keys, and S3 &lt;org_id&gt;/ prefixes.
            </p>
          </article>

          {/* 4. Durable JetStream Workers (Staggered Bottom-Left + Floating S3 Badge) */}
          <div className="lg:col-span-4 lg:ml-4 lg:-mt-2 flex flex-col items-start gap-3.5">
            <article className="w-full rounded-2xl border border-[#222E3F] bg-card p-6 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-4 hover:border-primary/35 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  <h3 className="text-base sm:text-[17px] font-bold text-foreground">
                    Durable JetStream Workers
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <NatsLogo size={18} />
                  <PrefectLogo size={18} />
                </div>
              </div>

              <div className="rounded-xl bg-[#0D131D] border border-[#1E293B] p-3.5 space-y-2.5">
                <div className="flex items-center justify-between gap-1.5 text-[10px] font-mono">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#182233] border border-[#222E3F] px-2 py-1 text-foreground">
                    <PostgresLogo size={12} />
                    <span>Outbox</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-primary shrink-0" aria-hidden="true" />
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#10292B] border border-[#265955] px-2 py-1 text-primary">
                    <NatsLogo size={12} />
                    <span>JetStream</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-primary shrink-0" aria-hidden="true" />
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#182233] border border-[#222E3F] px-2 py-1 text-emerald-400">
                    <PrefectLogo size={12} />
                    <span>Prefect 3</span>
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#131B28] px-3 py-2 text-[10px] font-mono">
                  <span className="text-sky-400">Heartbeat: msg.in_progress()</span>
                  <span className="font-semibold text-emerald-400">DLQ: 0</span>
                </div>
              </div>

              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Transactional outbox dispatch, per-org concurrency caps, S3 stage
                checkpoints, and cooperative SSE cancellation.
              </p>
            </article>

            <span className="hidden lg:inline-flex items-center gap-2 ml-6 rounded-full bg-[#221712] border border-[#523022] px-3.5 py-1.5 text-[11px] font-mono text-orange-200 shadow-sm">
              <AmazonS3Logo size={15} />
              <span>SHA-256 S3 Multipart &gt;= 25 MB</span>
            </span>
          </div>

          {/* 5. Vaulted Data Connectors (Centerpiece Staggered Lower) */}
          <article className="lg:col-span-4 lg:mt-6 rounded-2xl border border-[#222E3F] bg-card p-6 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-4 hover:border-primary/35 transition-colors">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2.5">
                <Plug className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <h3 className="text-base sm:text-[17px] font-bold text-foreground">
                  Vaulted Data Connectors
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <AmazonS3Logo size={17} />
                <SnowflakeLogo size={17} />
                <PostgresLogo size={17} />
              </div>
            </div>

            <div className="rounded-xl bg-[#0D131D] border border-[#1E293B] p-3.5 grid grid-cols-2 gap-2.5">
              {[
                { name: "Amazon S3", Logo: AmazonS3Logo },
                { name: "PostgreSQL", Logo: PostgresLogo },
                { name: "Snowflake", Logo: SnowflakeLogo },
                { name: "MinIO Store", Logo: MinIOLogo },
                { name: "DuckDB 2.0", Logo: DuckDBLogo },
                { name: "REST / httpx", Logo: RestApiLogo },
              ].map((conn) => {
                const ConnLogo = conn.Logo;
                return (
                  <div
                    key={conn.name}
                    className="flex items-center gap-2 rounded-lg bg-[#141D2B] border border-[#222E3F] px-2.5 py-2 text-[11px] font-semibold text-foreground"
                  >
                    <ConnLogo size={15} />
                    <span className="truncate">{conn.name}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Encrypted credential vault for Amazon S3, PostgreSQL watermarks,
              Snowflake analytics, MinIO, DuckDB, and REST.
            </p>
          </article>

          {/* 6. Real-Time Usage Metering (Bottom-Right + Floating RLS Verified Pill) */}
          <div className="lg:col-span-4 lg:mt-2 flex flex-col items-end gap-3.5">
            <article className="w-full rounded-2xl border border-[#222E3F] bg-card p-6 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-4 hover:border-primary/35 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2.5">
                  <BarChart2 className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  <h3 className="text-base sm:text-[17px] font-bold text-foreground">
                    Real-Time Metering
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <StripeLogo size={18} />
                  <GoLogo size={18} />
                </div>
              </div>

              <div className="rounded-xl bg-[#0D131D] border border-[#1E293B] p-4 space-y-2.5">
                {[
                  { label: "Storage Quota", val: "320/500 GiB", pct: "64%", color: "bg-primary text-primary" },
                  { label: "Compute Hours", val: "19.2/50 hrs", pct: "38%", color: "bg-sky-400 text-sky-400" },
                  { label: "Worker Slots", val: "2/5 active", pct: "40%", color: "bg-emerald-400 text-emerald-400" },
                ].map((bar) => (
                  <div key={bar.label} className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-muted-foreground">{bar.label}</span>
                      <span className={`font-mono font-semibold bg-transparent ${bar.color.split(" ")[1]}`}>
                        {bar.val}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#1B2535] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${bar.color.split(" ")[0]}`}
                        style={{ width: bar.pct }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Idempotent UsageEvent ledgers enforce storage &amp; compute
                quotas dynamically via Go :9091.
              </p>
            </article>

            <span className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[#111C2E] border border-[#25426B] px-3.5 py-1.5 text-[11px] font-mono text-sky-200 shadow-sm">
              <PostgresLogo size={15} />
              <span>PostgreSQL FORCE RLS Verified</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
