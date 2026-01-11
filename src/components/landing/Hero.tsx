import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative flex flex-col items-center pt-8 md:pt-[60px] px-4">
      {/* Gradient blur background effect */}
      <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[300px] md:h-[500px] opacity-20 pointer-events-none">
        <Image
          src="/images/hero-blur-bg.svg"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-4 md:gap-6 max-w-[663px]">
        {/* Badge */}
        <div className="flex items-center gap-[5px]">
          <Image
            src="/images/ai-spark.svg"
            alt=""
            width={31}
            height={31}
            className="w-6 h-6 md:w-[30px] md:h-[30px]"
          />
          <span className="text-[var(--color-blue-600)] text-lg md:text-[25px] tracking-[-1.3px]">
            Studiofy is here !
          </span>
        </div>

        {/* Headline */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-[32px] sm:text-[40px] md:text-[63px] leading-[1.0] tracking-[-1.3px] font-normal">
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
