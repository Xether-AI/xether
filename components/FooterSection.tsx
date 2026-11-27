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
              Data quality as infrastructure. Built for deterministic ML &amp;
              enterprise governance.
            </p>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_COLUMNS.map((col) => {
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

        {/* Bottom Legal + Social Bar */}
        <div className="border-t border-slate-200/90 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
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
