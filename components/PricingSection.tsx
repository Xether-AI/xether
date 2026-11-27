"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  Mail,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

import {
  AmazonS3Logo,
  DuckDBLogo,
  PostgresLogo,
  SnowflakeLogo,
} from "./BrandLogos";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const t = useTranslations("Pricing");

  const plans = [
    {
      name: t("plans.sandbox.name"),
      icon: Terminal,
      monthlyPrice: "$0",
      annualPrice: "$0",
      period: t("perMonth"),
      badge: null,
      description: t("plans.sandbox.description"),
      cta: t("plans.sandbox.cta"),
      ctaIcon: ArrowRight,
      href: "/signup",
      featured: false,
      features: t.raw("plans.sandbox.features") as string[],
    },
    {
      name: t("plans.pro.name"),
      icon: Zap,
      monthlyPrice: "$199",
      annualPrice: "$159",
      period: t("perMonth"),
      badge: t("plans.pro.badge"),
      description: t("plans.pro.description"),
      cta: t("plans.pro.cta"),
      ctaIcon: Sparkles,
      href: "/signup",
      featured: true,
      features: t.raw("plans.pro.features") as string[],
    },
    {
      name: t("plans.enterprise.name"),
      icon: Building2,
      monthlyPrice: "Custom",
      annualPrice: "Custom",
      period: "",
      badge: t("plans.enterprise.badge"),
      description: t("plans.enterprise.description"),
      cta: t("plans.enterprise.cta"),
      ctaIcon: Mail,
      href: "/contact",
      featured: false,
      features: t.raw("plans.enterprise.features") as string[],
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 py-12 md:py-16">
      <div className="max-w-300 mx-auto flex flex-col items-center gap-10">
        {/* Header */}
        <div className="max-w-175 mx-auto flex flex-col items-center text-center gap-3.5">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[12px] font-semibold tracking-wider uppercase text-emerald-700">
            <span>{t("badge")}</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-foreground leading-tight">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-150 leading-relaxed">
            {t("subtitle")}
          </p>

          {/* Toggle Pill */}
          <div className="mt-2 p-1 rounded-full bg-slate-100 border border-slate-200 inline-flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${!isAnnual
                ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
                }`}
            >
              {t("monthly")}
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${isAnnual
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
                }`}
            >
              <span>{t("annualSave")}</span>
            </button>
          </div>
        </div>

        {/* 3 Equal-Height Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6 border transition-colors ${plan.featured
                  ? "bg-gradient-to-b from-emerald-50/75 via-white to-white border-primary/70 shadow-[0_18px_45px_-12px_rgba(14,165,122,0.16)]"
                  : "bg-white border-slate-200 hover:border-slate-300 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.06)]"
                  }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2">
                      <h3 className="text-lg font-bold text-foreground">
                        {plan.name}
                      </h3>
                    </div>
                    {plan.badge && (
                      <span
                        className={`flex items-center justify-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${plan.featured
                          ? "bg-emerald-100/80 border-emerald-300/80 text-emerald-800"
                          : "bg-slate-100 border-slate-200 text-slate-600"
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
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${plan.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20"
                      : "bg-white border border-slate-300 text-slate-900 hover:bg-slate-50 hover:border-primary/40"
                      }`}
                  >
                    <span>{plan.cta}</span>
                  </Link>

                  <div className="h-px bg-slate-200/90" />

                  <ul className="space-y-2.5">
                    {plan.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-2.5 text-[13px] text-muted-foreground"
                      >
                        <Check
                          className={`w-3.5 h-3.5 shrink-0 ${plan.featured ? "text-primary" : "text-emerald-600"
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
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs text-slate-500">
          <span>{t("attribution")}</span>
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
