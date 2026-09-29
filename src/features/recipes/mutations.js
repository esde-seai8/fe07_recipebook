'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createRecipeAction,
  addToCookbookAction,
  updateCookbookNotesAction,
  removeFromCookbookAction,
} from './actions';

export function useCreateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeData) => createRecipeAction(recipeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
}

export function useAddToCookbook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ recipeId, notes, rating }) => addToCookbookAction(recipeId, notes, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cookbook'] });
    },
  });
}

export function useUpdateCookbookNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cookbookId, notes, rating }) => updateCookbookNotesAction(cookbookId, notes, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cookbook'] });
    },
  });
}

export function useRemoveFromCookbook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cookbookId) => removeFromCookbookAction(cookbookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cookbook'] });
    },
  });
}
