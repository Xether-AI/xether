"use client";

import React from "react";
import Link from "next/link";
import { Building2, Github, Layers, ShieldCheck, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";

import { XetherBrandMark } from "./BrandLogos";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function FooterSection() {
  const t = useTranslations("Footer");

  const footerColumns = [
    {
      title: t("columns.product.title"),
      icon: Layers,
      links: [
        { label: t("columns.product.streamingEngine"), href: "/#features-section" },
        { label: t("columns.product.datasetVersioning"), href: "/#architecture-section" },
        { label: t("columns.product.connectors"), href: "/#architecture-section" },
        { label: t("columns.product.pricing"), href: "/#pricing-section" },
      ],
    },
    {
      title: t("columns.platform.title"),
      icon: ShieldCheck,
      links: [
        { label: t("columns.platform.forceRls"), href: "/#architecture-section" },
        { label: t("columns.platform.sseTelemetry"), href: "/#architecture-section" },
        { label: t("columns.platform.apiReference"), href: "/api" },
        { label: t("columns.platform.status"), href: "/dashboard" },
      ],
    },
    {
      title: t("columns.company.title"),
      icon: Building2,
      links: [
        { label: t("columns.company.about"), href: "/#features-section" },
        {
          label: t("columns.company.blog"),
          href: "https://docs.xether.ai",
          external: true,
        },
        { label: t("columns.company.signIn"), href: "/login" },
        { label: t("columns.company.contact"), href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="w-full px-4 sm:px-6 pt-10 pb-14">
      <div className="max-w-300 mx-auto border-t border-slate-200/90 pt-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 items-start">
          {/* Brand Column */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <XetherBrandMark size={26} />
              <span className="text-lg font-bold tracking-tight text-foreground">
                Xether <span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-[13px] text-slate-500 leading-relaxed max-w-67.5">
              {t("tagline")}
            </p>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerColumns.map((col) => {
              return (
                <nav
                  key={col.title}
                  aria-label={`${col.title} links`}
                  className="space-y-3"
                >
                  <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-foreground">
                    <span>{col.title}</span>
                  </div>
                  <ul className="space-y-2">
                    {col.links.map((lnk) => (
                      <li key={lnk.label}>
                        {lnk.external ? (
                          <a
                            href={lnk.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[13px] text-muted-foreground hover:text-primary transition-colors"
                          >
                            {lnk.label}
                          </a>
                        ) : (
                          <Link
                            href={lnk.href}
                            className="text-[13px] text-muted-foreground hover:text-primary transition-colors"
                          >
                            {lnk.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              );
            })}
          </div>
        </div>

        {/* Bottom Legal, Language Switcher & Social Bar */}
        <div className="border-t border-slate-200/90 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t("copyright")}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <span>{t("legal")}</span>
            <LanguageSwitcher />
            <div className="flex items-center gap-3.5">
              <a
                href="https://github.com/xether-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-slate-500 hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/xetherai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-slate-500 hover:text-primary transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
