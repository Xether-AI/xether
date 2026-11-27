"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HelpCircle, Minus, Plus, Quote } from "lucide-react";
import { useTranslations } from "next-intl";

import { HuggingFaceLogo, PostgresLogo } from "./BrandLogos";

const QUOTE_ASSETS = [
  { avatar: "/images/avatars/annette-black.png", Logo: HuggingFaceLogo },
  { avatar: "/images/avatars/robert-fox.png", Logo: PostgresLogo },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const t = useTranslations("FAQ");

  const faqItems = t.raw("items") as { question: string; answer: string }[];
  const engineerQuotes = t.raw("quotes") as { quote: string; author: string }[];

  return (
    <section className="w-full py-16 md:py-20 px-4 sm:px-6 border-y border-slate-200/80 bg-slate-50/80">
      <div className="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 lg:gap-12 items-start">
        {/* Left Column: Intro + Proof Cards */}
        <div className="space-y-4">
          <span className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[12px] font-semibold tracking-wider uppercase text-emerald-700">
            <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t("badge")}</span>
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {t("title")}
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="space-y-3 pt-2">
            {engineerQuotes.map((item, index) => {
              const asset = QUOTE_ASSETS[index % QUOTE_ASSETS.length];
              const Logo = asset.Logo;
              return (
                <div
                  key={item.author}
                  className="rounded-xl border border-slate-200 bg-white p-4 space-y-2.5 shadow-xs"
                >
                  <div className="flex items-start gap-2.5">
                    <Quote
                      className="w-4 h-4 text-primary shrink-0 mt-0.5 fill-primary/20"
                      aria-hidden="true"
                    />
                    <p className="text-[13px] text-foreground leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pl-6 text-[12px] font-medium text-emerald-700">
                    <Image
                      src={asset.avatar}
                      alt={item.author}
                      width={20}
                      height={20}
                      className="w-5 h-5 rounded-full object-cover border border-emerald-200 shrink-0"
                    />
                    <span>{item.author}</span>
                    <Logo size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Accessible Accordion */}
        <div className="space-y-3">
          {faqItems.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`rounded-xl border transition-colors ${isOpen
                    ? "bg-white border-emerald-300 shadow-sm"
                    : "bg-white/90 border-slate-200 hover:border-slate-300"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
                >
                  <span className="text-[15px] font-semibold text-foreground">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  ) : (
                    <Plus className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-[13px] text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
