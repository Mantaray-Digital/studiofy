import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

function GenerateInputBar() {
  return (
    <div className="relative w-full ">
      {/* AI Icon */}
      <Link href="/">
    <div className="flex items-center gap-2">
      <span className="text-blue-500">Learn More  </span>
      <ArrowRight className="w-4 h-4 text-blue-500" />
    </div>
        </Link>
      </div>
  );
}

export function BenefitsSection() {
  return (
    <section className="bg-white px-4 md:px-8 py-12 md:py-24">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-0">
          {/* Left Column - Text Content */}
          <div className="flex flex-col gap-4 md:gap-6 w-full lg:w-[548px] lg:pr-8 text-center lg:text-left">
            <h2 className="text-[#14161b] text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.17]">
              Improve conversions with
              <br className="hidden sm:block" />
              polished product shots
            </h2>

            <p className="text-[#44465c] text-sm md:text-base leading-6">
              Edit and generate high-converting creatives for catalogs, marketing
              and ad campaigns. Turn a single product photo into numerous unique,
              realistic and appealing visuals that engage your customers.
            </p>

            <div className="flex justify-center lg:justify-start">
              <GenerateInputBar />
            </div>
          </div>

          {/* Right Column - Product Image */}
          <div className="relative w-full lg:flex-1">
            {/* Main Image */}
            <div className="relative w-full max-w-[400px] md:max-w-[653px] aspect-square rounded-[32px] md:rounded-[56px] overflow-hidden mx-auto lg:ml-auto lg:mr-0">
              <Image
                src="/images/benefits-product.jpg"
                alt="Professional product photography"
                fill
                className="object-cover"
              />
            </div>

            {/* Comparison Thumbnails */}

          </div>
        </div>
      </div>
    </section>
  );
}
