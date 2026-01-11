import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Check, X } from 'lucide-react';

export function BenefitsSection() {
  return (
    <section className="bg-white px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          {/* Left Column - Text Content */}
          <div className="flex flex-col gap-6 w-full lg:w-[548px] lg:pr-8">
            <h2 className="text-[#14161b] text-3xl md:text-4xl font-bold leading-[1.17]">
              Improve conversions with
              <br />
              polished product shots
            </h2>

            <p className="text-[#44465c] text-base leading-6">
              Edit and generate high-converting creatives for catalogs, marketing
              and ad campaigns. Turn a single product photo into numerous unique,
              realistic and appealing visuals that engage your customers.
            </p>

            <Link
              href="#learn-more"
              className="inline-flex items-center text-[#7168fa] text-sm font-medium hover:underline w-fit"
            >
              Learn More
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>

          {/* Right Column - Product Image */}
          <div className="relative w-full lg:flex-1">
            {/* Main Image */}
            <div className="relative w-full max-w-[653px] aspect-square rounded-[56px] overflow-hidden ml-auto">
              <Image
                src="/images/benefits-product.jpg"
                alt="Professional product photography"
                fill
                className="object-cover"
              />
            </div>

            {/* Comparison Thumbnails */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:bottom-8 lg:right-[15%] flex gap-3">
              {/* Approved thumbnail */}
              <div className="relative w-[140px] h-[120px] rounded-xl overflow-hidden shadow-lg bg-white">
                <Image
                  src="/images/benefits-product.jpg"
                  alt="Approved version"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <div className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-[10px] font-medium text-gray-800">
                    Typology.
                  </span>
                </div>
              </div>

              {/* Rejected thumbnail */}
              <div className="relative w-[140px] h-[120px] rounded-xl overflow-hidden shadow-lg bg-white">
                <Image
                  src="/images/benefits-product.jpg"
                  alt="Rejected version"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <div className="w-4 h-4 rounded-full bg-pink-400 flex items-center justify-center">
                    <X className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-[10px] font-medium text-gray-800">
                    Typology.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
