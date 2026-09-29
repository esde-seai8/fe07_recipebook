'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { logoutAction } from '../actions';

export default function FormSingOut() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutAction();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth-change'));
      }
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span>{loading ? 'Logging out...' : 'Sign Out'}</span>
    </button>
  );
}
