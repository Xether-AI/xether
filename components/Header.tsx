"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  BookOpen,
  Cpu,
  CreditCard,
  Layers,
  LogIn,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { XetherBrandMark } from "./BrandLogos";

const AUTH_ROUTES = ["/login", "/signup"];

export function Header() {
  const pathname = usePathname();
  const t = useTranslations("Header");
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(`${route}/`),
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: t("nav.platform"), href: "/#features-section", icon: Layers },
    { name: t("nav.architecture"), href: "/#architecture-section", icon: Cpu },
    { name: t("nav.pricing"), href: "/#pricing-section", icon: CreditCard },
    {
      name: t("nav.docs"),
      href: "https://docs.xether.ai",
      icon: BookOpen,
      external: true,
    },
  ];

  useEffect(() => {
    if (isAuthRoute) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAuthRoute]);

  if (isAuthRoute) return null;

  return (
    <>
      <header className="floating-nav-container px-3 sm:px-6">
        <div
          data-scrolled={isScrolled ? "true" : "false"}
          className="floating-nav-pill max-w-306 mx-auto h-16 px-4 sm:px-5 rounded-full flex items-center justify-between gap-4"
        >
          {/* Left: Geometric Brand Mark + Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full pr-1"
          >
            <XetherBrandMark size={28} />
            <span className="text-lg font-bold tracking-tight text-foreground">
              Xether{" "}
              <span className="text-primary group-hover:opacity-90 transition-opacity">
                AI
              </span>
            </span>
          </Link>

          {/* Center: Compact Navigation */}
          <nav
            className="hidden lg:flex items-center gap-6"
            aria-label={t("primaryNav")}
          >
            {navItems.map((item) => {
              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>{item.name}</span>
                  </a>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Auth Action Pills */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium bg-white/85 border border-slate-200/90 text-slate-700 hover:bg-slate-50 hover:text-slate-950 hover:border-primary/40 shadow-2xs transition-all"
            >
              <span>{t("signIn")}</span>
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 transition-all"
            >
              <span>{t("startFree")}</span>
            </Link>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={isMobileMenuOpen}
              className="p-2 rounded-full text-slate-700 hover:bg-slate-900/5 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Floating Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-4 top-22 z-40 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 p-5 flex flex-col gap-3 shadow-[0_20px_50px_rgba(15,23,42,0.14)] md:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-primary transition-colors"
              >
                <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="h-px bg-slate-200 my-1" />
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-medium bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100"
            >
              <LogIn className="w-4 h-4" aria-hidden="true" />
              <span>{t("signIn")}</span>
            </Link>
            <Link
              href="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-bold bg-primary text-primary-foreground"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>{t("startFree")}</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
