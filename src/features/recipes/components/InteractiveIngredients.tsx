'use client';

import { useState } from 'react';
import { ChefHat, Check } from 'lucide-react';

interface IngredientObj {
  name: string;
  amount?: string;
}

interface InteractiveIngredientsProps {
  ingredients?: (string | IngredientObj)[];
}

export default function InteractiveIngredients({ ingredients = [] }: InteractiveIngredientsProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs h-fit space-y-4">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <ChefHat className="w-5 h-5 text-amber-600" />
          <h2 className="text-xl font-bold text-stone-900">Ingredients</h2>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
          {ingredients.length} items
        </span>
      </div>

      <p className="text-xs text-stone-500 italic">Check off items as you prepare:</p>

      <ul className="space-y-2.5">
        {ingredients.map((item, idx) => {
          const isChecked = Boolean(checkedItems[idx]);
          const text = typeof item === 'string' ? item : item?.name || '';
          const amount = typeof item === 'object' && 'amount' in item ? item.amount : '';

          return (
            <li
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`flex items-start gap-3 p-2 rounded-xl transition-all cursor-pointer select-none ${
                isChecked
                  ? 'bg-amber-50/60 text-stone-400 line-through'
                  : 'hover:bg-stone-50 text-stone-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isChecked
                    ? 'bg-amber-600 border-amber-600 text-white'
                    : 'border-stone-300 bg-white'
                }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <div className="flex-1 flex items-baseline justify-between text-sm leading-snug">
                <span className={isChecked ? 'line-through text-stone-400' : 'font-medium'}>
                  {text}
                </span>
                {amount && (
                  <span className={`text-xs font-semibold ml-2 shrink-0 ${isChecked ? 'text-stone-300' : 'text-amber-700'}`}>
                    {amount}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
