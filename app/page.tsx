import { HeroSection } from "@/components/HeroSection";
import { DashboardPreview } from "@/components/DashboardPreview";
import { SocialProof } from "@/components/SocialProof";
import { BentoSection } from "@/components/BentoSection";
import { LargeTestimonial } from "@/components/LargeTestimonial";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialGridSection } from "@/components/TestimonialGridSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { FooterSection } from "@/components/FooterSection";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Xether AI",
    url: "https://xether.ai",
    logo: "https://xether.ai/icon.svg",
    description:
      "Data Infrastructure for AI/ML. Automate data preparation, management, and improvement.",
    sameAs: ["https://x.com/xetherai", "https://github.com/Xether-AI"],
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative z-10">
        <main className="max-w-full px-6 mx-auto relative">
          <HeroSection />
          {/* Dashboard Preview Wrapper */}
          <div className="absolute border border-gray-200 rounded-2xl bottom-[-150px] md:bottom-[-400px] left-1/2 transform -translate-x-1/2 z-30">
            <AnimatedSection>
              <DashboardPreview />
            </AnimatedSection>
          </div>
        </main>
        <AnimatedSection
          className="relative z-10 max-w-[1320px] mx-auto px-6 mt-[411px] md:mt-[400px]"
          delay={0.1}
        >
          <SocialProof />
        </AnimatedSection>
        <AnimatedSection
          id="features-section"
          className="relative z-10 max-w-[1320px] mx-auto mt-16"
          delay={0.2}
        >
          <BentoSection />
        </AnimatedSection>
        <AnimatedSection
          className="relative z-10 max-w-[1320px] mx-auto mt-4 md:mt-16"
          delay={0.2}
        >
          <LargeTestimonial />
        </AnimatedSection>
        <AnimatedSection
          id="pricing-section"
          className="relative z-10 max-w-[1320px] mx-auto mt-4 md:mt-16"
          delay={0.2}
        >
          <PricingSection />
        </AnimatedSection>
        <AnimatedSection
          id="testimonials-section"
          className="relative z-10 max-w-[1320px] mx-auto mt-4 md:mt-16"
          delay={0.2}
        >
          <TestimonialGridSection />
        </AnimatedSection>
        <AnimatedSection
          id="faq-section"
          className="relative z-10 max-w-[1320px] mx-auto mt-4 md:mt-16"
          delay={0.2}
        >
          <FAQSection />
        </AnimatedSection>
        <AnimatedSection
          className="relative z-10 max-w-[1320px] mx-auto mt-4 md:mt-16"
          delay={0.2}
        >
          <CTASection />
        </AnimatedSection>
        <AnimatedSection
          className="relative z-10 max-w-[1320px] mx-auto mt-4 md:mt-16"
          delay={0.2}
        >
          <FooterSection />
        </AnimatedSection>
      </div>
    </div>
  );
}
