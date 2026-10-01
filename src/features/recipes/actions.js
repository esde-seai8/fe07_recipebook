'use server';

import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/features/auth/server';
import {
  createRecipe,
  addRecipeToCookbook,
  updateCookbookItem,
  removeCookbookItem,
} from './server';

export async function createRecipeAction(formData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Authentication required. Please sign in to create a recipe.' };
    }
    const newRecipe = await createRecipe(formData);
    revalidatePath('/search');
    revalidatePath('/');
    return { success: true, recipe: newRecipe };
  } catch (error) {
    console.error('Failed to create recipe action:', error);
    return { success: false, error: error.message };
  }
}

export async function addToCookbookAction(recipeId, personalNotes = '', rating = 5) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Please sign in to save to your cookbook or add notes.' };
    }
    const item = await addRecipeToCookbook(user.userId, recipeId, personalNotes, rating);
    revalidatePath('/dashboard');
    return { success: true, item };
  } catch (error) {
    console.error('Failed to add to cookbook action:', error);
    return { success: false, error: error.message };
  }
}

export async function updateCookbookNotesAction(cookbookId, personalNotes, rating) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Authentication required.' };
    }
    const item = await updateCookbookItem(cookbookId, personalNotes, rating);
    revalidatePath('/dashboard');
    return { success: true, item };
  } catch (error) {
    console.error('Failed to update cookbook action:', error);
    return { success: false, error: error.message };
  }
}

export async function removeFromCookbookAction(cookbookId) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Authentication required.' };
    }
    const deleted = await removeCookbookItem(cookbookId);
    revalidatePath('/dashboard');
    return { success: true, item: deleted };
  } catch (error) {
    console.error('Failed to remove from cookbook action:', error);
    return { success: false, error: error.message };
  }
}
