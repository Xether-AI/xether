import type React from "react"

const AiCodeReviews: React.FC = () => {
  const themeVars = {
    "--ai-primary-color": "hsl(var(--primary))",
    "--ai-background-color": "hsl(var(--background))",
    "--ai-text-color": "hsl(var(--foreground))",
    "--ai-text-dark": "hsl(var(--primary-foreground))",
    "--ai-border-color": "hsl(var(--border))",
    "--ai-border-main": "hsl(var(--foreground) / 0.5)",
    "--ai-highlight-primary": "hsl(var(--primary) / 0.20)",
    "--ai-highlight-header": "hsl(var(--accent) / 0.2)",
  }

  return (
    <div
      style={
        {
          width: "100%",
          height: "100%",
          position: "relative",
          background: "transparent",
          ...themeVars,
        } as React.CSSProperties
      }
      role="img"
      aria-label="AI Code Reviews interface showing code suggestions with apply buttons"
    >
      {/* Background Message Box (Blurred) */}
      <div
        style={{
          position: "absolute",
          top: "30px",
          left: "50%",
          transform: "translateX(-50%) scale(0.9)",
          width: "340px",
          height: "205.949px",
          background: "linear-gradient(180deg, var(--ai-background-color) 0%, transparent 50%)",
          opacity: 0.7,
          borderRadius: "8px",
          border: "2px solid var(--ai-border-color)",
          overflow: "hidden",
          backdropFilter: "blur(16px)",
        }}
      >
        <div
          className="border rounded-lg bg-card"
          style={{
            padding: "7px 8px",
            height: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontFamily: "'Geist Mono', 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              fontSize: "10px",
              lineHeight: "16px",
              letterSpacing: "-0.2942px",
              color: "hsl(var(--muted-foreground))",
              width: "100%",
              maxWidth: "320px",
              margin: 0,
            }}
          >
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>def validate_stream(record):</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>    if record[&apos;age&apos;] &lt; 0:</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>        return None</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>    if not record[&apos;email&apos;]:</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>        record[&apos;email&apos;] = &apos;unknown&apos;</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>    return record</p>
          </div>
        </div>
      </div>

      {/* Foreground Message Box (Main) */}
      <div
        style={{
          position: "absolute",
          top: "55px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "340px",
          height: "221px",
          background: "var(--ai-background-color)",
          backdropFilter: "blur(16px)",
          borderRadius: "8px",
          border: "2px solid var(--ai-border-color)",
          overflow: "hidden",
        }}
      >
        <div
          className="bg-card border border-border"
          style={{
            padding: "8px",
            height: "100%",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              width: "100%",
              top: "48px",
              height: "33px",
              background: "hsl(var(--foreground) / 0.08)",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              width: "100%",
              top: "70px",
              height: "52px",
              background: "var(--ai-highlight-primary)",
              zIndex: 1,
            }}
          />
          <div
            style={{
              fontFamily: "'Geist Mono', 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              fontSize: "10px",
              lineHeight: "16px",
              letterSpacing: "-0.3163px",
              color: "var(--ai-text-color)",
              width: "100%",
              maxWidth: "320px",
              position: "relative",
              zIndex: 2,
              margin: 0,
            }}
          >
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>def validate_stream(record):</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>    if record[&apos;age&apos;] &lt; 0:</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>        # Auto-fix: clip to 0</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>        record[&apos;age&apos;] = 0</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>    if not record[&apos;email&apos;]:</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>        record[&apos;email&apos;] = &apos;unknown&apos;</p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", fontWeight: 400 }}>    return record</p>
          </div>
          <button
            style={{
              position: "absolute",
              top: "calc(50% + 26px)",
              right: "20px",
              transform: "translateY(-50%)",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              color: "var(--ai-text-dark)",
              border: "none",
              cursor: "pointer",
              fontWeight: 500,
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
              padding: "3px 6px",
              borderRadius: "5.535px",
              fontSize: "10.279px",
              lineHeight: "15.814px",
              letterSpacing: "-0.3163px"
            }}
            className="bg-secondary"
          >
            <span
              style={{
                fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 400
              }}
            >
              Apply Fix
            </span>
            <span
              style={{
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                fontWeight: 600,
              }}
            >
              Enter
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AiCodeReviews
