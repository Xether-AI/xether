import type React from "react"
import { Check, CheckCircle, Search } from "lucide-react"

interface McpConnectivityIllustrationProps {
  className?: string
}

const McpConnectivityIllustration: React.FC<McpConnectivityIllustrationProps> = ({ className = "" }) => {
  // Integration data with new SVG paths
  const integrations = [
    { name: "User Profiles", icon: "/images/mcp-integrations/figma.svg", installed: true },
    { name: "Transactions", icon: "/images/mcp-integrations/stripe.svg" },
    { name: "Clickstream", icon: "/images/mcp-integrations/nextjs.svg", installed: true },
    { name: "IoT Sensors", icon: "/images/mcp-integrations/tailwind-css.svg" },
    { name: "Medical Records", icon: "/images/mcp-integrations/resend.svg", installed: true },
    { name: "Financial Logs", icon: "/images/mcp-integrations/react.svg" },
  ]

  return (
    <div
      className={`w-full h-full flex items-center justify-center p-4 relative ${className}`}
      role="img"
      aria-label="MCP Connectivity component showcasing installed integrations list"
    >
      {/* Main Message Box */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, calc(-50% + 24px))",
          width: "345px",
          height: "277px",
          background: "linear-gradient(180deg, hsl(var(--background)) 0%, transparent 100%)",
          backdropFilter: "blur(16px)",
          borderRadius: "9.628px",
          border: "0.802px solid hsl(var(--border))",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          }}
        >
          {/* Search Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12.837px",
              padding: "8.826px 12.837px",
              borderBottom: "0.802px solid hsl(var(--border))",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "14.442px",
                height: "14.442px",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Search className="w-full h-full text-muted-foreground" />
            </div>
            <span
              style={{
                fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: "12.837px",
                lineHeight: "19.256px",
                color: "hsl(var(--muted-foreground))",
                fontWeight: 400,
                whiteSpace: "nowrap",
              }}
            >
              Generate Synthetic Data
            </span>
          </div>
          {/* Integration List */}
          {integrations.map((integration, index) => (
            <div
              key={integration.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8.826px 12.837px",
                borderBottom: index < integrations.length - 1 ? "0.479px solid hsl(var(--border))" : "none",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12.837px",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={integration.icon || "/placeholder.svg"}
                    alt={integration.name}
                    className="w-full h-full object-contain opacity-70 grayscale" // Apply opacity and grayscale
                  />
                </div>
                <span
                  style={{
                    fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: "12.837px",
                    lineHeight: "19.256px",
                    color: "hsl(var(--muted-foreground))",
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {integration.name}
                </span>
              </div>
              {integration.installed && (
                <div
                  style={{
                    padding: "1px 5px",
                    borderRadius: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: "2px",
                      color: "hsl(var(--primary))",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                    className="flex flex-row items-center justify-center"
                  >
                    <CheckCircle className="size-4 text-green-600"/>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default McpConnectivityIllustration
