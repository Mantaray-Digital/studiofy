import Link from 'next/link';

interface MetallicButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

const metallicGradient =
  'linear-gradient(130deg, rgba(211,212,213,0.15) 13%, rgba(139,145,147,0.15) 15%, rgba(87,95,99,0.15) 18%, rgba(55,65,69,0.15) 19%, rgba(43,54,58,0.15) 19.5%, rgba(52,62,66,0.15) 23%, rgba(77,85,89,0.15) 27%, rgba(117,123,126,0.15) 33%, rgba(173,176,177,0.15) 38%, rgba(205,205,206,0.15) 42%, rgba(198,199,200,0.15) 43%, rgba(180,182,184,0.15) 45%, rgba(151,156,158,0.15) 47%, rgba(111,118,122,0.15) 49%, rgba(72,83,87,0.15) 51%, rgba(76,86,90,0.15) 52%, rgba(89,98,102,0.15) 55%, rgba(112,117,120,0.15) 57%, rgba(143,144,146,0.15) 59%, rgba(152,152,154,0.15) 60%, rgba(165,165,166,0.15) 63%, rgba(199,199,200,0.15) 71%, rgba(255,255,255,0.15) 79%, rgba(209,209,210,0.15) 81%, rgba(79,79,83,0.15) 87%, rgba(27,27,32,0.15) 90%, rgba(49,49,54,0.15) 91%, rgba(77,77,81,0.15) 92%, rgba(116,116,118,0.15) 93%, rgba(165,165,167,0.15) 95%, rgba(233,233,233,0.15) 95.5%)';

export function MetallicButton({
  children,
  href,
  onClick,
  className = '',
  type = 'button',
}: MetallicButtonProps) {
  const baseClasses = `relative inline-flex items-center justify-center px-4 py-2 rounded-[11px] text-white font-semibold text-lg overflow-hidden hover:scale-[1.02] transition-transform ${className}`;

  const content = (
    <>
      {/* Blue base */}
      <span className="absolute inset-0 bg-[#2563eb]" />
      {/* Metallic shine overlay */}
      <span
        className="absolute inset-0 mix-blend-hard-light rounded-[11px]"
        style={{ backgroundImage: metallicGradient }}
      />
      <span className="relative">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}
