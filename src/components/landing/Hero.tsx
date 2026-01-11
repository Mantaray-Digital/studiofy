import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative flex flex-col items-center pt-[60px] px-4">
      {/* Gradient blur background effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[420px] opacity-50 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(167,129,255,0.3)] via-[rgba(27,187,255,0.2)] to-transparent blur-[80px]" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-6 max-w-[663px]">
        {/* Badge */}
        <div className="flex items-center gap-[5px]">
          <Image
            src="/images/ai-spark.svg"
            alt=""
            width={31}
            height={31}
            className="w-[30px] h-[30px]"
          />
          <span className="text-[var(--color-blue-600)] text-[25px] tracking-[-1.3px]">
            Studiofy is here !
          </span>
        </div>

        {/* Headline */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-[40px] md:text-[63px] leading-[1.0] tracking-[-1.3px] font-normal">
            <span className="text-[#292824]">Studio-Quality</span>
            <br />
            <span className="text-[#292824]">Product Photos.</span>
            <br />
            <span className="text-[var(--color-blue-600)]">Instantly</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
