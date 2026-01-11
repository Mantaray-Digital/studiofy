import Image from 'next/image';
import Link from 'next/link';

interface FeatureCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function FeatureCard({ title, description, children }: FeatureCardProps) {
  return (
    <div className="bg-[#f6f6f6] border border-[rgba(13,13,13,0.08)] rounded-3xl overflow-hidden relative">
      <div className="p-8 pb-0">
        <h3 className="text-[#0d0d0d] text-lg font-semibold leading-6 mb-2">
          {title}
        </h3>
        <p className="text-[#a9a9a9] text-sm font-medium leading-[1.7] max-w-[340px]">
          {description}
        </p>
      </div>
      <div className="relative h-[280px] mt-4">{children}</div>
    </div>
  );
}

function GenerateInputMockup() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Orbital rings decoration */}
      <div className="absolute w-[350px] h-[350px] rounded-full border border-[#e0e0e0] opacity-20" />
      <div className="absolute w-[260px] h-[260px] rounded-full border border-[#e0e0e0] opacity-30" />
      <div className="absolute w-[170px] h-[170px] rounded-full border border-[#e0e0e0] opacity-20" />

      {/* Generate input bar */}
      <div className="relative w-[400px] h-[56px] rounded-[18px] shadow-lg bg-gradient-to-b from-[rgba(0,187,255,0.1)] to-[rgba(196,77,255,0.1)]">
        <div className="absolute inset-[5px] bg-gradient-to-b from-[rgba(255,255,255,0.9)] to-white rounded-[14px] flex items-center px-4">
          {/* AI icon */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-l from-[rgba(167,129,255,0.1)] to-[rgba(27,187,255,0.1)] flex items-center justify-center mr-3">
            <Image
              src="/images/generate-icon.png"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </div>
          {/* Placeholder text */}
          <span className="text-xs text-[rgba(0,0,0,0.4)] flex-1">
            Generate professional Pictures for your product
          </span>
          {/* Generate button */}
          <div className="h-[34px] px-4 rounded-lg bg-gradient-to-r from-[#0cf] to-[#96f] flex items-center">
            <span className="text-white text-xs font-semibold">Generate</span>
          </div>
        </div>
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
    <div className="absolute inset-0 flex items-start justify-center pt-4 px-8">
      {/* Product image */}
      <div className="relative w-[180px] h-[140px] mr-4">
        <Image
          src="/images/how-it-works/color-reference.png"
          alt="Product with color variations"
          fill
          className="object-contain"
        />
      </div>

      {/* Color picker panel */}
      <div className="bg-white rounded-lg shadow-lg w-[180px] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(193,193,193,0.4)]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-purple-400 to-blue-400 rounded" />
            <span className="text-xs font-medium text-black">Choose Color</span>
          </div>
        </div>
        <div className="px-4 py-3 border-b border-[rgba(193,193,193,0.4)]">
          <span className="text-xs text-gray-500">Search</span>
        </div>
        <div className="py-2">
          {colors.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-medium text-black">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="bg-white px-4 md:px-[100px] py-20 md:py-32">
      <div className="max-w-[1224px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[148px] mb-16">
          <h2 className="text-black text-6xl md:text-[128px] font-normal leading-[0.9] tracking-[-5px]">
            How it
            <br />
            works
          </h2>
          <div className="flex flex-col gap-6 pt-4 max-w-[567px]">
            <p className="text-black text-xl md:text-2xl leading-[1.3]">
              Upload your product photo and let Studiofy generate professional
              visuals using AI.
              <br />
              Write your own prompt or choose from curated product styles.
            </p>
            <Link
              href="#learn-more"
              className="inline-flex items-center justify-center px-4 py-2 bg-[var(--color-blue-600)] rounded-[10px] text-white font-semibold text-base w-fit hover:bg-[var(--color-blue-700)] transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="absolute inset-0 flex items-end justify-center">
              <Image
                src="/images/how-it-works/auto-suggests.jpg"
                alt="Auto-suggest feature"
                width={393}
                height={280}
                className="object-cover object-top"
              />
            </div>
          </FeatureCard>

          {/* Card 3: Choose from curated styles */}
          <FeatureCard
            title="Choose from curated styles"
            description="Studiofy iterates on your designs you to explore new themes during your process."
          >
            <div className="absolute inset-0 flex items-end justify-center">
              <Image
                src="/images/how-it-works/curated-styles.jpg"
                alt="Curated styles feature"
                width={399}
                height={280}
                className="object-cover object-top"
              />
            </div>
          </FeatureCard>

          {/* Card 4: Get the colors you want */}
          <FeatureCard
            title="Get the colors you want"
            description="Besides describing what you want with text, you can use a reference image to show the AI what you want."
          >
            <ColorPickerMockup />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
