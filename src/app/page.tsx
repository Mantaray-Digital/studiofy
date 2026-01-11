import {
  Hero,
  GenerateInput,
  ProductGallery,
  FeaturesSection,
  HowItWorksSection,
  BenefitsSection,
  BeforeAfterSection,
  PricingSection,
  CTASection,
} from '@/components/landing';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="bg-white">
        <Hero />
        <GenerateInput />
        <ProductGallery />
      </div>
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <BeforeAfterSection />
      <PricingSection />
      <CTASection />
    </main>
  );
}
