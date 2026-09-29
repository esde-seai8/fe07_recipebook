'use server';

import { revalidatePath } from 'next/cache';
import {
  createRecipe,
  addRecipeToCookbook,
  updateCookbookItem,
  removeCookbookItem,
} from './server';

export async function createRecipeAction(formData) {
  try {
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
    const item = await addRecipeToCookbook(1, recipeId, personalNotes, rating);
    revalidatePath('/dashboard');
    return { success: true, item };
  } catch (error) {
    console.error('Failed to add to cookbook action:', error);
    return { success: false, error: error.message };
  }
}

export async function updateCookbookNotesAction(cookbookId, personalNotes, rating) {
  try {
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
    const deleted = await removeCookbookItem(cookbookId);
    revalidatePath('/dashboard');
    return { success: true, item: deleted };
  } catch (error) {
    console.error('Failed to remove from cookbook action:', error);
    return { success: false, error: error.message };
  }
}
