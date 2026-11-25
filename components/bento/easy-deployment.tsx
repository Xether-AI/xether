import type React from "react";
import { EyeOff, FileCheck2, Lock, ShieldCheck } from "lucide-react";

interface DeploymentEasyProps {
  className?: string;
}

const events = [
  {
    title: "PII Auto-Masking",
    detail: "ssn, email → AES-256",
    badge: "Enforced",
    icon: EyeOff,
    color: "text-amber-400 bg-amber-500/15 border-amber-500/25",
  },
  {
    title: "RBAC Snapshot Lock",
    detail: "ml-trainers → Read-Only",
    badge: "Active",
    icon: Lock,
    color: "text-cyan-400 bg-cyan-500/15 border-cyan-500/25",
  },
  {
    title: "Immutable Audit Log",
    detail: "Lineage #89234 verified",
    badge: "Signed",
    icon: FileCheck2,
    color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/25",
  },
];

const DeploymentEasy: React.FC<DeploymentEasyProps> = ({ className = "" }) => {
  return (
    <div
      className={`w-full h-full px-5 pb-5 flex flex-col justify-between gap-2.5 ${className}`}
      role="img"
      aria-label="Enterprise governance showing PII masking, RBAC policy lock, and audit logs"
    >
      <div className="rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">
            SOC2 &amp; HIPAA Guard
          </span>
        </div>
        <span className="text-[10px] font-mono text-primary">
          Policy v1.4
        </span>
      </div>

      <div className="space-y-2">
        {events.map((evt) => {
          const Icon = evt.icon;
          return (
            <div
              key={evt.title}
              className="rounded-xl border border-border bg-background/60 px-3 py-2 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${evt.color}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {evt.title}
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground truncate">
                    {evt.detail}
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-mono text-foreground">
                {evt.badge}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeploymentEasy;
