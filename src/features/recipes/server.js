import { query } from '@/lib/db';

/**
 * Normalizes a database row to guarantee compatibility across UI components
 */
function normalizeRecipe(row) {
  if (!row) return null;

  const duration = row.duration || (row.prep_time_minutes || 0) + (row.cook_time_minutes || 0) || 30;
  const image = row.image || row.image_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80';
  const category = row.category || row.cuisine || 'General';

  // ingredients is native TEXT[] in postgres, pg automatically parses it to string[]
  let ingredients = row.ingredients;
  if (typeof ingredients === 'string') {
    try {
      ingredients = JSON.parse(ingredients);
    } catch {
      ingredients = [ingredients];
    }
  }

  return {
    ...row,
    category,
    cuisine: category, // synonym for UI
    duration,
    prep_time_minutes: row.prep_time_minutes || Math.max(5, Math.round(duration * 0.35)),
    cook_time_minutes: row.cook_time_minutes || Math.max(10, Math.round(duration * 0.65)),
    image,
    image_url: image, // synonym for UI
    ingredients: Array.isArray(ingredients) ? ingredients : [],
    difficulty: row.difficulty || (duration > 45 ? 'Hard' : duration > 25 ? 'Medium' : 'Easy'),
  };
}

/**
 * Fetch recipes with optional keyword search and category filtering
 */
export async function getRecipes({ search = '', category = '', cuisine = '', limit = 50, offset = 0 } = {}) {
  let sql = 'SELECT * FROM recipes WHERE 1=1';
  const params = [];

  const filterCategory = category || cuisine;

  if (search && search.trim()) {
    params.push(`%${search.trim()}%`);
    sql += ` AND (title ILIKE $${params.length} OR description ILIKE $${params.length} OR category ILIKE $${params.length})`;
  }

  if (filterCategory && filterCategory.trim() && filterCategory !== 'All') {
    params.push(filterCategory.trim());
    sql += ` AND category = $${params.length}`;
  }

  sql += ' ORDER BY id ASC';

  if (limit) {
    params.push(limit);
    sql += ` LIMIT $${params.length}`;
  }

  if (offset) {
    params.push(offset);
    sql += ` OFFSET $${params.length}`;
  }

  const { rows } = await query(sql, params);
  return rows.map(normalizeRecipe);
}

/**
 * Fetch a single recipe by its primary key ID
 */
export async function getRecipeById(id) {
  const { rows } = await query('SELECT * FROM recipes WHERE id = $1', [id]);
  return rows[0] ? normalizeRecipe(rows[0]) : null;
}

/**
 * Create a new recipe adhering to .start.sql schema
 */
export async function createRecipe(recipeData) {
  const {
    title,
    category = 'Other',
    cuisine,
    duration = 30,
    prep_time_minutes,
    cook_time_minutes,
    servings = 4,
    ingredients = [],
    description,
    image = '',
    image_url = '',
  } = recipeData;

  const finalCategory = category || cuisine || 'General';
  const finalDuration = duration || (prep_time_minutes || 0) + (cook_time_minutes || 0) || 30;
  const finalImage = image || image_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80';

  // Format ingredients as an array of string items
  const ingredientsArray = Array.isArray(ingredients)
    ? ingredients.map((item) => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object') {
          return `${item.amount ? item.amount + ' ' : ''}${item.name || ''}`.trim();
        }
        return String(item);
      }).filter(Boolean)
    : [];

  const sql = `
    INSERT INTO recipes (
      title, category, duration, servings, ingredients, description, image
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const params = [
    title,
    finalCategory,
    finalDuration,
    servings,
    ingredientsArray,
    description,
    finalImage,
  ];

  const { rows } = await query(sql, params);
  return normalizeRecipe(rows[0]);
}

/**
 * Fetch all cookbook items for a specific user, joined with recipe details
 */
export async function getUserCookbook(userId = 1) {
  const sql = `
    SELECT 
      c.id AS cookbook_id,
      c.user_id,
      c.recipe_id,
      c.personal_notes,
      c.rating,
      c.created_at AS saved_at,
      r.title,
      r.category,
      r.duration,
      r.servings,
      r.ingredients,
      r.description,
      r.image
    FROM cookbook_items c
    JOIN recipes r ON c.recipe_id = r.id
    WHERE c.user_id = $1
    ORDER BY c.created_at DESC;
  `;

  const { rows } = await query(sql, [userId]);
  return rows.map((row) => ({
    ...row,
    ...normalizeRecipe(row),
    cookbook_id: row.cookbook_id,
    user_id: row.user_id,
    recipe_id: row.recipe_id,
    personal_notes: row.personal_notes,
    rating: row.rating,
    saved_at: row.saved_at,
  }));
}

/**
 * Add a recipe to user's cookbook
 */
export async function addRecipeToCookbook(userId = 1, recipeId, personalNotes = '', rating = 5) {
  const sql = `
    INSERT INTO cookbook_items (user_id, recipe_id, personal_notes, rating)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (user_id, recipe_id) 
    DO UPDATE SET 
      personal_notes = EXCLUDED.personal_notes,
      rating = EXCLUDED.rating,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *;
  `;

  const { rows } = await query(sql, [userId, recipeId, personalNotes, rating]);
  return rows[0];
}

/**
 * Update personal notes and rating for a cookbook item
 */
export async function updateCookbookItem(cookbookId, personalNotes, rating) {
  const sql = `
    UPDATE cookbook_items
    SET 
      personal_notes = COALESCE($1, personal_notes),
      rating = COALESCE($2, rating),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING *;
  `;

  const { rows } = await query(sql, [personalNotes, rating, cookbookId]);
  return rows[0];
}

/**
 * Remove a recipe from the cookbook
 */
export async function removeCookbookItem(cookbookId) {
  const sql = 'DELETE FROM cookbook_items WHERE id = $1 RETURNING *;';
  const { rows } = await query(sql, [cookbookId]);
  return rows[0];
}
