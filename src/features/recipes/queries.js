'use client';

import { useQuery } from '@tanstack/react-query';

export async function fetchRecipesApi({ search = '', cuisine = '', difficulty = '' } = {}) {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (cuisine && cuisine !== 'All') params.append('cuisine', cuisine);
  if (difficulty && difficulty !== 'All') params.append('difficulty', difficulty);

  const res = await fetch(`/api/recipes?${params.toString()}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch recipes');
  }
  return res.json();
}

export function useRecipes(filters = {}, initialData = undefined) {
  return useQuery({
    queryKey: ['recipes', filters],
    queryFn: () => fetchRecipesApi(filters),
    initialData,
  });
}

export async function fetchRecipeByIdApi(id) {
  const res = await fetch(`/api/recipes/${id}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch recipe detail');
  }
  return res.json();
}

export function useRecipeDetail(id, initialData = undefined) {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeByIdApi(id),
    enabled: Boolean(id),
    initialData,
  });
}
