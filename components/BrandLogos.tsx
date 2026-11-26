import React from "react";
import Image from "next/image";

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

/**
 * Cloud-prism emblem for the xether-cloud Organization switcher (replaces XC initials).
 */
export function XetherCloudLogo({ size = 18, className = "" }: LogoProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded bg-slate-900 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={Math.round(size * 0.72)}
        height={Math.round(size * 0.72)}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6.5 18h11a4 4 0 0 0 .7-7.94A5.5 5.5 0 0 0 7.45 8.5 4.2 4.2 0 0 0 6.5 18Z"
          fill="#78FCD6"
        />
        <circle cx="12.5" cy="13" r="1.9" fill="#0F172A" />
      </svg>
    </span>
  );
}

function BrandImage({
  src,
  size = 20,
  className = "",
}: LogoProps & { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
      className={`shrink-0 object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/* ─── Official Partner Company Logos (Full Color) ─────────────────────────── */

export function OpenAILogo({ size = 20, className = "" }: LogoProps) {
  return <BrandImage src="/logos/brands/openai.svg" size={size} className={className} />;
}

export function DatabricksLogo({ size = 20, className = "" }: LogoProps) {
  return <BrandImage src="/logos/brands/databricks.svg" size={size} className={className} />;
}

export function SnowflakeLogo({ size = 20, className = "" }: LogoProps) {
  return <BrandImage src="/logos/brands/snowflake.svg" size={size} className={className} />;
}

export function HuggingFaceLogo({ size = 20, className = "" }: LogoProps) {
  return <BrandImage src="/logos/brands/huggingface.svg" size={size} className={className} />;
}

export function StripeLogo({ size = 20, className = "" }: LogoProps) {
  return <BrandImage src="/logos/brands/stripe.svg" size={size} className={className} />;
}

export function VercelLogo({ size = 20, className = "" }: LogoProps) {
  return <BrandImage src="/logos/brands/vercel.svg" size={size} className={className} />;
}

/* ─── Official Data Stack & Connector Logos (Full Color) ──────────────────── */

export function PostgresLogo({ size = 18, className = "" }: LogoProps) {
  return <BrandImage src="/logos/brands/postgresql.svg" size={size} className={className} />;
}

export function DuckDBLogo({ size = 18, className = "" }: LogoProps) {
  return <BrandImage src="/logos/brands/duckdb.svg" size={size} className={className} />;
}

export function AmazonS3Logo({ size = 18, className = "" }: LogoProps) {
  return <BrandImage src="/logos/brands/amazons3.svg" size={size} className={className} />;
}

export function MinIOLogo({ size = 18, className = "" }: LogoProps) {
  return <BrandImage src="/logos/brands/minio.svg" size={size} className={className} />;
}

export function PolarsLogo({ size = 18, className = "" }: LogoProps) {
  return <BrandImage src="/logos/brands/polars.svg" size={size} className={className} />;
}

export function NatsLogo({ size = 18, className = "" }: LogoProps) {
  return <BrandImage src="/logos/brands/nats.svg" size={size} className={className} />;
}

export function PrefectLogo({ size = 18, className = "" }: LogoProps) {
  return <BrandImage src="/logos/brands/prefect.svg" size={size} className={className} />;
}

export function RedisLogo({ size = 18, className = "" }: LogoProps) {
  return <BrandImage src="/logos/brands/redis.svg" size={size} className={className} />;
}

export function RestApiLogo({ size = 18, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#065F46" />
      <path
        d="M9 8 5.5 12 9 16M15 8l3.5 4L15 16M13 7l-2 10"
        fill="none"
        stroke="#34D399"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GoLogo({ size = 18, className = "" }: LogoProps) {
  return <BrandImage src="/logos/brands/go.svg" size={size} className={className} />;
}
