// Layout.tsx
import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Analytics } from '@vercel/analytics/react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>

      <Footer />

      {/* Mount once, outside content */}
      <Analytics />
    </div>
  );
};
