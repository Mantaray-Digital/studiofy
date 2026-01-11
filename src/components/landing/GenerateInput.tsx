import Image from 'next/image';

export function GenerateInput() {
  return (
    <section className="relative flex justify-center px-4 mt-12">
      {/* Outer container with gradient border effect */}
      <div className="relative w-full max-w-[800px] h-[110px] rounded-[36px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.15)]">
        {/* Gradient border background */}
        <div className="absolute inset-0 rounded-[36px] bg-gradient-to-b from-[rgba(0,187,255,0.1)] to-[rgba(196,77,255,0.1)]" />

        {/* Inner white container */}
        <div className="absolute inset-[10px] bg-gradient-to-b from-[rgba(255,255,255,0.8)] to-white rounded-[26px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] flex items-center px-5">
          {/* AI Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-[14px] bg-gradient-to-l from-[rgba(167,129,255,0.1)] to-[rgba(27,187,255,0.1)] flex items-center justify-center">
            <Image
              src="/images/generate-icon.png"
              alt=""
              width={37}
              height={37}
              className="w-[37px] h-[37px]"
            />
          </div>

          {/* Input placeholder */}
          <div className="flex-1 ml-4">
            <span className="text-lg text-[rgba(0,0,0,0.4)]">
              Generate professional Pictures for your product
            </span>
          </div>

          {/* Generate button */}
          <button
            type="button"
            className="flex-shrink-0 relative h-[50px] px-8 rounded-[14px] overflow-hidden shadow-[0px_0.723px_0.723px_-1.25px_rgba(0,0,0,0.18),0px_2.746px_2.746px_-2.5px_rgba(0,0,0,0.16),0px_12px_12px_-3.75px_rgba(0,0,0,0.06)] hover:scale-[1.02] transition-transform"
          >
            {/* Button gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0cf] to-[#96f]" />

            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#96f] to-[#0cf] opacity-40 blur-[2px]" />

            {/* Button text */}
            <span className="relative text-xl font-semibold text-white tracking-[-0.1px]">
              Generate
            </span>
          </button>
        </div>

        {/* Subtle border overlays */}
        <div className="absolute inset-0 rounded-[36px] border border-[rgba(0,0,0,0.05)] pointer-events-none" />
      </div>
    </section>
  );
}
