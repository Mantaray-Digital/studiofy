'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Wand2, Crop, SlidersHorizontal, Grid3X3, Sun, CircleDot, Expand, PenTool, Sparkles } from 'lucide-react';

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
}

function FeatureCard({ image, title, description }: FeatureCardProps) {
  return (
    <div className="flex-shrink-0 w-[336px] bg-[#2d2e30] rounded-[24px] p-8 flex flex-col h-[537px]">
      {/* Image */}
      <div className="w-[272px] h-[272px] rounded-lg overflow-hidden bg-[#1a1a1a]">
        <Image
          src={image}
          alt={title}
          width={272}
          height={272}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 pt-5 pb-4 flex-1">
        <h3 className="text-[#ededed] text-xl font-bold leading-6">{title}</h3>
        <p className="text-[#9ca3af] text-base leading-5">{description}</p>
      </div>

      {/* Link */}
      <div className="flex items-center text-[#7168fa] text-sm">
        <span>Read more</span>
        <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </div>
  );
}

function MoreToolsCard() {
  return (
    <div className="flex-shrink-0 w-[336px] bg-[#2d2e30] rounded-[24px] p-8 flex flex-col h-[537px] items-center justify-center">
      <div className="pb-8">
        <Sparkles className="w-4 h-4 text-[#f3f4f6]" />
      </div>
      <h4 className="text-[#f3f4f6] text-xl font-bold leading-6">10+ more tools</h4>
      <p className="text-[#9ca3af] text-base leading-5 pb-8">
        are waiting in Studiofy.
      </p>
      <button
        type="button"
        className="bg-[#5b58fb] text-white text-sm font-medium px-6 py-5 rounded-md hover:bg-[#4a47e0] transition-colors"
      >
        Test for free
      </button>
    </div>
  );
}

const features = [
  {
    image: '/images/features/professional.jpg',
    title: 'Professional',
    description: 'Turn still images into eye-catching images for social media or product demos.',
  },
  {
    image: '/images/features/ai-backgrounds-templates.jpg',
    title: 'AI backgrounds (templates)',
    description: 'Place your items into engaging scenes using our library or your custom backgrounds.',
  },
  {
    image: '/images/features/ai-fashion-models.jpg',
    title: 'AI fashion models',
    description: 'Turn a single photo of your apparel into professional model shots',
  },
  {
    image: '/images/features/ai-backgrounds.jpg',
    title: 'AI backgrounds',
    description: 'Create stunning product photoshoots from your text descriptions.',
  },
  {
    image: '/images/features/remove-background.jpg',
    title: 'Remove Background',
    description: "Instantly create clean, consistent product shots by erasing bg's and setting ideal padding.",
  },
  {
    image: '/images/features/improve-quality.jpg',
    title: 'Improve quality & Upscale',
    description: 'Sharpen details and boost resolution for crisp images everywhere.',
  },
  {
    image: '/images/features/fix-light-colors.jpg',
    title: 'Fix light & colors',
    description: 'Brighten dark or faded images for a professional look.',
  },
];

const sidebarIcons = [
  Wand2,
  Crop,
  SlidersHorizontal,
  Grid3X3,
  Sun,
  CircleDot,
  Expand,
  PenTool,
  Sparkles,
];

export function FeaturesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360; // card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="features" className="bg-[#14161b] px-4 md:px-[100px] py-0">
      <div className="max-w-[1280px] mx-auto py-32 px-4 md:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-0">
          <Image
            src="/images/logo-white.svg"
            alt="Studiofy"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-[#f3f4f6] text-sm font-medium">Studiofy</span>
        </div>

        {/* Title Row */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-40 items-start lg:items-center pb-32">
          <h2 className="text-[#f3f4f6] text-4xl md:text-[56px] font-bold leading-[1.2]">
            Your all-in-one AI
            <br />
            photo studio
          </h2>
          <p className="text-[#e1e1e1] text-lg md:text-xl leading-[1.25] max-w-[480px]">
            Simplify your product photography with tools that handle everything.
            Combine into simple and fast workflows to get the desired results in
            seconds.
          </p>
        </div>

        {/* App Mockup Container */}
        <div className="relative border border-[#494a4a] rounded-2xl overflow-hidden bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-[rgba(16,17,19,0.1)]">
          {/* Window Title Bar */}
          <div className="flex items-center gap-4 px-6 py-6 border-b border-[#494a4a]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ee695e]" />
              <div className="w-3 h-3 rounded-full bg-[#f2c367]" />
              <div className="w-3 h-3 rounded-full bg-[#61c455]" />
            </div>
            <span className="text-[#f3f4f6] text-sm">Studiofy</span>
          </div>

          {/* Content Area */}
          <div className="flex">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col items-center py-6 px-4 border-r border-[rgba(73,74,74,0.5)] bg-[#14161b]/50">
              {sidebarIcons.map((Icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 flex items-center justify-center text-[#9ca3af] hover:text-white transition-colors mb-2"
                >
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>

            {/* Cards Carousel */}
            <div className="relative flex-1 overflow-hidden">
              {/* Gradient overlay left */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#14161b] to-transparent z-10 pointer-events-none hidden md:block" />

              {/* Scrollable container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-6 p-6 overflow-x-auto scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {features.map((feature) => (
                  <FeatureCard key={feature.title} {...feature} />
                ))}
                <MoreToolsCard />
              </div>

              {/* Gradient overlay right */}
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#14161b] to-transparent z-10 pointer-events-none" />
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-2 py-4">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-[#27272b] flex items-center justify-center text-white opacity-50 hover:opacity-100 transition-opacity"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-[#27272b] flex items-center justify-center text-white hover:bg-[#3a3a3f] transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
