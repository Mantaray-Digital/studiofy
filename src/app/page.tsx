import {
  Hero,
  GenerateInput,
  ProductGallery,
  FeaturesSection,
  HowItWorksSection,
  BenefitsSection,
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
    </main>
  );
}
