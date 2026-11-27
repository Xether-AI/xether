"use client";

import React from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("Bento");

  return (
    <section
      id="architecture-section"
      className="w-full px-4 sm:px-6 py-10 md:py-16 relative overflow-visible"
    >
      {/* Subtle Ambient Mint Glow */}
      <div
        className="pointer-events-none absolute top-72 left-1/2 -translate-x-1/2 w-135 h-135 rounded-full bg-emerald-400/12 blur-[140px] z-0"
        aria-hidden="true"
      />

      <div className="max-w-310 mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="max-w-175 mx-auto flex flex-col items-center text-center gap-3.5">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[12px] font-semibold tracking-wider uppercase text-emerald-700">
            <span>{t("badge")}</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-157.5 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Staggered Floating Bento Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
          {/* 1. Zero-OOM Streaming Engine (Wide Upper-Left) */}
          <article className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_14px_38px_-12px_rgba(15,23,42,0.08)] flex flex-col justify-between gap-4 hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <h3 className="text-base sm:text-[17px] font-bold text-foreground">
                  {t("streaming.title")}
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <PolarsLogo size={18} />
                <DuckDBLogo size={18} />
              </div>
            </div>

            <div className="rounded-xl bg-slate-50/90 border border-slate-200/80 p-4 space-y-2.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-600">{t("streaming.inputLabel")}</span>
                <span className="font-semibold text-slate-900">64.0 GiB</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-200/90 overflow-hidden">
                <div className="h-full w-[90%] rounded-full bg-slate-400" />
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="font-medium text-emerald-700">
                  {t("streaming.workerLabel")}
                </span>
                <span className="font-semibold text-emerald-700">1.4 GiB</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-200/90 overflow-hidden">
                <div className="h-full w-[16%] rounded-full bg-primary" />
              </div>
            </div>

            <p className="text-[13px] text-muted-foreground leading-relaxed">
              {t("streaming.description")}
            </p>
          </article>

          {/* 2. Cryptographic Versioning (Offset Center-Top + Floating DuckDB Badge) */}
          <div className="lg:col-span-4 lg:mt-4 flex flex-col items-start justify-center gap-3">
            <span className="hidden lg:inline-flex items-center justify-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-[11px] font-medium text-amber-900 shadow-xs">
              <DuckDBLogo size={15} />
              <span>{t("badges.duckdb")}</span>
            </span>

            <article className="w-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_14px_38px_-12px_rgba(15,23,42,0.08)] flex flex-col justify-between gap-4 hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2.5">
                  <GitBranch className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  <h3 className="text-base sm:text-[17px] font-bold text-foreground">
                    {t("versioning.title")}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <AmazonS3Logo size={18} />
                  <MinIOLogo size={18} />
                </div>
              </div>

              <div className="rounded-xl bg-slate-50/90 border border-slate-200/80 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-[11px]">
                  <span className="font-semibold text-emerald-800">v2.3.0 · main</span>
                  <span className="text-emerald-700">sha256:9f3a8c1</span>
                </div>
                <div className="flex items-center justify-between gap-2 rounded-lg bg-white border border-slate-200 px-3 py-2 text-[11px]">
                  <span className="font-semibold text-slate-800">v2.2.4 · feat/dedup</span>
                  <span className="text-slate-500">sha256:4b12e09</span>
                </div>
              </div>

              <p className="text-[13px] text-muted-foreground leading-relaxed">
                {t("versioning.description")}
              </p>
            </article>
          </div>

          {/* 3. Multi-Tenant FORCE RLS (Tall Upper-Right Staggered Higher) */}
          <article className="lg:col-span-3 lg:-mt-3 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_14px_38px_-12px_rgba(15,23,42,0.08)] flex flex-col justify-between gap-4 hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <h3 className="text-base font-bold text-foreground">
                  {t("rls.title")}
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <PostgresLogo size={17} />
                <RedisLogo size={17} />
              </div>
            </div>

            <div className="rounded-xl bg-slate-50/90 border border-slate-200/80 p-3 space-y-2">
              <div className="flex items-center gap-2 rounded-md bg-white border border-slate-200 px-2.5 py-2 text-[10px] text-emerald-700 truncate">
                <PostgresLogo size={14} />
                <span className="truncate">app.current_org_id = &apos;org_7f2a&apos;</span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-white border border-slate-200 px-2.5 py-2 text-[10px] text-sky-700 truncate">
                <RedisLogo size={14} />
                <span className="truncate">jti:revoked · xth_live_sha256</span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-white border border-slate-200 px-2.5 py-2 text-[10px] text-slate-700 truncate">
                <AmazonS3Logo size={14} />
                <span className="truncate">s3://artifacts/org_7f2a/ds_09/</span>
              </div>
            </div>

            <p className="text-[13px] text-muted-foreground leading-relaxed">
              {t("rls.description")}
            </p>
          </article>

          {/* 4. Durable JetStream Workers (Staggered Bottom-Left + Floating S3 Badge) */}
          <div className="lg:col-span-4 lg:ml-4 lg:-mt-2 flex flex-col items-start gap-3.5">
            <article className="w-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_14px_38px_-12px_rgba(15,23,42,0.08)] flex flex-col justify-between gap-4 hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  <h3 className="text-base sm:text-[17px] text-foreground">
                    {t("workers.title")}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <NatsLogo size={18} />
                  <PrefectLogo size={18} />
                </div>
              </div>

              <div className="rounded-xl bg-slate-50/90 border border-slate-200/80 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between gap-1.5 text-[10px]">
                  <span className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white border border-slate-200 px-2 py-1 text-slate-800">
                    <PostgresLogo size={12} />
                    <span>{t("workers.outbox")}</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-primary shrink-0" aria-hidden="true" />
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-200 px-2 py-1 text-emerald-800 font-semibold">
                    <NatsLogo size={12} />
                    <span>{t("workers.jetstream")}</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-primary shrink-0" aria-hidden="true" />
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-2 py-1 text-emerald-700 font-semibold">
                    <PrefectLogo size={12} />
                    <span>{t("workers.prefect")}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white border border-slate-200 px-3 py-2 text-[10px]">
                  <span className="text-sky-700">{t("workers.heartbeat")}</span>
                  <span className="font-semibold text-emerald-700">{t("workers.dlq")}</span>
                </div>
              </div>

              <p className="text-[13px] text-muted-foreground leading-relaxed">
                {t("workers.description")}
              </p>
            </article>

            <span className="hidden lg:inline-flex items-center gap-2 ml-6 rounded-full bg-orange-50 border border-orange-200 px-3.5 py-1.5 text-[11px] text-orange-900 shadow-xs">
              <AmazonS3Logo size={15} />
              <span>{t("badges.s3")}</span>
            </span>
          </div>

          {/* 5. Vaulted Data Connectors (Centerpiece Staggered Lower) */}
          <article className="lg:col-span-4 lg:mt-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_14px_38px_-12px_rgba(15,23,42,0.08)] flex flex-col justify-between gap-4 hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2.5">
                <Plug className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <h3 className="text-base sm:text-[17px] font-bold text-foreground">
                  {t("connectors.title")}
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <AmazonS3Logo size={17} />
                <SnowflakeLogo size={17} />
                <PostgresLogo size={17} />
              </div>
            </div>

            <div className="rounded-xl bg-slate-50/90 border border-slate-200/80 p-3.5 grid grid-cols-2 gap-2.5">
              {[
                { name: "Amazon S3", Logo: AmazonS3Logo },
                { name: "PostgreSQL", Logo: PostgresLogo },
                { name: "Snowflake", Logo: SnowflakeLogo },
                { name: "MinIO Store", Logo: MinIOLogo },
                { name: "DuckDB 2.0", Logo: DuckDBLogo },
                { name: t("connectors.restApi"), Logo: RestApiLogo },
              ].map((conn) => {
                const ConnLogo = conn.Logo;
                return (
                  <div
                    key={conn.name}
                    className="flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-2.5 py-2 text-[11px] font-semibold text-slate-800 shadow-xs"
                  >
                    <ConnLogo size={15} />
                    <span className="truncate">{conn.name}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-[13px] text-muted-foreground leading-relaxed">
              {t("connectors.description")}
            </p>
          </article>

          {/* 6. Real-Time Usage Metering (Bottom-Right + Floating RLS Verified Pill) */}
          <div className="lg:col-span-4 lg:mt-2 flex flex-col items-end gap-3.5">
            <article className="w-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_14px_38px_-12px_rgba(15,23,42,0.08)] flex flex-col justify-between gap-4 hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2.5">
                  <BarChart2 className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  <h3 className="text-base sm:text-[17px] font-bold text-foreground">
                    {t("metering.title")}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <StripeLogo size={18} />
                  <GoLogo size={18} />
                </div>
              </div>

              <div className="rounded-xl bg-slate-50/90 border border-slate-200/80 p-4 space-y-2.5">
                {[
                  { label: t("metering.storageQuota"), val: "320/500 GiB", pct: "64%", barColor: "bg-primary", textColor: "text-emerald-700" },
                  { label: t("metering.computeHours"), val: "19.2/50 hrs", pct: "38%", barColor: "bg-sky-500", textColor: "text-sky-700" },
                  { label: t("metering.workerSlots"), val: t("metering.activeSlots"), pct: "40%", barColor: "bg-emerald-500", textColor: "text-emerald-700" },
                ].map((bar) => (
                  <div key={bar.label} className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-600">{bar.label}</span>
                      <span className={`font-semibold ${bar.textColor}`}>
                        {bar.val}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-200/90 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${bar.barColor}`}
                        style={{ width: bar.pct }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[13px] text-muted-foreground leading-relaxed">
                {t("metering.description")}
              </p>
            </article>

            <span className="hidden lg:inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-200 px-3.5 py-1.5 text-[11px] text-sky-900 shadow-xs">
              <PostgresLogo size={15} />
              <span>{t("badges.rlsVerified")}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
