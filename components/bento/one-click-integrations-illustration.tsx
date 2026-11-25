import type React from "react";
import { Cloud, Database, HardDrive, Layers, Radio, Workflow } from "lucide-react";

interface OneClickIntegrationsIllustrationProps {
  className?: string;
}

const sources = [
  {
    name: "Amazon S3",
    rate: "1.4 GB/s",
    icon: Cloud,
    color: "text-amber-400 bg-amber-500/15 border-amber-500/25",
  },
  {
    name: "Snowflake",
    rate: "820k/s",
    icon: Database,
    color: "text-sky-400 bg-sky-500/15 border-sky-500/25",
  },
  {
    name: "PostgreSQL",
    rate: "CDC Live",
    icon: HardDrive,
    color: "text-indigo-400 bg-indigo-500/15 border-indigo-500/25",
  },
  {
    name: "Apache Kafka",
    rate: "42k msg/s",
    icon: Radio,
    color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/25",
  },
];

const OneClickIntegrationsIllustration: React.FC<
  OneClickIntegrationsIllustrationProps
> = ({ className = "" }) => {
  return (
    <div
      className={`w-full h-full px-5 pb-5 flex flex-col justify-between gap-3 ${className}`}
      role="img"
      aria-label="Unified data ingestion connectors streaming from S3, Snowflake, Postgres, and Kafka"
    >
      {/* Sources Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {sources.map((src) => {
          const Icon = src.icon;
          return (
            <div
              key={src.name}
              className="rounded-xl border border-border bg-background/60 p-2.5 flex items-center gap-2.5"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${src.color}`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {src.name}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground">
                  {src.rate}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Unified Bus */}
      <div className="rounded-xl border border-primary/25 bg-primary/10 px-3.5 py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <Workflow className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">
              Xether Ingest Bus
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              Parquet • Iceberg • Arrow
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-primary shrink-0">
          <Layers className="h-3.5 w-3.5" />
          50+ Sources
        </span>
      </div>
    </div>
  );
};

export default OneClickIntegrationsIllustration;
