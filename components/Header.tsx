"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
import { ThemeToggle } from "./ThemeToggle";
import { XetherBrandMark } from "./BrandLogos";

const navItems = [
  { name: "Platform", href: "/#features-section", icon: Layers },
  { name: "Architecture", href: "/#architecture-section", icon: Cpu },
  { name: "Pricing", href: "/#pricing-section", icon: CreditCard },
  {
    name: "Docs",
    href: "https://docs.xether.ai",
    icon: BookOpen,
    external: true,
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="floating-nav-container sm:px-6">
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

          {/* Center: Compact Navigation with Icons */}
          <nav
            className="hidden lg:flex items-center gap-6"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => {
              if (item.external) {
                return (
                  <a
                    key={item.name}
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
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Theme Toggle + Auth Action Pills */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium bg-[#131C2B]/75 border border-[#2D3F58] text-foreground hover:bg-[#1A263A] hover:border-primary/40 transition-all"
            >
              <span>Sign In</span>
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/15 transition-all"
            >
              <span>Start Free</span>
            </Link>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              className="p-2 rounded-full text-foreground hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Floating Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-4 top-22 z-40 rounded-2xl bg-[#0D1420]/95 backdrop-blur-xl border border-primary/20 p-5 flex flex-col gap-3 shadow-2xl md:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium text-foreground hover:bg-white/5 hover:text-primary transition-colors"
              >
                <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="h-px bg-border my-1" />
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-medium bg-[#131C2B] border border-[#2D3F58] text-foreground"
            >
              <LogIn className="w-4 h-4" aria-hidden="true" />
              <span>Sign In</span>
            </Link>
            <Link
              href="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-bold bg-primary text-primary-foreground"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Start Free</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
