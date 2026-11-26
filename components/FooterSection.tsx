import React from "react";
import Link from "next/link";
import {
  Building2,
  Github,
  Globe,
  Layers,
  ShieldCheck,
  Twitter,
} from "lucide-react";
import { XetherBrandMark } from "./BrandLogos";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    icon: Layers,
    links: [
      { label: "Streaming Engine", href: "/#features-section" },
      { label: "Dataset Versioning", href: "/#architecture-section" },
      { label: "Connectors", href: "/#architecture-section" },
      { label: "Pricing", href: "/#pricing-section" },
    ],
  },
  {
    title: "Platform",
    icon: ShieldCheck,
    links: [
      { label: "FORCE RLS Security", href: "/#architecture-section" },
      { label: "SSE Telemetry", href: "/#architecture-section" },
      { label: "API Reference", href: "/api" },
      { label: "Status", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    icon: Building2,
    links: [
      { label: "About", href: "/#features-section" },
      { label: "Engineering Blog", href: "https://docs.xether.ai", external: true },
      { label: "Sign In", href: "/login" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function FooterSection() {
  return (
    <footer className="w-full px-4 sm:px-6 pt-10 pb-14">
      <div className="max-w-[1200px] mx-auto border-t border-white/[0.08] pt-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 items-start">
          {/* Brand Column */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <XetherBrandMark size={26} />
              <span className="text-lg font-bold tracking-tight text-foreground">
                Xether <span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-[13px] text-slate-500 leading-relaxed max-w-[270px]">
              Data quality as infrastructure. Built for deterministic ML &amp;
              enterprise governance.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0E2921] border border-[#1E5242] px-3 py-1 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>All systems operational</span>
            </div>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_COLUMNS.map((col) => {
              const Icon = col.icon;
              return (
                <nav
                  key={col.title}
                  aria-label={`${col.title} links`}
                  className="space-y-3"
                >
                  <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-foreground">
                    <Icon className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
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

        {/* Bottom Legal + Social Bar */}
        <div className="border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Xether AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span>Privacy · Terms · Security</span>
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
              <Link
                href="/"
                aria-label="Website"
                className="text-slate-500 hover:text-primary transition-colors"
              >
                <Globe className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
