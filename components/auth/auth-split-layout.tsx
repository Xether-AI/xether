"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { AuthVisualHero } from "./auth-visual-hero";
import { XetherBrandMark } from "@/components/BrandLogos";
import { ThemeToggle } from "@/components/ThemeToggle";

export function AuthSplitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen lg:h-screen w-full bg-background flex flex-col lg:flex-row lg:overflow-hidden">
      {/* Subtle architectural background grid + soft mint radial atmosphere */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="split-auth-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#split-auth-grid)" />
        </svg>
      </div>
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 75% 15%, rgba(120, 252, 214, 0.08), transparent 70%)",
        }}
      />

      {/* Left Panel: Visual Brand Showcase (Desktop) */}
      <div className="hidden lg:flex lg:w-[48%] xl:w-1/2 h-full relative border-r border-border/80 overflow-hidden">
        <AuthVisualHero />
      </div>

      {/* Right Panel: Standalone Auth Flow (No global navbar) */}
      <div className="flex-1 flex flex-col relative min-h-screen lg:min-h-0 lg:h-full overflow-y-auto overflow-x-hidden">
        {/* Minimal top bar: Brand mark on mobile / Back to home pill on desktop + ThemeToggle */}
        <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 lg:px-10 pt-5 pb-2">
          <Link
            href="/"
            className="inline-flex lg:hidden items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full pr-1"
          >
            <XetherBrandMark size={28} />
            <span className="text-base font-bold tracking-tight text-foreground">
              Xether{" "}
              <span className="text-primary group-hover:opacity-90 transition-opacity">
                AI
              </span>
            </span>
          </Link>

          <Link
            href="/"
            className="hidden lg:inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to home</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="inline-flex lg:hidden items-center gap-1.5 rounded-full border border-border/80 bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Home</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>

        {/* Centered Form Content */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative z-10 flex-1 flex flex-col items-center justify-center py-6 px-4 sm:px-8 lg:px-12"
        >
          {children}
        </motion.div>

        {/* Bottom Footer */}
        <div className="relative z-10 px-6 pb-6 pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-primary font-medium">Xether AI</span>. All
            rights reserved.
          </p>
          <span className="hidden sm:inline text-border">•</span>
          <div className="flex items-center gap-3.5">
            <a
              href="https://docs.xether.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Docs
            </a>
            <Link href="/api" className="hover:text-foreground transition-colors">
              API
            </Link>
            <Link
              href="/contact"
              className="hover:text-foreground transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
