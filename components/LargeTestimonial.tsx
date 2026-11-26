import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { DatabricksLogo } from "./BrandLogos";

export function LargeTestimonial() {
  return (
    <section className="w-full py-16 md:py-20 px-4 sm:px-6 border-y border-white/[0.06] bg-[#0C111A]/85">
      <div className="max-w-[940px] mx-auto flex flex-col items-center text-center gap-6">
        <Quote className="w-8 h-8 text-primary fill-primary/20" aria-hidden="true" />

        <blockquote className="text-2xl sm:text-3xl md:text-[32px] font-medium leading-snug tracking-tight text-foreground">
          &ldquo;Xether&apos;s deterministic checkpoints and SHA-256 dataset
          versioning transformed how we ship production models. It&apos;s the
          missing reliability layer in the AI stack.&rdquo;
        </blockquote>

        <div className="flex items-center justify-center gap-3.5 pt-2">
          <Image
            src="/images/avatars/dianne-russell.png"
            alt="Dianne Russell avatar"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover border border-[#265955] shrink-0"
          />
          <div className="text-left">
            <div className="text-[15px] font-semibold text-foreground">
              Dianne Russell
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-[13px] text-muted-foreground">
              <span>VP of Data Infrastructure ·</span>
              <DatabricksLogo size={14} />
              <span className="font-medium text-foreground">
                Databricks Partner
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
