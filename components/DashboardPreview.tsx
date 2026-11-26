"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Activity,
  BarChart2,
  Bell,
  ChevronsUpDown,
  Cpu,
  CreditCard,
  Database,
  FileText,
  Folder,
  GitBranch,
  HelpCircle,
  Key,
  Layers,
  LayoutDashboard,
  Lock,
  Network,
  Plug,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react";
import {
  AmazonS3Logo,
  DuckDBLogo,
  MinIOLogo,
  NatsLogo,
  PolarsLogo,
  PostgresLogo,
  PrefectLogo,
  SnowflakeLogo,
  XetherBrandMark,
  XetherCloudLogo,
} from "./BrandLogos";

type SidebarSectionKey =
  | "dashboard"
  | "pipelines"
  | "datasets"
  | "connectors"
  | "telemetry"
  | "logs"
  | "usage"
  | "team"
  | "keys"
  | "security"
  | "audit"
  | "billing"
  | "settings";

const TEAMS = [
  {
    id: "acme-ml",
    label: "acme-ml",
    members: 11,
    plan: "Pro Team",
    project: "churn-v4",
    badgeBg: "bg-[#4F46E5]",
    icon: Cpu,
  },
  {
    id: "core-data",
    label: "core-data",
    members: 24,
    plan: "Enterprise",
    project: "lakehouse-ingest",
    badgeBg: "bg-[#0D9488]",
    icon: Layers,
  },
  {
    id: "sandbox-lab",
    label: "sandbox-lab",
    members: 3,
    plan: "Sandbox",
    project: "eval-runs",
    badgeBg: "bg-slate-800",
    icon: Sparkles,
  },
];

const MEMBER_AVATARS = [
  { src: "/images/avatars/annette-black.png", alt: "Annette Black" },
  { src: "/images/avatars/robert-fox.png", alt: "Robert Fox" },
  { src: "/images/avatars/cody-fisher.png", alt: "Cody Fisher" },
];

const KPIS = [
  {
    label: "Active Datasets",
    value: "148",
    delta: "+12 this wk",
    icon: Database,
    iconBg: "bg-[#F0FDFA] text-[#0D9488]",
    deltaColor: "text-[#0D9488]",
  },
  {
    label: "Data Quality Score",
    value: "99.4%",
    delta: "0 breaks",
    icon: ShieldCheck,
    iconBg: "bg-[#ECFDF5] text-[#059669]",
    deltaColor: "text-[#059669]",
  },
  {
    label: "Rows Streamed (24h)",
    value: "42.8M",
    delta: "Zero-OOM",
    icon: Activity,
    iconBg: "bg-[#F0F9FF] text-[#0284C7]",
    deltaColor: "text-[#0284C7]",
  },
  {
    label: "SHA-256 Verified",
    value: "100%",
    delta: "Multipart",
    icon: Lock,
    iconBg: "bg-[#FFFBEB] text-[#D97706]",
    deltaColor: "text-[#D97706]",
  },
];

const PIPELINE_STAGES = [
  {
    name: "1. S3 + PG Watermark",
    meta: "120k rows · 1.2s",
    status: "Completed",
    badgeClass: "bg-[#ECFDF5] text-[#059669]",
    icon: <PostgresLogo size={18} />,
  },
  {
    name: "2. Polars LazyFrame",
    meta: "119.4k rows · 0.9s",
    status: "Completed",
    badgeClass: "bg-[#ECFDF5] text-[#059669]",
    icon: <PolarsLogo size={18} />,
  },
  {
    name: "3. DuckDB Spill Gate",
    meta: "98.2k rows · 78%",
    status: "Running",
    badgeClass: "bg-[#F0F9FF] text-[#0284C7]",
    icon: (
      <span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-full bg-slate-900 p-0.5 shrink-0">
        <DuckDBLogo size={14} />
      </span>
    ),
  },
  {
    name: "4. MinIO SHA-256",
    meta: "Multipart >= 25MB",
    status: "Queued",
    badgeClass: "bg-[#F1F5F9] text-[#64748B]",
    icon: <MinIOLogo size={18} />,
  },
];

const SNAPSHOTS = [
  {
    name: "customer_churn_prod",
    meta: "main · sha:9f3a8c1",
    version: "v2.3.0",
    rows: "44,820 rows",
    quality: "99.8%",
    status: "Verified",
    statusClass: "bg-[#ECFDF5] text-[#059669]",
    Logo: PostgresLogo,
  },
  {
    name: "fraud_events_stream",
    meta: "feat/dedup · sha:4b12e09",
    version: "v1.9.4",
    rows: "1,284,100 rows",
    quality: "99.2%",
    status: "Syncing",
    statusClass: "bg-[#F0F9FF] text-[#0284C7]",
    Logo: SnowflakeLogo,
  },
  {
    name: "clinical_synth_twin",
    meta: "dp-eps-0.8 · sha:7d81f44",
    version: "v3.0.1",
    rows: "100,000 rows",
    quality: "98.9%",
    status: "Protected",
    statusClass: "bg-[#F0FDFA] text-[#0D9488]",
    Logo: AmazonS3Logo,
  },
];

const QUALITY_BARS = [42, 56, 50, 72, 65, 81, 76, 89, 84, 96, 91, 99];

export function DashboardPreview() {
  const [teamIdx, setTeamIdx] = useState(0);
  const [activeNav, setActiveNav] = useState<SidebarSectionKey>("dashboard");

  const activeTeam = TEAMS[teamIdx];
  const TeamIcon = activeTeam.icon;
  const cycleTeam = () => setTeamIdx((prev) => (prev + 1) % TEAMS.length);

  const navGroups: {
    title: string;
    items: {
      id: SidebarSectionKey;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      badge?: string;
      liveDot?: boolean;
      logos?: boolean;
    }[];
  }[] = [
    {
      title: "OVERVIEW",
      items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard }],
    },
    {
      title: "RESOURCES",
      items: [
        { id: "pipelines", label: "Pipelines", icon: Network, badge: "7" },
        { id: "datasets", label: "Datasets", icon: Database, badge: "24" },
        { id: "connectors", label: "Connectors", icon: Plug, logos: true },
        { id: "telemetry", label: "Live Telemetry (SSE)", icon: Activity, liveDot: true },
      ],
    },
    {
      title: "OBSERVABILITY",
      items: [
        { id: "logs", label: "Logs & Traces", icon: Terminal },
        { id: "usage", label: "Usage & Quotas", icon: BarChart2 },
      ],
    },
    {
      title: "TEAM & GOVERNANCE",
      items: [
        { id: "team", label: "Team & Members", icon: Users },
        { id: "keys", label: "API Keys", icon: Key },
        { id: "security", label: "Security & FORCE RLS", icon: ShieldCheck },
        { id: "audit", label: "Audit Logs", icon: FileText },
        { id: "billing", label: "Billing & Plan", icon: CreditCard },
        { id: "settings", label: "Settings", icon: Settings },
      ],
    },
  ];

  return (
    <div className="w-full max-w-[1220px] mx-auto rounded-2xl border border-slate-300/90 bg-white text-slate-900 shadow-[0_32px_72px_-12px_rgba(0,0,0,0.72)] overflow-hidden">
      {/* Light-Mode App Top Bar: Org -> Team -> Project Context Switchers */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 h-auto min-h-[54px] py-2.5 border-b border-slate-200 bg-white">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
          <XetherBrandMark size={24} variant="light" />
          <span className="text-slate-300 font-mono text-sm">/</span>

          {/* Organization Switcher (Real Cloud-Prism Logo) */}
          <button
            type="button"
            onClick={cycleTeam}
            title="Switch organization"
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1 hover:bg-slate-100 transition-colors"
          >
            <XetherCloudLogo size={18} />
            <span className="text-xs font-semibold text-slate-900">xether-cloud</span>
            <span className="hidden sm:inline rounded px-1.5 py-0.5 text-[9px] font-mono bg-slate-200/75 text-slate-600">
              Enterprise
            </span>
            <ChevronsUpDown className="w-3 h-3 text-slate-400" aria-hidden="true" />
          </button>

          <span className="text-slate-300 font-mono text-sm">/</span>

          {/* Team Switcher (Vector Team Icon Badge) */}
          <button
            type="button"
            onClick={cycleTeam}
            title="Switch team"
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1 hover:bg-slate-100 transition-colors"
          >
            <span
              className={`inline-flex items-center justify-center w-[18px] h-[18px] rounded text-white ${activeTeam.badgeBg}`}
            >
              <TeamIcon className="w-2.5 h-2.5" aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold text-slate-900">{activeTeam.label}</span>
            <span className="hidden sm:inline rounded px-1.5 py-0.5 text-[9px] font-mono bg-[#EEF2FF] text-[#4F46E5]">
              Team
            </span>
            <ChevronsUpDown className="w-3 h-3 text-slate-400" aria-hidden="true" />
          </button>

          <span className="hidden md:inline text-slate-300 font-mono text-sm">/</span>

          {/* Project Switcher */}
          <button
            type="button"
            onClick={cycleTeam}
            title="Switch project"
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1 hover:bg-slate-100 transition-colors"
          >
            <Folder className="w-3.5 h-3.5 text-[#0D9488]" aria-hidden="true" />
            <span className="text-xs font-semibold text-slate-900">{activeTeam.project}</span>
            <span className="rounded px-1.5 py-0.5 text-[9px] font-mono bg-[#ECFDF5] text-[#059669]">
              Prod
            </span>
            <ChevronsUpDown className="w-3 h-3 text-slate-400" aria-hidden="true" />
          </button>
        </div>

        {/* Right Utility Bar with Real User Avatar Photo */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center justify-between w-52 h-8 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 truncate">
              <Search className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              <span className="text-[11px]">Search workspace…</span>
            </span>
            <kbd className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[9px] font-mono text-slate-500">
              ⌘K
            </kbd>
          </div>
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 relative"
            aria-hidden="true"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#059669]" />
          </span>
          <span
            className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600"
            aria-hidden="true"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </span>
          <Image
            src="/images/avatars/cameron-williamson.png"
            alt="Workspace operator avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
          />
        </div>
      </div>

      {/* App Body: Scrollable Sidebar + Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-[244px_1fr]">
        {/* Detailed Scrollable Light Sidebar */}
        <aside className="hidden lg:flex flex-col justify-between border-r border-slate-200 bg-slate-50 p-3.5 max-h-[675px] dashboard-sidebar-scroller">
          <div className="space-y-4">
            {/* Active Team Card with Real Avatar Stack */}
            <button
              type="button"
              onClick={cycleTeam}
              className="w-full flex items-center justify-between gap-2 rounded-lg bg-white border border-slate-200 px-2.5 py-2 hover:border-slate-300 transition-colors text-left"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded text-white shrink-0 ${activeTeam.badgeBg}`}
                  >
                    <TeamIcon className="w-3 h-3" aria-hidden="true" />
                  </span>
                  <p className="text-xs font-bold text-slate-900 truncate">{activeTeam.label}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1.5 shrink-0">
                    {MEMBER_AVATARS.map((av) => (
                      <Image
                        key={av.alt}
                        src={av.src}
                        alt={av.alt}
                        width={16}
                        height={16}
                        className="w-4 h-4 rounded-full object-cover ring-1 ring-white"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 truncate">
                    {activeTeam.members} members · {activeTeam.plan}
                  </p>
                </div>
              </div>
              <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            </button>

            {/* Navigation Groups */}
            <nav className="space-y-3.5" aria-label="Workspace preview navigation">
              {navGroups.map((group) => (
                <div key={group.title} className="space-y-1">
                  <p className="px-2 text-[9px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                    {group.title}
                  </p>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeNav === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveNav(item.id)}
                        className={`w-full flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-[11px] transition-colors ${
                          isActive
                            ? "bg-white border border-slate-200 font-semibold text-slate-900 shadow-xs"
                            : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 font-medium"
                        }`}
                      >
                        <span className="inline-flex items-center gap-2 min-w-0">
                          <Icon
                            className={`w-3.5 h-3.5 shrink-0 ${
                              isActive ? "text-[#0D9488]" : "text-slate-500"
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </span>
                        {item.badge && (
                          <span className="rounded bg-slate-200/80 px-1.5 py-0.5 text-[9px] font-mono text-slate-600">
                            {item.badge}
                          </span>
                        )}
                        {item.liveDot && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                        )}
                        {item.logos && (
                          <span className="inline-flex items-center gap-1">
                            <AmazonS3Logo size={11} />
                            <PostgresLogo size={11} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </nav>
          </div>

          {/* Storage Quota Meter */}
          <div className="mt-4 rounded-lg bg-white border border-slate-200 p-3 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-700">Storage Quota</span>
              <span className="font-mono font-semibold text-[#0D9488]">64%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full w-[64%] rounded-full bg-[#0D9488]" />
            </div>
            <p className="text-[10px] font-mono text-slate-500">
              320 GiB / 500 GiB · {activeTeam.plan}
            </p>
          </div>
        </aside>

        {/* Main Light-Mode Workspace Area */}
        <div className="p-4 sm:p-6 space-y-4 bg-white">
          {/* Workspace Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-mono font-medium text-[#0D9488]">
                xether-cloud / {activeTeam.label} / {activeTeam.project}
              </p>
              <h3 className="text-lg font-bold tracking-tight text-slate-900">
                Team Workspace Overview
              </h3>
              <p className="text-[11px] text-slate-500">
                3 active projects · 7 pipelines running · All systems operational
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-1.5 text-[11px] font-semibold text-[#059669]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                <span>System Healthy</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                <span>FORCE RLS Active</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 text-white px-3 py-1.5 text-[11px] font-semibold shadow-xs">
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>New Pipeline</span>
              </span>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3.5">
            {KPIS.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-2.5 text-left"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-medium text-slate-500 truncate">
                      {kpi.label}
                    </span>
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${kpi.iconBg}`}
                    >
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                      {kpi.value}
                    </span>
                    <span className={`text-[10px] font-mono font-semibold ${kpi.deltaColor}`}>
                      {kpi.delta}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Middle Row: Live Prefect 3 / Polars / DuckDB Execution + Quality Index */}
          <div className="grid grid-cols-1 xl:grid-cols-[1.45fr_1fr] gap-4 items-stretch">
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 text-left">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <PrefectLogo size={24} />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      churn_training_prep_v4
                    </h4>
                    <p className="text-[10px] font-mono text-slate-500">
                      run_8f2a9c · Prefect 3 Worker · SSE Live
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] px-2.5 py-0.5 text-[10px] font-mono font-medium text-[#0284C7]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                  <span>Stage 3 / 4</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PIPELINE_STAGES.map((stage) => (
                  <div
                    key={stage.name}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2.5 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {stage.icon}
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-slate-900 truncate">
                          {stage.name}
                        </p>
                        <p className="text-[9px] font-mono text-slate-500 truncate">
                          {stage.meta}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded shrink-0 ${stage.badgeClass}`}
                    >
                      {stage.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col justify-between gap-3 text-left">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Stream Quality Index
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Last 12 ingestion windows
                  </p>
                </div>
                <span className="rounded-md bg-[#F0FDFA] border border-[#99F6E4] px-2 py-0.5 text-[10px] font-mono font-semibold text-[#0D9488]">
                  99.4% avg
                </span>
              </div>

              <div className="rounded-lg bg-slate-50 px-2.5 pt-2 h-24 flex items-end justify-between gap-1.5">
                {QUALITY_BARS.map((val, idx) => (
                  <div key={idx} className="flex-1 h-full flex items-end">
                    <div
                      className="w-full rounded-t-[3px] bg-gradient-to-t from-[#5EEAD4]/80 to-[#0D9488]"
                      style={{ height: `${val}%` }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>12h ago</span>
                <span>6h ago</span>
                <span className="font-semibold text-slate-900">Now</span>
              </div>
            </div>
          </div>

          {/* Bottom Snapshots Table */}
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden text-left">
            <div className="px-4 py-2.5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-[#0D9488]" aria-hidden="true" />
                <h4 className="text-xs font-bold text-slate-900">
                  Recent Versioned Snapshots
                </h4>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-mono text-slate-700">
                <NatsLogo size={13} />
                <span>NATS JetStream Synced</span>
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {SNAPSHOTS.map((snap) => {
                const SnapLogo = snap.Logo;
                return (
                  <div
                    key={snap.name}
                    className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-[200px]">
                      <SnapLogo size={18} />
                      <div>
                        <p className="font-mono font-semibold text-slate-900 text-[11px]">
                          {snap.name}
                        </p>
                        <p className="font-mono text-slate-500 text-[10px]">
                          {snap.meta}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5 font-mono text-[10px]">
                      <span className="rounded-md bg-slate-50 border border-slate-200 px-2 py-0.5 text-slate-700">
                        {snap.version}
                      </span>
                      <span className="hidden sm:inline text-slate-500">
                        {snap.rows}
                      </span>
                      <span className="font-semibold text-[#0D9488]">
                        {snap.quality}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-semibold ${snap.statusClass}`}
                      >
                        {snap.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
