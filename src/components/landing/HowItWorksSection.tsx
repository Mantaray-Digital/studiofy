import Image from 'next/image';
import { MetallicButton } from '@/components/ui/MetallicButton';

interface FeatureCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

function FeatureCard({
  title,
  description,
  children,
  className = '',
}: FeatureCardProps) {
  return (
    <div
      className={`bg-[#f6f6f6] border border-[rgba(13,13,13,0.08)] rounded-2xl md:rounded-3xl overflow-hidden relative min-h-[320px] md:min-h-[400px] ${className}`}
    >
      <div className="p-5 md:p-8 pb-0 relative z-10">
        <h3 className="text-[#0d0d0d] text-base md:text-lg font-semibold leading-6 mb-2">
          {title}
        </h3>
        <p className="text-[#a9a9a9] text-xs md:text-sm font-medium leading-[1.7] max-w-[340px]">
          {description}
        </p>
      </div>
      <div className="relative h-[200px] md:h-[280px] mt-4">{children}</div>
    </div>
  );
}

function GenerateInputMockup() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Orbital rings decoration - positioned to center in the card */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute w-[535px] h-[535px] -left-[267px] -top-[267px] rounded-full border border-[#d0d0d0] opacity-10" />
        <div className="absolute w-[440px] h-[440px] -left-[220px] -top-[220px] rounded-full border border-[#d0d0d0] opacity-10" />
        <div className="absolute w-[350px] h-[350px] -left-[175px] -top-[175px] rounded-full border border-[#d0d0d0] opacity-[0.15]" />
        <div className="absolute w-[260px] h-[260px] -left-[130px] -top-[130px] rounded-full border border-[#d0d0d0] opacity-20" />
        <div className="absolute w-[170px] h-[170px] -left-[85px] -top-[85px] rounded-full border border-[#d0d0d0] opacity-30" />
      </div>

      {/* Generate input bar */}
      <div className="relative w-[90%] max-w-[540px] h-[74px] rounded-[24px] shadow-[0px_13px_27px_0px_rgba(0,0,0,0.15)] bg-gradient-to-b from-[rgba(0,187,255,0.1)] to-[rgba(196,77,255,0.1)]">
        <div className="absolute inset-[7px] bg-gradient-to-b from-[rgba(255,255,255,0.8)] to-white rounded-[18px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)] flex items-center px-4">
          {/* AI icon */}
          <div className="w-8 h-8 rounded-[10px] bg-gradient-to-l from-[rgba(167,129,255,0.1)] to-[rgba(27,187,255,0.1)] flex items-center justify-center mr-3 flex-shrink-0">
            <Image
              src="/images/generate-icon-new.svg"
              alt=""
              width={25}
              height={25}
              className="w-[25px] h-[25px]"
            />
          </div>
          {/* Placeholder text */}
          <span className="text-xs text-[rgba(0,0,0,0.4)] flex-1">
            Generate professional Pictures for your product
          </span>
          {/* Generate button */}
          <div
            className="h-[34px] px-6 rounded-[10px] flex items-center flex-shrink-0 relative"
            style={{
              background: 'linear-gradient(-78deg, #cc00ff 0%, #0099ff 100%)',
            }}
          >
            <span className="text-white text-sm font-semibold">Generate</span>
          </div>
        </div>
        {/* Pointer icon pointing at Generate button */}
        <div className="absolute right-[calc(7px+16px+20px)] bottom-[-18px] pointer-events-none">
          <Image
            src="/images/pointer.svg"
            alt=""
            width={21}
            height={24}
            className="w-[21px] h-[24px]"
          />
        </div>
        {/* Border overlays */}
        <div className="absolute inset-0 rounded-[24px] border border-[rgba(0,0,0,0.05)] pointer-events-none" />
      </div>
    </div>
  );
}

function ColorPickerMockup() {
  const colors = [
    { name: 'Yellow', color: '#ffe24f' },
    { name: 'Orange', color: '#fa9a41' },
    { name: 'Red', color: '#f57052' },
    { name: 'Purple', color: '#8d7af7' },
  ];

  return (
    <div className="absolute inset-0 flex items-start px-8 pt-4 gap-4">
      {/* Product image on left */}
      <div className="relative w-[215px] h-[166px] flex-shrink-0">
        <Image
          src="/images/how-it-works/color-reference-new.png"
          alt="Product with color variations"
          fill
          className="object-contain"
        />
      </div>

      {/* Color picker panel on right */}
      <div className="bg-white rounded-lg shadow-[-3px_-2px_4px_0px_rgba(0,0,0,0.25)] w-[250px] overflow-hidden flex-shrink-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(193,193,193,0.4)]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-purple-400 to-blue-400 rounded" />
            <span className="text-[11px] font-medium text-black tracking-[0.4px]">
              Choose Color
            </span>
          </div>
        </div>
        <div className="px-4 py-3 border-b border-[rgba(193,193,193,0.4)]">
          <span className="text-[11px] text-black tracking-[0.4px]">Search</span>
        </div>
        <div className="py-2">
          {colors.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
            >
              <div
                className="w-[18px] h-[18px] rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[11px] font-medium text-black tracking-[0.4px]">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="bg-white px-4 md:px-[100px] py-16 md:py-32">
      <div className="max-w-[1224px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-[148px] mb-10 md:mb-16">
          <h2 className="text-black text-4xl sm:text-5xl md:text-6xl lg:text-[128px] font-normal leading-[0.9] tracking-[-2px] md:tracking-[-5px]">
            How it
            <br />
            works
          </h2>
          <div className="flex flex-col gap-4 md:gap-6 pt-2 md:pt-4 max-w-[567px]">
            <p className="text-black text-base md:text-xl lg:text-2xl leading-[1.3]">
              Upload your product photo and let Studiofy generate professional
              visuals using AI.
              <br className="hidden md:block" />
              Write your own prompt or choose from curated product styles.
            </p>
            <MetallicButton href="#learn-more" className="text-sm md:text-base w-full md:w-xs sm:w-auto">
              Learn More
            </MetallicButton>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Card 1: Transforms your product */}
          <FeatureCard
            title="Transforms your product into designs"
            description="Studiofy creates fully-editable UI designs with just a simple product description."
          >
            <GenerateInputMockup />
          </FeatureCard>

          {/* Card 2: Auto-suggests */}
          <FeatureCard
            title="Auto-suggests as you want"
            description="Improve your product view with AI-powered in-line suggestions."
          >
            <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
              <Image
                src="/images/how-it-works/auto-suggests-new.png"
                alt="Auto-suggest feature"
                width={393}
                height={353}
                className="object-cover object-top"
              />
            </div>
          </FeatureCard>

          {/* Card 3: Choose from curated styles */}
          <FeatureCard
            title="Choose from curated styles"
            description="Studiofy iterates on your designs you to explore new themes during your process."
            className="bg-[#f9f9f9]"
          >
            <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
              <Image
                src="/images/how-it-works/image-12.png"
                alt="Curated styles feature"
                width={399}
                height={400}
                className="object-cover object-top shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.25)]"
              />
            </div>
          </FeatureCard>

          {/* Card 4: Get the colors you want */}
          <FeatureCard
            title="Get the colors you want"
            description="Besides describing what you want with text, you can use a reference image to show the AI what you want."
            className="bg-[#f9f9f9]"
          >
            <ColorPickerMockup />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
