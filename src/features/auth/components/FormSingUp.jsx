'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, AlertCircle } from 'lucide-react';
import { registerAction } from '../actions';

export default function FormSingUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await registerAction({ name, email, password });
      if (res.success) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('auth-change'));
        }
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(res.error || 'Registration failed.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Chef Auguste"
          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="chef@recipebook.com"
          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-700 mb-1">Password</label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-colors shadow-xs disabled:opacity-50 text-sm"
      >
        <UserPlus className="w-4 h-4" />
        <span>{loading ? 'Creating Account...' : 'Sign Up'}</span>
      </button>

      <p className="text-center text-xs text-stone-500 mt-4">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-amber-600 hover:underline">
          Sign in here
        </Link>
      </p>
    </form>
  );
}
