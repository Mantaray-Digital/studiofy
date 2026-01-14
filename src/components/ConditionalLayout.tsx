'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

export function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthRoute = pathname?.startsWith('/login') ||
                      pathname?.startsWith('/signup') ||
                      pathname?.startsWith('/reset-password') ||
                      pathname?.startsWith('/verify-email') ||
                      pathname?.startsWith('/authGoogle');

  const isDashboardRoute = pathname?.startsWith('/profile');

  const showMainLayout = !isAuthRoute && !isDashboardRoute;

  return (
    <>
      {showMainLayout && <Header />}
      {children}
      {showMainLayout && <Footer />}
    </>
  );
}



