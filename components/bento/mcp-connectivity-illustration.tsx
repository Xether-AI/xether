import type React from "react";
import { ArrowRight, Shield, Sparkles } from "lucide-react";

interface McpConnectivityIllustrationProps {
  className?: string;
}

const metrics = [
  { label: "Distribution Match", value: "98.7%", width: "w-[98%]", bar: "from-cyan-400 to-primary" },
  { label: "Minority Class Boost", value: "+34.0%", width: "w-[74%]", bar: "from-violet-400 to-cyan-400" },
  { label: "PII Leakage Risk", value: "0.00%", width: "w-[2%]", bar: "from-emerald-400 to-emerald-400" },
];

const McpConnectivityIllustration: React.FC<
  McpConnectivityIllustrationProps
> = ({ className = "" }) => {
  return (
    <div
      className={`w-full h-full px-5 pb-5 flex flex-col justify-between gap-3 ${className}`}
      role="img"
      aria-label="Synthetic data engine showing differential privacy and distribution fidelity metrics"
    >
      {/* Pipeline Transformation Header */}
      <div className="rounded-xl border border-border bg-background/70 p-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Source
          </p>
          <p className="text-xs font-mono text-foreground truncate">
            clinical_v2
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-violet-500/25 bg-violet-500/15 px-2.5 py-1 text-[10px] font-mono text-violet-300 shrink-0">
          <Shield className="h-3 w-3" />
          <span>ε = 0.8 DP</span>
          <ArrowRight className="h-3 w-3" />
        </div>

        <div className="text-right min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Synthetic
          </p>
          <p className="text-xs font-mono text-primary truncate">
            100k rows
          </p>
        </div>
      </div>

      {/* Fidelity Bars */}
      <div className="rounded-xl border border-border bg-background/50 p-3 space-y-2.5">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">{m.label}</span>
              <span className="font-mono font-medium text-foreground">
                {m.value}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full ${m.width} rounded-full bg-gradient-to-r ${m.bar}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Engine Tags */}
      <div className="flex items-center gap-2 text-[10px] font-mono">
        <span className="inline-flex items-center gap-1 rounded-md border border-primary/25 bg-primary/10 px-2 py-0.5 text-primary">
          <Sparkles className="h-3 w-3" />
          Tabular GAN
        </span>
        <span className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-muted-foreground">
          Edge-Case Synthesis
        </span>
      </div>
    </div>
  );
};

export default McpConnectivityIllustration;
