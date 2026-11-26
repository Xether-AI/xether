import React from "react";
import {
  DatabricksLogo,
  HuggingFaceLogo,
  OpenAILogo,
  SnowflakeLogo,
  StripeLogo,
  VercelLogo,
} from "./BrandLogos";

const PARTNERS = [
  { name: "OpenAI", Logo: OpenAILogo, textClass: "font-semibold text-slate-50" },
  { name: "databricks", Logo: DatabricksLogo, textClass: "font-bold text-slate-50" },
  { name: "snowflake", Logo: SnowflakeLogo, textClass: "font-semibold text-sky-100" },
  { name: "Hugging Face", Logo: HuggingFaceLogo, textClass: "font-bold text-amber-200" },
  { name: "stripe", Logo: StripeLogo, textClass: "font-bold text-indigo-100" },
  { name: "Vercel", Logo: VercelLogo, textClass: "font-bold text-white" },
];

export function SocialProof() {
  return (
    <section className="w-full py-10 md:py-12 border-y border-white/[0.06] bg-[#0C111A]/85 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-6">
        <p className="text-center text-[11px] font-mono font-medium tracking-[0.16em] uppercase text-slate-400">
          Built for modern AI &amp; data infrastructure teams
        </p>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
          {PARTNERS.map((partner) => {
            const Logo = partner.Logo;
            return (
              <div
                key={partner.name}
                className="inline-flex items-center gap-2.5 px-2 py-1 opacity-90 hover:opacity-100 hover:scale-[1.03] transition-all"
              >
                <Logo size={24} />
                <span className={`text-[15px] tracking-tight ${partner.textClass}`}>
                  {partner.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
