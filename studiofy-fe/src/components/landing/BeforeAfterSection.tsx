'use client';

import Image from 'next/image';
import { useState, useRef, useCallback } from 'react';
import { GripVertical } from 'lucide-react';

const styles = ['Classy', 'Modern', 'Tech', 'Luxury', 'Professional'] as const;
type Style = (typeof styles)[number];

export function BeforeAfterSection() {
  const [activeStyle, setActiveStyle] = useState<Style>('Classy');
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="bg-white px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="text-center max-w-[900px]">
            <h2 className="text-[#14161b] text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.17] mb-3 md:mb-4">
              Turn plain product photos into beautiful visual
              <br className="hidden md:block" />
              assets with AI
            </h2>
            <p className="text-[#9ca3af] text-sm md:text-base font-medium">
              Improve your visual content with Studiofy tailored for enhancing
              your products.
            </p>
          </div>

          {/* Style Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {styles.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setActiveStyle(style)}
                className={`px-4 cursor-pointer md:px-6 py-3 md:py-4 rounded-md text-xs md:text-sm font-medium transition-colors min-h-[40px] md:min-h-[48px] ${
                  activeStyle === style
                    ? 'bg-[var(--color-blue-600)] text-white'
                    : 'bg-[#f3f4f6] text-[#14161b] hover:bg-[#e5e7eb]'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Before/After Comparison Slider */}
        <div
          ref={containerRef}
          className="relative w-full max-w-[1106px] mx-auto aspect-[1106/737] rounded-[12px] md:rounded-[20px] overflow-hidden cursor-ew-resize select-none"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Before Image (Grayscale - Right side) */}
          <div className="absolute inset-0">
            <Image
              src="/images/comparison/product-after.jpg"
              alt="Before - Original product photo"
              fill
              className="object-cover grayscale"
              draggable={false}
            />
            {/* Before Label */}
            <div className="absolute top-2 md:top-4 right-[10%] md:right-[20%] z-20">
              <span className="relative inline-flex items-center px-2 md:px-4 py-1 md:py-2 rounded-[8px] md:rounded-[10px] text-white text-sm md:text-lg font-semibold overflow-hidden">
                <span className="absolute inset-0 bg-[#2563eb]" />
                <span
                  className="absolute inset-0 mix-blend-hard-light rounded-[8px] md:rounded-[10px]"
                  style={{
                    backgroundImage:
                      'linear-gradient(130deg, rgba(211,212,213,0.15) 13%, rgba(139,145,147,0.15) 15%, rgba(87,95,99,0.15) 18%, rgba(55,65,69,0.15) 19%, rgba(43,54,58,0.15) 19.5%, rgba(52,62,66,0.15) 23%, rgba(77,85,89,0.15) 27%, rgba(117,123,126,0.15) 33%, rgba(173,176,177,0.15) 38%, rgba(205,205,206,0.15) 42%, rgba(151,156,158,0.15) 47%, rgba(72,83,87,0.15) 51%, rgba(112,117,120,0.15) 57%, rgba(165,165,166,0.15) 63%, rgba(255,255,255,0.15) 79%, rgba(79,79,83,0.15) 87%, rgba(165,165,167,0.15) 95%)',
                  }}
                />
                <span className="relative">Before</span>
              </span>
            </div>
          </div>

          {/* After Image (Color - Left side, clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              src="/images/comparison/product-after.jpg"
              alt="After - Enhanced product photo"
              fill
              className="object-cover"
              draggable={false}
            />
            {/* After Label */}
            <div className="absolute top-2 md:top-4 left-[10%] md:left-[20%] z-20">
              <span className="relative inline-flex items-center px-2 md:px-4 py-1 md:py-2 rounded-[8px] md:rounded-[10px] text-white text-sm md:text-lg font-semibold overflow-hidden">
                <span className="absolute inset-0 bg-[#2563eb]" />
                <span
                  className="absolute inset-0 mix-blend-hard-light rounded-[8px] md:rounded-[10px]"
                  style={{
                    backgroundImage:
                      'linear-gradient(130deg, rgba(211,212,213,0.15) 13%, rgba(139,145,147,0.15) 15%, rgba(87,95,99,0.15) 18%, rgba(55,65,69,0.15) 19%, rgba(43,54,58,0.15) 19.5%, rgba(52,62,66,0.15) 23%, rgba(77,85,89,0.15) 27%, rgba(117,123,126,0.15) 33%, rgba(173,176,177,0.15) 38%, rgba(205,205,206,0.15) 42%, rgba(151,156,158,0.15) 47%, rgba(72,83,87,0.15) 51%, rgba(112,117,120,0.15) 57%, rgba(165,165,166,0.15) 63%, rgba(255,255,255,0.15) 79%, rgba(79,79,83,0.15) 87%, rgba(165,165,167,0.15) 95%)',
                  }}
                />
                <span className="relative">After</span>
              </span>
            </div>
          </div>

          {/* Slider Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
            style={{ left: `${sliderPosition}%` }}
          />

          {/* Slider Handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className="w-10 md:w-14 h-10 md:h-14 rounded-full bg-[var(--color-blue-600)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <GripVertical className="w-5 md:w-6 h-5 md:h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
