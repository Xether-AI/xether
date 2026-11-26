import { HeroSection } from "@/components/HeroSection";
import { DashboardPreview } from "@/components/DashboardPreview";
import { SocialProof } from "@/components/SocialProof";
import { BentoSection } from "@/components/BentoSection";
import { LargeTestimonial } from "@/components/LargeTestimonial";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { FooterSection } from "@/components/FooterSection";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <main className="relative">
        <HeroSection />

        {/* Demonstrative Light-Mode Team Dashboard Overlapping Hero Spotlight */}
        <div className="relative -mt-32 sm:-mt-36 md:-mt-40 z-20 px-4 sm:px-6 pb-16">
          <AnimatedSection>
            <DashboardPreview />
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.05}>
          <SocialProof />
        </AnimatedSection>

        <div id="features-section">
          <AnimatedSection delay={0.1}>
            <BentoSection />
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.1}>
          <LargeTestimonial />
        </AnimatedSection>

        <div id="pricing-section">
          <AnimatedSection delay={0.1}>
            <PricingSection />
          </AnimatedSection>
        </div>

        <div id="faq-section">
          <AnimatedSection delay={0.1}>
            <FAQSection />
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.1}>
          <CTASection />
        </AnimatedSection>

        <FooterSection />
      </main>
    </div>
  );
}
