"use client";

import React from "react";
import { AuthVisualHero } from "./auth-visual-hero";
import { motion } from "framer-motion";

export function AuthSplitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen lg:h-screen w-full bg-background flex flex-col lg:flex-row lg:overflow-hidden">
      {/* Decorative background grid */}
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

      {/* Left Panel: Visual Showcase (Desktop) */}
      <div className="hidden lg:flex lg:w-[46%] xl:w-1/2 h-full relative items-center justify-center border-r border-border overflow-hidden pt-16">
        <AuthVisualHero />
      </div>

      {/* Right Panel: Form Content */}
      <div className="flex-1 flex flex-col relative h-full overflow-y-auto overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative z-10 flex-1 flex flex-col items-center justify-center pt-24 pb-10 px-4 sm:px-8 lg:px-14"
        >
          {children}
        </motion.div>

        <div className="relative z-10 px-6 pb-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-primary font-medium">Xether AI</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
