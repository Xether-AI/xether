import type React from "react";
import { Activity, AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";

const AiCodeReviews: React.FC = () => {
  const rules = [
    {
      field: "user_age < 0",
      action: "Clipped to 0",
      rows: "142 rows",
      status: "fixed",
      icon: CheckCircle2,
      color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/25",
    },
    {
      field: "email IS NULL",
      action: "Quarantined",
      rows: "38 rows",
      status: "flagged",
      icon: AlertTriangle,
      color: "text-amber-400 bg-amber-500/15 border-amber-500/25",
    },
    {
      field: "schema: v2.4",
      action: "Validated",
      rows: "45.0k rows",
      status: "ok",
      icon: Sparkles,
      color: "text-cyan-400 bg-cyan-500/15 border-cyan-500/25",
    },
  ];

  return (
    <div
      className="w-full h-full px-5 pb-5 flex flex-col justify-between gap-3"
      role="img"
      aria-label="Automated data cleaning telemetry showing anomaly detection and schema validation"
    >
      {/* Stream Header */}
      <div className="rounded-xl border border-border bg-background/70 backdrop-blur-md p-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 border border-emerald-500/25 text-emerald-400">
            <Activity className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-mono font-medium text-foreground truncate">
              stream://user_events_prod
            </p>
            <p className="text-[11px] text-muted-foreground">
              Live anomaly &amp; schema guard
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-emerald-500/15 border border-emerald-500/25 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
          99.4% Clean
        </span>
      </div>

      {/* Remediation Rules */}
      <div className="space-y-2">
        {rules.map((rule) => {
          const Icon = rule.icon;
          return (
            <div
              key={rule.field}
              className="rounded-xl border border-border bg-background/50 px-3 py-2 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${rule.color}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-mono text-foreground truncate">
                    {rule.field}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {rule.action}
                  </p>
                </div>
              </div>
              <span className="shrink-0 text-[11px] font-mono text-muted-foreground">
                {rule.rows}
              </span>
            </div>
          );
        })}
      </div>

      {/* Quality Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">Dataset Health Score</span>
          <span className="font-mono text-primary font-medium">
            99.4% (+4.2%)
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-emerald-400 via-primary to-cyan-400" />
        </div>
      </div>
    </div>
  );
};

export default AiCodeReviews;
