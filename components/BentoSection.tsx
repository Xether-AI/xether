import AiCodeReviews from "./bento/ai-code-reviews"
import RealtimeCodingPreviews from "./bento/real-time-previews"
import OneClickIntegrationsIllustration from "./bento/one-click-integrations-illustration"
import MCPConnectivityIllustration from "./bento/mcp-connectivity-illustration" // Updated import
import EasyDeployment from "./bento/easy-deployment"
import ParallelCodingAgents from "./bento/parallel-agents" // Updated import

interface BentoCardProps {
  title: string
  description: string
  Component: React.ComponentType<any>
}

const BentoCard = ({ title, description, Component }: BentoCardProps) => (
  <div className="overflow-hidden rounded-2xl flex flex-col justify-start items-start relative">
    {/* Background with blur effect */}
    <div
      className="absolute inset-0 rounded-2xl border"
      style={{
        background: "rgba(231, 236, 235, 0.05)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
    />
    {/* Additional subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/1 to-transparent rounded-2xl" />

    <div className="self-stretch p-6 flex flex-col justify-start items-start gap-2 relative z-10">
      <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
        <p className="self-stretch text-primary text-lg font-semibold leading-7">
          {title} <br />
          <span className="text-secondary font-thin">{description}</span>
        </p>
      </div>
    </div>
    <div className="self-stretch h-72 relative -mt-0.5 z-10">
      <Component />
    </div>
  </div>
)

export function BentoSection() {
  const cards = [
    {
      title: "Automated Data Cleaning",
      description: "Detect outliers, fix schema violations, and validate streams automatically.",
      Component: AiCodeReviews,
    },
    {
      title: "Dataset Version Control",
      description: "Treat data like code. Track every change, branch datasets, and rollback instantly.",
      Component: RealtimeCodingPreviews,
    },
    {
      title: "Unified Data Ingestion",
      description: "Connectors for S3, Snowflake, Postgres, and 50+ other sources.",
      Component: OneClickIntegrationsIllustration,
    },
    {
      title: "Synthetic Augmentation",
      description: "Fill gaps in your data with high-fidelity synthetic generation.",
      Component: MCPConnectivityIllustration,
    },
    {
      title: "Reproducible Pipelines",
      description: "Ensure every transformation is traceable and reproducible.",
      Component: ParallelCodingAgents,
    },
    {
      title: "Enterprise Governance",
      description: "RBAC, audit logs, and compliance for sensitive datasets.",
      Component: EasyDeployment,
    },
  ]

  return (
    <section className="w-full px-5 flex flex-col justify-center items-center overflow-visible bg-transparent">
      <div className="w-full py-8 md:py-16 relative flex flex-col justify-start items-start gap-6">
        <div className="w-[547px] h-[938px] absolute top-[614px] left-[80px] origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[130px] z-0" />
        <div className="self-stretch py-8 md:py-14 flex flex-col justify-center items-center gap-2 z-10">
          <div className="flex flex-col justify-start items-center gap-4">
            <h2 className="w-full max-w-[655px] text-center text-secondary text-4xl md:text-6xl font-semibold leading-tight md:leading-[66px]">
              Data Quality as Infrastructure
            </h2>
            <p className="w-full max-w-[600px] text-center text-primary/90 text-lg md:text-xl font-medium leading-relaxed">
              Ask your AI Agent for real-time collaboration, seamless integrations, and actionable insights to
              streamline your operations.
            </p>
          </div>
        </div>
        <div className="self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
          {cards.map((card) => (
            <BentoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
