import Image from 'next/image';
import { MetallicButton } from '@/components/ui/MetallicButton';

export function GenerateInput() {
  return (
    <section className="relative flex justify-center px-4 mt-8 md:mt-12">
      {/* Outer container with gradient border effect */}
      <div className="relative w-full max-w-[800px] h-auto md:h-[110px] rounded-[24px] md:rounded-[36px] shadow-[0px_10px_20px_0px_rgba(0,0,0,0.1)] md:shadow-[0px_20px_40px_0px_rgba(0,0,0,0.15)]">
        {/* Gradient border background */}
        <div className="absolute inset-0 rounded-[24px] md:rounded-[36px] bg-gradient-to-b from-[rgba(0,187,255,0.1)] to-[rgba(196,77,255,0.1)]" />

        {/* Inner white container */}
        <div className="relative md:absolute inset-0 md:inset-[10px] bg-gradient-to-b from-[rgba(255,255,255,0.8)] to-white rounded-[20px] md:rounded-[26px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-center p-4 md:px-5 gap-3 md:gap-0">
          {/* AI Icon */}
          <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-[10px] md:rounded-[14px] bg-gradient-to-l from-[rgba(167,129,255,0.1)] to-[rgba(27,187,255,0.1)] flex items-center justify-center">
            <Image
              src="/images/generate-icon-new.svg"
              alt=""
              width={37}
              height={37}
              className="w-7 h-7 md:w-[37px] md:h-[37px]"
            />
          </div>

          {/* Input placeholder */}
          <div className="flex-1 md:ml-4 text-center md:text-left">
            <span className="text-sm md:text-lg text-[rgba(0,0,0,0.4)]">
              Generate professional Pictures for your product
            </span>
          </div>

          {/* Generate button */}
          <MetallicButton className="w-full cursor-pointer md:w-auto h-[44px] md:h-[50px] px-6 md:px-8 rounded-[10px] md:rounded-[14px] text-base md:text-xl">
            Generate
          </MetallicButton>
        </div>

        {/* Subtle border overlays */}
        <div className="absolute inset-0 rounded-[24px] md:rounded-[36px] border border-[rgba(0,0,0,0.05)] pointer-events-none" />
      </div>
    </section>
  );
}
