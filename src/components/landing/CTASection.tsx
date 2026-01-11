import Image from 'next/image';
import { MetallicButton } from '@/components/ui/MetallicButton';

export function CTASection() {
  return (
    <section className="bg-white px-4 md:px-8 py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-[600px] mx-auto flex flex-col items-center gap-8 relative z-10">
        {/* Decorative product image */}
        <div className="flex justify-center">
          <Image
            src="/images/Container (1).png"
            alt="Product photography example"
            width={120}
            height={120}
            className="rounded-2xl shadow-lg w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
          />
        </div>

        {/* Headline */}
        <div className="text-center">
          <h2 className="text-[#14161b] text-3xl md:text-5xl font-bold leading-[1.2] tracking-[-1.5px]">
            Still not sure?
          </h2>
          <p className="text-black text-3xl md:text-5xl font-bold leading-[1.2] tracking-[-1.5px]">
            Just try it already. It&apos;s free
          </p>
        </div>

        {/* Subtext */}
        <p className="text-[#6b7280] text-base md:text-lg leading-6 text-center max-w-[738px]">
          Remove backgrounds, fix lights, generate backgrounds - Generate
          professional shots designed for your requirements
        </p>

        {/* CTA Button */}
        <MetallicButton href="/signup" className="text-[22px] min-w-[226px]">
          Generate
        </MetallicButton>
      </div>
    </section>
  );
}
