import FormSingIn from '@/features/auth/components/FormSingIn';
import { UtensilsCrossed } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-md shadow-amber-500/20">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">Welcome Back</h1>
          <p className="text-stone-500 text-xs">Sign in to access your personal recipe cookbook</p>
        </div>

        <FormSingIn />
      </div>
    </div>
  );
}
