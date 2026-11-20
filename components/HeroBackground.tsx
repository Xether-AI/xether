import React from "react";

const highlightedCells = [
  { x: 699.711, y: 81, opacity: 0.08 },
  { x: 195.711, y: 153, opacity: 0.09 },
  { x: 1023.71, y: 153, opacity: 0.09 },
  { x: 123.711, y: 225, opacity: 0.09 },
  { x: 1095.71, y: 225, opacity: 0.09 },
  { x: 951.711, y: 297, opacity: 0.09 },
  { x: 231.711, y: 333, opacity: 0.07 },
  { x: 303.711, y: 405, opacity: 0.07 },
  { x: 87.7109, y: 405, opacity: 0.09 },
  { x: 519.711, y: 405, opacity: 0.08 },
  { x: 771.711, y: 405, opacity: 0.09 },
  { x: 591.711, y: 477, opacity: 0.07 },
];

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1220 810"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <g clipPath="url(#hero_clip)">
          <mask
            id="hero_grid_mask"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="10"
            y="-1"
            width="1200"
            height="812"
          >
            <rect
              x="10"
              y="-0.84668"
              width="1200"
              height="811.693"
              fill="url(#hero_mask_grad)"
            />
          </mask>

          <g mask="url(#hero_grid_mask)">
            {/* Dashed 36x36 Grid */}
            <rect
              x="-20"
              y="-1"
              width="1260"
              height="812"
              fill="url(#hero_dashed_grid)"
            />

            {/* Highlighted Grid Cells */}
            {highlightedCells.map((cell, idx) => (
              <rect
                key={idx}
                x={cell.x}
                y={cell.y}
                width="36"
                height="36"
                fill="var(--primary)"
                fillOpacity={cell.opacity}
              />
            ))}
          </g>

          {/* Sweeping Green-Cyan Glowing Arcs */}
          <g filter="url(#hero_blur_0)" opacity="0.55">
            <path
              d="M1447.45 -87.0203V-149.03H1770V1248.85H466.158V894.269C1008.11 894.269 1447.45 454.931 1447.45 -87.0203Z"
              fill="url(#hero_arc_grad_1)"
            />
          </g>

          <g filter="url(#hero_blur_1)" opacity="0.5">
            <path
              d="M1383.45 -151.02V-213.03H1706V1184.85H402.158V830.269C944.109 830.269 1383.45 390.931 1383.45 -151.02Z"
              fill="url(#hero_arc_grad_2)"
            />
          </g>

          <g style={{ mixBlendMode: "lighten" }} filter="url(#hero_blur_2)" opacity="0.45">
            <path
              d="M1567.45 -231.02V-293.03H1890V1104.85H586.158V750.269C1128.11 750.269 1567.45 310.931 1567.45 -231.02Z"
              fill="url(#hero_arc_grad_3)"
            />
          </g>

          <g style={{ mixBlendMode: "overlay" }} filter="url(#hero_blur_3)" opacity="0.45">
            <path
              d="M65.625 750.269H284.007C860.205 750.269 1327.31 283.168 1327.31 -293.03H1650V1104.85H65.625V750.269Z"
              fill="url(#hero_arc_radial)"
            />
          </g>
        </g>

        <rect
          x="0.5"
          y="0.5"
          width="1219"
          height="809"
          rx="15.5"
          stroke="var(--foreground)"
          strokeOpacity="0.06"
        />

        <defs>
          <pattern
            id="hero_dashed_grid"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
            x="-20.0891"
            y="9.2"
          >
            <rect
              width="35.6"
              height="35.6"
              stroke="var(--primary)"
              strokeOpacity="0.16"
              strokeWidth="0.5"
              strokeDasharray="2 2"
              fill="none"
            />
          </pattern>

          <filter
            id="hero_blur_0"
            x="147.369"
            y="-467.818"
            width="1941.42"
            height="2035.46"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="140" />
          </filter>

          <filter
            id="hero_blur_1"
            x="-554.207"
            y="-1169.39"
            width="3216.57"
            height="3310.61"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="240" />
          </filter>

          <filter
            id="hero_blur_2"
            x="426.762"
            y="-452.424"
            width="1622.63"
            height="1716.67"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="79.7" />
          </filter>

          <filter
            id="hero_blur_3"
            x="-253.163"
            y="-611.818"
            width="2221.95"
            height="2035.46"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="150" />
          </filter>

          <linearGradient
            id="hero_mask_grad"
            x1="35.0676"
            y1="23.6807"
            x2="903.8"
            y2="632.086"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.15" />
            <stop offset="1" stopColor="white" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient
            id="hero_arc_grad_1"
            x1="1118.08"
            y1="-149.03"
            x2="1118.08"
            y2="1248.85"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#a7f3d0" />
            <stop offset="0.5" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#14c99a" />
          </linearGradient>

          <linearGradient
            id="hero_arc_grad_2"
            x1="1054.08"
            y1="-213.03"
            x2="1054.08"
            y2="1184.85"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#78fcd6" />
            <stop offset="0.55" stopColor="#06b6d4" />
            <stop offset="1" stopColor="#10b981" />
          </linearGradient>

          <linearGradient
            id="hero_arc_grad_3"
            x1="1238.08"
            y1="-293.03"
            x2="1238.08"
            y2="1104.85"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ccfbf1" />
            <stop offset="0.5" stopColor="#78fcd6" />
            <stop offset="1" stopColor="#0891b2" />
          </linearGradient>

          <radialGradient
            id="hero_arc_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(989.13 557.24) rotate(47.9516) scale(466.313 471.424)"
          >
            <stop stopColor="#ffffff" />
            <stop offset="0.25" stopColor="#78fcd6" />
            <stop offset="1" stopColor="#06b6d4" />
          </radialGradient>

          <clipPath id="hero_clip">
            <rect width="1220" height="810" rx="16" fill="white" />
          </clipPath>
        </defs>
      </svg>

      {/* Subtle radial depth vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--background)_100%)] opacity-55" />
    </div>
  );
}
