'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UtensilsCrossed, BookOpen, Search, LogIn, UserPlus, ChefHat } from 'lucide-react';
import FormSignOut from '@/features/auth/components/FormSignOut';
import { useSession } from '@/features/auth/hooks';

export default function Navbar() {
  const pathname = usePathname();
  const { data: user } = useSession();

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:bg-amber-600 transition-colors">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-stone-900 group-hover:text-amber-600 transition-colors">
                Recipe<span className="text-amber-600">Book</span>
              </span>
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-stone-400 -mt-1">
                Culinary Creator
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'bg-amber-50 text-amber-700 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Home
            </Link>

            <Link
              href="/search"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/search')
                  ? 'bg-amber-50 text-amber-700 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Link>

            <Link
              href="/dashboard"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/dashboard')
                  ? 'bg-amber-50 text-amber-700 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>My Cookbook</span>
            </Link>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200/80 rounded-xl">
                  <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                    <ChefHat className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-stone-800 max-w-[120px] truncate">
                    {user.name || user.email?.split('@')[0]}
                  </span>
                </div>
                <FormSignOut />
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-amber-600 px-3 py-2 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1 text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 rounded-lg shadow-xs transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
