import { Lock } from "lucide-react"
import type React from "react"

interface DeploymentEasyProps {
  /** Width of component – number (px) or any CSS size value */
  width?: number | string
  /** Height of component – number (px) or any CSS size value */
  height?: number | string
  /** Extra Tailwind / CSS classes for root element */
  className?: string
}

const DeploymentEasy: React.FC<DeploymentEasyProps> = ({ width = "100%", height = "100%", className = "" }) => {
  /* ------------------------------------------------------------
   * Theme-based design tokens using global CSS variables
   * ---------------------------------------------------------- */
  const themeVars = {
    "--deploy-primary-color": "hsl(var(--primary))",
    "--deploy-background-color": "hsl(var(--background))",
    "--deploy-text-color": "hsl(var(--foreground))",
    "--deploy-text-secondary": "hsl(var(--muted-foreground))",
    "--deploy-border-color": "hsl(var(--border))",
  } as React.CSSProperties

  /* ------------------------------------------------------------
   * Console log output (static for demo) – can be replaced via props
   * ---------------------------------------------------------- */
  const logLines = [
    "[16:37:25.637] Checking RBAC policies for user: admin@xether.ai",
    "[16:37:25.638] Dataset: customer_churn_v2 (Sensitive)",
    "[16:37:25.653] ⚠️  PII detected in column 'email' - applying masking...",
    "[16:37:25.741] ✓ PII masking complete",
    "[16:37:25.979] Validating schema compliance (v1.4.2)...",
    '[16:37:29.945] Running "data audit"',
    "[16:37:30.561] Xether Audit Log v2.1.0",
    '[16:37:30.880] Verifying data lineage ... 100%',
    "[16:37:30.914] ✓ Lineage trace complete",
    "[16:37:30.940] Encrypting for transport",
    "[16:37:34.436] Uploading to secure storage [us-east-1]",
    '[16:37:34.436] info: dataset marked as immutable',
    "[16:37:37.265] Updated catalog",
    "[16:37:39.076] Notifying compliance officer",
    "[16:37:39.137] ▲ Governance Check Passed ... 100%",
    "[16:37:41.439] ✓ Access granted for 24h",
    "[16:37:53.979] ✓ Audit log #89234 created",
    "[16:38:00.585] ○ Ready for usage",
    "[16:38:01.099] Process Completed [4s]",
    "🔒 Secure Access Granted",
  ]

  return (
    <div
      className={`w-full h-full flex items-center justify-center p-4 relative ${className}`}
      style={{
        width,
        height,
        position: "relative",
        background: "transparent",
        ...themeVars,
      }}
      role="img"
      aria-label="Deployment console output with Deploy Policy button"
    >
      {/* -------------------------------------------------------- */}
      {/* Console / Terminal panel                                */}
      {/* -------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "360px",
          height: "239px",
          background: "linear-gradient(180deg, var(--deploy-background-color) 0%, transparent 100%)",
          backdropFilter: "blur(7.907px)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {/* Inner translucent panel – replicates subtle overlay */}
        <div
          style={{
            position: "absolute",
            inset: "2px",
            borderRadius: "8px",
            background: "hsl(var(--foreground) / 0.08)",
          }}
        />

        {/* Log text */}
        <div
          style={{
            position: "relative",
            padding: "8px",
            height: "100%",
            overflow: "hidden",
            fontFamily: "'Geist Mono', 'SF Mono', Monaco, Consolas, 'Liberation Mono', monospace",
            fontSize: "10px",
            lineHeight: "16px",
            color: "var(--deploy-text-color)",
            whiteSpace: "pre",
          }}
        >
          {logLines.map((line, index) => (
            <p key={index} style={{ margin: 0 }}>
              {line}
            </p>
          ))}
        </div>

        {/* Inner border overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "0.791px solid var(--deploy-border-color)",
            borderRadius: "10px",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* -------------------------------------------------------- */}
      {/* Call-to-action button                                   */}
      {/* -------------------------------------------------------- */}
      <button
        style={{
          position: "absolute",
          top: "calc(65% + 56px)",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6.375px",
          padding: "5px 10px",
          border: "none",
          cursor: "pointer",
          borderRadius: "8.925px",
          fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: "16.575px",
          lineHeight: "25.5px",
          letterSpacing: "-0.51px",
          fontWeight: 500,
          whiteSpace: "nowrap",
          boxShadow:
            "0px 42.075px 11.475px rgba(0, 0, 0, 0), 0px 26.775px 10.2px rgba(0, 0, 0, 0.01), 0px 15.3px 8.925px rgba(0, 0, 0, 0.05), 0px 6.375px 6.375px rgba(0, 0, 0, 0.09), 0px 1.275px 3.825px rgba(0, 0, 0, 0.1)",
        }}
        className="bg-secondary text-secondary-foreground"
      >
        <Lock size={16} className="text-primary" /> Enforce Lock Policy
      </button>
    </div>
  )
}

export default DeploymentEasy
