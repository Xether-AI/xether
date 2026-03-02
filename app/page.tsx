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
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <main className="container-center relative pt-20">
        <HeroSection />

        {/* Dashboard Preview - Overlapping the Hero */}
        <div className="relative -mt-32 md:-mt-48 z-30 px-4">
          <AnimatedSection>
            <div className="glass rounded-2xl overflow-hidden shadow-2xl border-white/10 group">
              <DashboardPreview />
            </div>
          </AnimatedSection>
        </div>

        <section className="space-y-32 py-32">
          <AnimatedSection delay={0.1}>
            <SocialProof />
          </AnimatedSection>

          <AnimatedSection id="features-section" delay={0.2}>
            <BentoSection />
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <LargeTestimonial />
          </AnimatedSection>

          <AnimatedSection id="pricing-section" delay={0.2}>
            <PricingSection />
          </AnimatedSection>

          <AnimatedSection id="testimonials-section" delay={0.2}>
            <TestimonialGridSection />
          </AnimatedSection>

          <AnimatedSection id="faq-section" delay={0.2}>
            <FAQSection />
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <CTASection />
          </AnimatedSection>
        </section>

        <FooterSection />
      </main>
    </div>
  );
}
