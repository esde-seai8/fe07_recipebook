import FormSingUp from '@/features/auth/components/FormSingUp';
import { ChefHat } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-md shadow-amber-500/20">
            <ChefHat className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">Create Account</h1>
          <p className="text-stone-500 text-xs">Join Recipe Book and build your digital culinary notebook</p>
        </div>

        <FormSingUp />
      </div>
    </div>
  );
}
