import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * Geometric Xether AI emblem matching the Penpot design system.
 */
export function XetherBrandMark({
  size = 28,
  variant = "dark",
  className = "",
}: LogoProps & { variant?: "dark" | "light" }) {
  const isLight = variant === "light";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-lg border ${
        isLight
          ? "bg-slate-900 border-slate-700"
          : "bg-[#0D151E] border-[#294947]"
      } ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={Math.round(size * 0.6)}
        height={Math.round(size * 0.6)}
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect
          x="12"
          y="2.5"
          width="13.4"
          height="13.4"
          rx="2.6"
          transform="rotate(45 12 2.5)"
          fill="#78FCD6"
        />
        <circle
          cx="12"
          cy="12"
          r="3.1"
          fill={isLight ? "#0F172A" : "#0D151E"}
        />
      </svg>
    </span>
  );
}

/* ─── Partner Company Logos (Full Color) ──────────────────────────────────── */

export function OpenAILogo({ size = 20, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#10A37F" />
      <path
        d="M18.6 10.3a4.3 4.3 0 0 0-.37-3.53 4.35 4.35 0 0 0-4.68-2.08 4.34 4.34 0 0 0-3.26-1.45 4.35 4.35 0 0 0-4.15 3.01 4.35 4.35 0 0 0-2.9 2.11 4.35 4.35 0 0 0 .54 5.09 4.3 4.3 0 0 0 .37 3.53 4.35 4.35 0 0 0 4.68 2.08 4.34 4.34 0 0 0 3.26 1.45 4.35 4.35 0 0 0 4.15-3.01 4.35 4.35 0 0 0 2.9-2.11 4.35 4.35 0 0 0-.54-5.09Z"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="2.2" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
    </svg>
  );
}

export function DatabricksLogo({ size = 20, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <polygon points="12,2 21,7 12,12 3,7" fill="#FF3621" />
      <polygon points="3,10.5 12,15.5 21,10.5 21,13 12,18 3,13" fill="#FF5A45" />
      <polygon points="3,15.5 12,20.5 21,15.5 21,18 12,23 3,18" fill="#FF3621" />
    </svg>
  );
}

export function SnowflakeLogo({ size = 20, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#29B5E8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="3.3" y1="7" x2="20.7" y2="17" />
      <line x1="20.7" y1="7" x2="3.3" y2="17" />
      <polyline points="9,4 12,7 15,4" />
      <polyline points="9,20 12,17 15,20" />
      <polyline points="4,10.5 7,10 6.5,6.5" />
      <polyline points="20,13.5 17,14 17.5,17.5" />
      <polyline points="17.5,6.5 17,10 20,10.5" />
      <polyline points="6.5,17.5 7,14 4,13.5" />
    </svg>
  );
}

export function HuggingFaceLogo({ size = 20, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="#FFD21E" stroke="#F59E0B" strokeWidth="1.2" />
      <circle cx="8.8" cy="10" r="1.3" fill="#1F2937" />
      <circle cx="15.2" cy="10" r="1.3" fill="#1F2937" />
      <circle cx="7.4" cy="12" r="1.2" fill="#FB7185" fillOpacity="0.65" />
      <circle cx="16.6" cy="12" r="1.2" fill="#FB7185" fillOpacity="0.65" />
      <path d="M8.5 13.8a3.8 3.8 0 0 0 7 0" fill="none" stroke="#1F2937" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function StripeLogo({ size = 20, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#635BFF" />
      <path
        d="M11.6 9.3c0-.7.6-1 1.5-1 1.3 0 2.9.4 4.1 1.1V6.3a10.4 10.4 0 0 0-4.1-.8c-3.3 0-5.5 1.7-5.5 4.5 0 4.4 6 3.7 6 5.6 0 .8-.7 1.1-1.7 1.1-1.4 0-3.3-.6-4.7-1.4v3.2a11.8 11.8 0 0 0 4.7 1c3.4 0 5.7-1.7 5.7-4.5 0-4.7-6-3.9-6-5.7Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function VercelLogo({ size = 20, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#111827" stroke="#374151" strokeWidth="1" />
      <polygon points="12,5.5 19,17.5 5,17.5" fill="#FFFFFF" />
    </svg>
  );
}

/* ─── Data Stack & Connector Logos (Full Color) ───────────────────────────── */

export function PostgresLogo({ size = 18, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <path
        d="M17.2 4.2c-1.8-1.4-4.1-1.4-5.2-.5-1.1-.9-3.4-.9-5.2.5C4.5 6 4 9.5 5.4 12.6c1 2.2 2.4 3.4 3.7 3.7v3.4c0 1 .8 1.8 1.8 1.8.8 0 1.4-.5 1.6-1.2l.4-1.8c.5.1 1 .1 1.6 0 .8 2.2 2.2 3.1 3.7 2.8 1.2-.3 1.7-1.5 1-2.5-.6-.8-1.3-.9-1.7-1.7 1.6-1.7 2.6-4.3 2.5-7-.1-2.4-.9-4.5-2.8-5.9Z"
        fill="#336791"
      />
      <circle cx="9.2" cy="9.4" r="1.2" fill="#FFFFFF" />
      <circle cx="14.8" cy="9.4" r="1.2" fill="#FFFFFF" />
      <path d="M12 12v6" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function DuckDBLogo({ size = 18, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="#FFF000" />
      <circle cx="10.5" cy="12" r="5" fill="#0F172A" />
      <path d="M15.5 11.2h4.2c.6 0 1 .4 1 .8s-.4.8-1 .8h-4.2Z" fill="#0F172A" />
      <circle cx="11.8" cy="10.8" r="1.1" fill="#FFF000" />
    </svg>
  );
}

export function AmazonS3Logo({ size = 18, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <path d="M4.5 5.5 12 2.5l7.5 3-1.8 13L12 21.5 6.3 18.5 4.5 5.5Z" fill="#E05243" />
      <path d="M4.5 5.5 12 8.2V21.5L6.3 18.5 4.5 5.5Z" fill="#B83B2E" />
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.4" fill="#FF8C42" />
    </svg>
  );
}

export function MinIOLogo({ size = 18, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="#C72E49" />
      <path d="M6.5 15.5c2.2-4.8 6-7.8 11-8.5-2.5 2.5-3.8 5.4-4 8.8l-2.6-2.4-4.4 2.1Z" fill="#FFFFFF" />
    </svg>
  );
}

export function PolarsLogo({ size = 18, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="1" />
      <rect x="6" y="7" width="12" height="2.4" rx="1.2" fill="#38BDF8" />
      <rect x="6" y="11" width="9" height="2.4" rx="1.2" fill="#F97316" />
      <rect x="6" y="15" width="12" height="2.4" rx="1.2" fill="#38BDF8" />
    </svg>
  );
}

export function NatsLogo({ size = 18, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <rect x="3" y="4" width="18" height="14" rx="3" fill="#27AAE1" />
      <polygon points="8,18 12,22 14,18" fill="#34A574" />
      <path d="M7.5 14V8l9 6V8" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PrefectLogo({ size = 18, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#024DFD" />
      <polygon points="12,5 18,9 12,13 6,9" fill="#FFFFFF" />
      <polygon points="12,13 18,17 12,20 6,17" fill="#7DD3FC" />
    </svg>
  );
}

export function RedisLogo({ size = 18, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <polygon points="12,3 21,7.5 12,12 3,7.5" fill="#DC382D" />
      <polygon points="3,11.5 12,16 21,11.5 12,14" fill="#A41E11" />
      <polygon points="3,15.5 12,20 21,15.5 12,18" fill="#DC382D" />
      <circle cx="12" cy="7.5" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

export function RestApiLogo({ size = 18, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#065F46" />
      <path d="M9 8 5.5 12 9 16M15 8l3.5 4L15 16M13 7l-2 10" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GoLogo({ size = 18, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="5" fill="#00ADD8" />
      <path d="M10.5 12H7.2a2.8 2.8 0 1 1 2.1-3.3M16.5 9.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6Z" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
