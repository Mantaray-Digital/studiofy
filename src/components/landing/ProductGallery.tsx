import Image from 'next/image';

interface ProductCardProps {
  image: string;
  label: string;
  height: number;
  offsetTop: number;
}

function ProductCard({ image, label, height, offsetTop }: ProductCardProps) {
  return (
    <div
      className="relative flex-shrink-0 w-[237px] rounded-[20px] overflow-hidden shadow-[0px_10px_15.3px_0px_rgba(0,0,0,0.25)]"
      style={{ height: `${height}px`, marginTop: `${offsetTop}px` }}
    >
      {/* Product image */}
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover"
        sizes="237px"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Category badge */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="px-4 py-2.5 bg-[var(--color-blue-600)] rounded-full">
          <span className="text-[13.5px] font-semibold text-white whitespace-nowrap">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

const products = [
  {
    image: '/images/products/professional.jpg',
    label: 'Professional',
    height: 275,
    offsetTop: 51,
  },
  {
    image: '/images/products/luxury.jpg',
    label: 'Luxury',
    height: 321,
    offsetTop: 18,
  },
  {
    image: '/images/products/modern.jpg',
    label: 'Modern',
    height: 352,
    offsetTop: 0,
  },
  {
    image: '/images/products/classy.jpg',
    label: 'Classy',
    height: 314,
    offsetTop: 20,
  },
  {
    image: '/images/products/tech.jpg',
    label: 'Tech',
    height: 275,
    offsetTop: 52,
  },
];

export function ProductGallery() {
  return (
    <section className="relative mt-24 pb-16 overflow-x-auto">
      <div className="flex justify-center gap-5 px-4 min-w-max mx-auto">
        {products.map((product) => (
          <ProductCard key={product.label} {...product} />
        ))}
      </div>
    </section>
  );
}
