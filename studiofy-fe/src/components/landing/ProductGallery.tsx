'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

const metallicGradient =
  'linear-gradient(130deg, rgba(211,212,213,0.15) 13%, rgba(139,145,147,0.15) 15%, rgba(87,95,99,0.15) 18%, rgba(55,65,69,0.15) 19%, rgba(43,54,58,0.15) 19.5%, rgba(52,62,66,0.15) 23%, rgba(77,85,89,0.15) 27%, rgba(117,123,126,0.15) 33%, rgba(173,176,177,0.15) 38%, rgba(205,205,206,0.15) 42%, rgba(198,199,200,0.15) 43%, rgba(180,182,184,0.15) 45%, rgba(151,156,158,0.15) 47%, rgba(111,118,122,0.15) 49%, rgba(72,83,87,0.15) 51%, rgba(76,86,90,0.15) 52%, rgba(89,98,102,0.15) 55%, rgba(112,117,120,0.15) 57%, rgba(143,144,146,0.15) 59%, rgba(152,152,154,0.15) 60%, rgba(165,165,166,0.15) 63%, rgba(199,199,200,0.15) 71%, rgba(255,255,255,0.15) 79%, rgba(209,209,210,0.15) 81%, rgba(79,79,83,0.15) 87%, rgba(27,27,32,0.15) 90%, rgba(49,49,54,0.15) 91%, rgba(77,77,81,0.15) 92%, rgba(116,116,118,0.15) 93%, rgba(165,165,167,0.15) 95%, rgba(233,233,233,0.15) 95.5%)';

interface ProductCardProps {
  image: string;
  label: string;
  height: number;
  mobileHeight: number;
  offsetTop: number;
  mobileOffsetTop: number;
}

function ProductCard({
  image,
  label,
  height,
  mobileHeight,
  offsetTop,
  mobileOffsetTop,
}: ProductCardProps) {
  return (
    <div
      className="relative w-[160px] md:w-[237px] rounded-[16px] md:rounded-[20px] overflow-hidden shadow-[0px_6px_10px_0px_rgba(0,0,0,0.2)] md:shadow-[0px_10px_15.3px_0px_rgba(0,0,0,0.25)]"
      style={
        {
          '--mobile-height': `${mobileHeight}px`,
          '--desktop-height': `${height}px`,
          '--mobile-offset': `${mobileOffsetTop}px`,
          '--desktop-offset': `${offsetTop}px`,
        } as React.CSSProperties
      }
    >
      <style jsx>{`
        div {
          height: var(--mobile-height);
          margin-top: var(--mobile-offset);
        }
        @media (min-width: 768px) {
          div {
            height: var(--desktop-height);
            margin-top: var(--desktop-offset);
          }
        }
      `}</style>
      {/* Product image */}
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 160px, 237px"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Category badge */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-3 md:pb-4">
        <button className="relative px-5 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-white font-semibold text-xs md:text-sm whitespace-nowrap min-w-[100px] md:min-w-[120px] overflow-hidden hover:scale-[1.02] transition-transform">
          {/* Blue base */}
          <span className="absolute inset-0 bg-[#2563eb]" />
          {/* Metallic shine overlay */}
          <span
            className="absolute inset-0 mix-blend-hard-light rounded-lg md:rounded-xl"
            style={{ backgroundImage: metallicGradient }}
          />
          <span className="relative">{label}</span>
        </button>
      </div>
    </div>
  );
}

const products = [
  {
    image: '/images/products/professional.jpg',
    label: 'Professional',
    height: 275,
    mobileHeight: 185,
    offsetTop: 51,
    mobileOffsetTop: 34,
  },
  {
    image: '/images/products/luxury.jpg',
    label: 'Luxury',
    height: 321,
    mobileHeight: 215,
    offsetTop: 18,
    mobileOffsetTop: 12,
  },
  {
    image: '/images/products/modern.jpg',
    label: 'Modern',
    height: 352,
    mobileHeight: 235,
    offsetTop: 0,
    mobileOffsetTop: 0,
  },
  {
    image: '/images/products/classy.jpg',
    label: 'Classy',
    height: 314,
    mobileHeight: 210,
    offsetTop: 20,
    mobileOffsetTop: 13,
  },
  {
    image: '/images/products/tech.jpg',
    label: 'Tech',
    height: 275,
    mobileHeight: 185,
    offsetTop: 52,
    mobileOffsetTop: 35,
  },
];

export function ProductGallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { active: false },
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Effect for initial synchronization of selectedIndex
  useEffect(() => {
    if (!emblaApi) return;
    // Set initial selectedIndex
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]); // Run only when emblaApi changes

  // Effect for setting up event listeners
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    // Cleanup function
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative mt-12 md:mt-24 pb-8 md:pb-16">
      {/* Mobile: Swipeable carousel */}
      <div className="md:hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {products.map((product) => (
              <div key={product.label} className="flex-[0_0_100%] min-w-0 flex justify-center px-4">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === selectedIndex
                  ? 'w-2.5 h-2.5 bg-blue-600'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Original layout */}
      <div className="hidden md:flex justify-center gap-0 px-4">
        {products.map((product) => (
          <ProductCard key={product.label} {...product} />
        ))}
      </div>
    </section>
  );
}
