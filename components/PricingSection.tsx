"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  CreditCard,
  Mail,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import {
  AmazonS3Logo,
  DuckDBLogo,
  PostgresLogo,
  SnowflakeLogo,
  StripeLogo,
} from "./BrandLogos";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free Sandbox",
      icon: Terminal,
      monthlyPrice: "$0",
      annualPrice: "$0",
      period: "/month",
      badge: null,
      description:
        "Validate streaming pipelines and dataset versioning on real workloads.",
      cta: "Start Free",
      ctaIcon: ArrowRight,
      href: "/signup",
      featured: false,
      features: [
        "3 team seats & basic RBAC",
        "10 GiB versioned S3 storage",
        "1 concurrent pipeline run",
        "1 hr streaming compute / mo",
        "SHA-256 multipart verification",
        "S3 & REST pull connectors",
      ],
    },
    {
      name: "Pro Team",
      icon: Zap,
      monthlyPrice: "$199",
      annualPrice: "$159",
      period: "/month",
      badge: "MOST POPULAR",
      description:
        "Production out-of-core streaming, live SSE telemetry, and team workspaces.",
      cta: "Start 14-Day Trial",
      ctaIcon: Sparkles,
      href: "/signup",
      featured: true,
      features: [
        "15 team seats & workspace roles",
        "500 GiB versioned S3 storage",
        "5 concurrent pipeline runs",
        "50 hrs streaming compute / mo",
        "Live SSE progress & checkpoint resume",
        "Postgres watermark, Snowflake & RBAC",
      ],
    },
    {
      name: "Enterprise Dedicated",
      icon: Building2,
      monthlyPrice: "Custom",
      annualPrice: "Custom",
      period: "",
      badge: "BYOC / VPC",
      description:
        "Dedicated tenant isolation, private VPC workers, and compliance SLAs.",
      cta: "Contact Engineering",
      ctaIcon: Mail,
      href: "/contact",
      featured: false,
      features: [
        "100+ seats & custom policies",
        "5 TiB+ storage & custom quotas",
        "25+ fair worker concurrency slots",
        "Dedicated VPC / BYOC deployment",
        "Postgres FORCE RLS & SSO / SAML",
        "24/7 SLA & immutable audit exports",
      ],
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-10">
        {/* Header */}
        <div className="max-w-[700px] mx-auto flex flex-col items-center text-center gap-3.5">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#10292B] border border-[#265955] px-3 py-1 text-[11px] font-mono font-semibold tracking-wider uppercase text-primary">
            <CreditCard className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Transparent Pricing</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Predictable Infrastructure Pricing
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-[600px] leading-relaxed">
            Start free in the Sandbox. Scale cleanly with transparent storage,
            compute, and concurrency quotas.
          </p>

          {/* Toggle Pill */}
          <div className="mt-2 p-1 rounded-full bg-card border border-[#222E3F] inline-flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                !isAnnual
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isAnnual
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Annual · Save 20%</span>
            </button>
          </div>
        </div>

        {/* 3 Equal-Height Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const TierIcon = plan.icon;
            const CtaIcon = plan.ctaIcon;
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6 border transition-colors ${
                  plan.featured
                    ? "bg-[#122029] border-primary/80 shadow-[0_16px_48px_-12px_rgba(120,252,214,0.16)]"
                    : "bg-card border-[#222E3F] hover:border-[#2C3D54]"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2">
                      <TierIcon
                        className={`w-4 h-4 ${
                          plan.featured ? "text-primary" : "text-muted-foreground"
                        }`}
                        aria-hidden="true"
                      />
                      <h3 className="text-lg font-bold text-foreground">
                        {plan.name}
                      </h3>
                    </div>
                    {plan.badge && (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold border ${
                          plan.featured
                            ? "bg-[#10292B] border-[#265955] text-primary"
                            : "bg-[#1A2434] border-[#222E3F] text-muted-foreground"
                        }`}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      {price}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {plan.description}
                  </p>

                  <Link
                    href={plan.href}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                      plan.featured
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-[#17202E] border border-[#2C3D54] text-foreground hover:bg-[#1E2A3C]"
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <CtaIcon className="w-4 h-4" aria-hidden="true" />
                  </Link>

                  <div className="h-px bg-[#222E3F]" />

                  <ul className="space-y-2.5">
                    {plan.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-2.5 text-[13px] text-muted-foreground"
                      >
                        <Check
                          className={`w-3.5 h-3.5 shrink-0 ${
                            plan.featured ? "text-primary" : "text-emerald-400"
                          }`}
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Billing & Connector Attribution Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs text-slate-400">
          <StripeLogo size={18} />
          <span>
            Usage metering &amp; billing powered by Stripe · Native connectors:
          </span>
          <div className="inline-flex items-center gap-2.5">
            <AmazonS3Logo size={16} />
            <PostgresLogo size={16} />
            <SnowflakeLogo size={16} />
            <DuckDBLogo size={16} />
          </div>
        </div>
      </div>
    </section>
  );
}
