import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Providers from './provider';

export const metadata: Metadata = {
  title: 'Recipe Book — Discover, Cook & Save Your Favorites',
  description: 'A culinary web application to search delicious recipes, maintain personal cookbook notes, and create custom dishes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-stone-50 text-stone-900 antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <footer className="border-t border-stone-200 bg-white py-8 text-center text-xs text-stone-500">
            <p className="max-w-7xl mx-auto px-4">
              Recipe Book &copy; {new Date().getFullYear()} — Built with Next.js, TypeScript, TailwindCSS & Neon Postgres.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
