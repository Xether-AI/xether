import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeroBackground } from "./HeroBackground";

export function HeroSection() {
  return (
    <section className="relative w-full h-[600px] lg:h-[800px] flex flex-col items-center justify-center text-center px-4 overflow-hidden rounded-3xl mt-6 border border-white/5">
      <HeroBackground />

      <div className="relative z-10 max-w-3xl space-y-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
          Reliable Data, <br />
          <span className="text-primary italic">Ready for AI</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto font-medium">
          Xether AI automates the fragile parts of data infrastructure. Collect,
          clean, and version your data with enterprise reliability.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/login">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              Start Automating
            </Button>
          </Link>
          <Link href="https://docs.xether.ai">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-semibold rounded-full border-white/10 hover:bg-white/5"
            >
              Read the Docs
            </Button>
          </Link>
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
