import React from "react";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1220 810"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="opacity-40"
      >
        <defs>
          <pattern
            id="grid"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
            x="-20.0891"
            y="9.2"
          >
            <rect
              width="35.6"
              height="35.6"
              stroke="currentColor"
              strokeOpacity="0.11"
              strokeWidth="0.4"
              strokeDasharray="2 2"
              fill="none"
            />
          </pattern>

          <filter id="blur-main">
            <feGaussianBlur stdDeviation="80" />
          </filter>
        </defs>

        {/* Base Grid */}
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          className="text-foreground"
        />

        {/* Decorative elements with brand colors */}
        <g opacity="0.15">
          <circle cx="200" cy="150" r="40" fill="var(--primary)" />
          <circle cx="1020" cy="150" r="40" fill="var(--primary)" />
          <circle cx="520" cy="400" r="60" fill="var(--primary)" />
          <circle cx="770" cy="400" r="40" fill="var(--primary)" />
        </g>

        {/* Docs-style glow effects */}
        <g filter="url(#blur-main)" opacity="0.2">
          <path
            d="M1000 -100 L1200 -100 L1200 800 L400 800 Q800 500 1000 -100"
            fill="var(--primary)"
          />
        </g>
      </svg>

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] opacity-60" />
    </div>
  );
}
