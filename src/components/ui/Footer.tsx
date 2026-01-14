import Image from 'next/image';
import Link from 'next/link';

const footerLinks = {
  products: {
    title: 'Products',
    links: [
      { label: 'Studiofy', href: '/' },
      { label: 'Studiofy API', href: '/api' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Blog', href: '/blog' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
  photography: {
    title: 'Photography Ideas',
    links: [
      { label: 'Beauty & skincare', href: '/ideas/beauty' },
      { label: 'Health & supplement', href: '/ideas/health' },
      { label: 'Candle', href: '/ideas/candle' },
      { label: 'Beverage', href: '/ideas/beverage' },
      { label: 'Jewelry', href: '/ideas/jewelry' },
      { label: 'Perfume', href: '/ideas/perfume' },
    ],
  },
};

interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="flex flex-col">
      <h3 className="text-black font-medium text-base mb-4">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[#57534e] text-base hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#e9e9e9] border-t border-[#e7e5e4] shadow-[0px_-7px_9px_-3px_rgba(0,0,0,0.15)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/images/logo.svg"
                alt="Studiofy"
                width={40}
                height={40}
              />
              <span className="text-black text-xl tracking-[-1px]">
                Studiofy
              </span>
            </Link>
          </div>

          {/* Links Grid */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-8 md:gap-16 flex-1 md:justify-end">
            <FooterColumn {...footerLinks.products} />
            <FooterColumn {...footerLinks.resources} />
            <FooterColumn {...footerLinks.photography} />
          </div>
        </div>
      </div>
    </footer>
  );
}
