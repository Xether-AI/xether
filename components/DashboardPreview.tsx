"use client";

import { useState } from "react";
import {
  Activity,
  CheckCircle2,
  Database,
  FolderGit2,
  GitBranch,
  GitCommitHorizontal,
  Layers,
  Lock,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

type TabId = "overview" | "pipelines" | "datasets";

const kpis = [
  {
    label: "Active Datasets",
    value: "148",
    delta: "+12 this week",
    icon: Database,
    color: "text-emerald-500 bg-emerald-500/15 border-emerald-500/25",
  },
  {
    label: "Data Quality Score",
    value: "99.4%",
    delta: "+1.8% vs baseline",
    icon: ShieldCheck,
    color: "text-primary bg-primary/15 border-primary/25",
  },
  {
    label: "Rows Processed (24h)",
    value: "42.8M",
    delta: "12.4k rows/sec",
    icon: Activity,
    color: "text-sky-500 bg-sky-500/15 border-sky-500/25",
  },
  {
    label: "Anomalies Auto-Fixed",
    value: "1,420",
    delta: "0 schema breaks",
    icon: Sparkles,
    color: "text-amber-500 bg-amber-500/15 border-amber-500/25",
  },
];

const pipelineStages = [
  { name: "S3 + Kafka Ingest", status: "Completed", duration: "1.2s", rows: "120k" },
  { name: "Outlier & Null Guard", status: "Completed", duration: "0.9s", rows: "119.4k" },
  { name: "Schema v2.4 Gate", status: "Running", duration: "0.4s", rows: "98.2k" },
  { name: "Immutable Snapshot", status: "Queued", duration: "—", rows: "—" },
];

const datasets = [
  {
    name: "customer_churn_prod",
    version: "v2.3.0",
    branch: "main",
    rows: "44,820",
    quality: "99.8%",
    hash: "9f3a8c1",
    status: "Verified",
  },
  {
    name: "fraud_events_stream",
    version: "v1.9.4",
    branch: "feat/dedup",
    rows: "1,284,100",
    quality: "99.2%",
    hash: "4b12e09",
    status: "Syncing",
  },
  {
    name: "clinical_synth_twin",
    version: "v3.0.1",
    branch: "dp-eps-0.8",
    rows: "100,000",
    quality: "98.9%",
    hash: "7d81f44",
    status: "Protected",
  },
];

const chartBars = [42, 58, 51, 74, 68, 82, 79, 91, 86, 95, 92, 99];

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const navItems: { id: TabId; label: string; icon: typeof Layers }[] = [
    { id: "overview", label: "Overview", icon: Layers },
    { id: "pipelines", label: "Pipelines", icon: Workflow },
    { id: "datasets", label: "Datasets", icon: FolderGit2 },
  ];

  return (
    <div className="w-full max-w-[1260px] mx-auto rounded-2xl border border-border bg-card/95 text-card-foreground shadow-2xl overflow-hidden">
      {/* App Window Chrome */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-border bg-muted/40">
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground truncate">
            <span className="font-semibold text-foreground">xether-cloud</span>
            <span>/</span>
            <span className="text-primary font-medium">prod-ml-workspace</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-2 rounded-lg border border-border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground w-56">
            <Search className="h-3.5 w-3.5" />
            <span className="truncate">Search datasets, runs…</span>
            <kbd className="ml-auto rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono">
              ⌘K
            </kbd>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>3 Pipelines Healthy</span>
          </div>
        </div>
      </div>

      {/* App Body */}
      <div className="grid grid-cols-1 lg:grid-cols-[210px_1fr]">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col justify-between border-r border-border bg-muted/20 p-4">
          <div className="space-y-1">
            <p className="px-2.5 pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Platform
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-primary/15 text-primary border border-primary/25"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-3 mt-3 border-t border-border space-y-1">
              <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-muted-foreground">
                <Sparkles className="h-4 w-4 text-violet-500" />
                <span>Synthetic Engine</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-muted-foreground">
                <Lock className="h-4 w-4 text-amber-500" />
                <span>RBAC &amp; Audit</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background/60 p-3 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Storage Quota</span>
              <span className="font-mono font-medium text-foreground">64%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[64%] rounded-full bg-primary" />
            </div>
            <p className="text-[10px] text-muted-foreground">
              320 GB / 500 GB used
            </p>
          </div>
        </aside>

        {/* Main Workspace */}
        <div className="p-4 sm:p-6 space-y-5 bg-background/40">
          {/* Mobile Tab Switcher */}
          <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium shrink-0 transition-colors ${
                    isActive
                      ? "bg-primary/15 text-primary border border-primary/25"
                      : "bg-muted/50 text-muted-foreground border border-border"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            {kpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-border bg-card p-3.5 sm:p-4 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] sm:text-xs font-medium text-muted-foreground truncate">
                      {kpi.label}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${kpi.color}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                      {kpi.value}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono text-primary truncate">
                      {kpi.delta}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Middle Row: Live Pipeline DAG + Quality Trend */}
          {(activeTab === "overview" || activeTab === "pipelines") && (
            <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_1fr] gap-4">
              {/* Active Pipeline Execution */}
              <div className="rounded-xl border border-border bg-card p-4 space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Play className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                        churn_training_prep_v4
                      </h3>
                      <p className="text-[11px] font-mono text-muted-foreground">
                        run_8f2a9c • triggered by schedule
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-sky-500/25 bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-mono text-sky-500">
                    Stage 3 / 4
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {pipelineStages.map((stage, idx) => (
                    <div
                      key={stage.name}
                      className="rounded-lg border border-border bg-muted/30 px-3 py-2.5 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <CheckCircle2
                          className={`h-4 w-4 shrink-0 ${
                            stage.status === "Completed"
                              ? "text-emerald-500"
                              : stage.status === "Running"
                                ? "text-sky-500 animate-pulse"
                                : "text-muted-foreground/50"
                          }`}
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">
                            {idx + 1}. {stage.name}
                          </p>
                          <p className="text-[10px] font-mono text-muted-foreground">
                            {stage.rows} rows • {stage.duration}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          stage.status === "Completed"
                            ? "bg-emerald-500/15 text-emerald-500"
                            : stage.status === "Running"
                              ? "bg-sky-500/15 text-sky-500"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {stage.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality & Throughput Chart */}
              <div className="rounded-xl border border-border bg-card p-4 flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                      Stream Quality Index
                    </h3>
                    <p className="text-[11px] text-muted-foreground">
                      Last 12 ingestion windows
                    </p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-primary">
                    99.4% avg
                  </span>
                </div>

                <div className="flex items-end gap-1.5 h-28 pt-2">
                  {chartBars.map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center justify-end h-full"
                    >
                      <div
                        className="w-full rounded-t-sm bg-gradient-to-t from-primary/40 to-primary transition-all"
                        style={{ height: `${val}%` }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                  <span>12h ago</span>
                  <span>6h ago</span>
                  <span className="text-foreground font-medium">Now</span>
                </div>
              </div>
            </div>
          )}

          {/* Dataset Snapshots Table */}
          {(activeTab === "overview" || activeTab === "datasets") && (
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-primary" />
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                    Recent Versioned Snapshots
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground">
                  Git-like Lineage
                </span>
              </div>

              <div className="divide-y divide-border">
                {datasets.map((ds) => (
                  <div
                    key={ds.name}
                    className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-[180px]">
                      <GitCommitHorizontal className="h-4 w-4 text-primary shrink-0" />
                      <div>
                        <p className="font-mono font-medium text-foreground">
                          {ds.name}
                        </p>
                        <p className="text-[10px] font-mono text-muted-foreground">
                          branch: {ds.branch} • sha:{ds.hash}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5 font-mono text-[11px]">
                      <span className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-foreground">
                        {ds.version}
                      </span>
                      <span className="hidden sm:inline text-muted-foreground">
                        {ds.rows} rows
                      </span>
                      <span className="text-primary font-medium">
                        {ds.quality}
                      </span>
                      <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-500">
                        {ds.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
