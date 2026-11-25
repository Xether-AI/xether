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

        {/* Dashboard Preview - Overlapping the Hero on larger screens */}
        <div className="relative mt-6 sm:-mt-16 md:-mt-24 lg:-mt-36 z-30 px-2 sm:px-4">
          <AnimatedSection>
            <div className="glass rounded-2xl overflow-hidden shadow-2xl border-border group">
              <DashboardPreview />
            </div>
          </AnimatedSection>
        </div>

        <section className="space-y-10 md:space-y-14 lg:space-y-16 py-10 md:py-14 lg:py-16">
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
