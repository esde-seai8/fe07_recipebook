import { query } from '@/lib/db';

/**
 * Fetch recipes with optional keyword search and cuisine filtering
 */
export async function getRecipes({ search = '', cuisine = '', difficulty = '', limit = 50, offset = 0 } = {}) {
  let sql = 'SELECT * FROM recipes WHERE 1=1';
  const params = [];

  if (search && search.trim()) {
    params.push(`%${search.trim()}%`);
    sql += ` AND (title ILIKE $${params.length} OR description ILIKE $${params.length})`;
  }

  if (cuisine && cuisine.trim() && cuisine !== 'All') {
    params.push(cuisine.trim());
    sql += ` AND cuisine = $${params.length}`;
  }

  if (difficulty && difficulty.trim() && difficulty !== 'All') {
    params.push(difficulty.trim());
    sql += ` AND difficulty = $${params.length}`;
  }

  sql += ' ORDER BY created_at DESC';

  if (limit) {
    params.push(limit);
    sql += ` LIMIT $${params.length}`;
  }

  if (offset) {
    params.push(offset);
    sql += ` OFFSET $${params.length}`;
  }

  const { rows } = await query(sql, params);
  return rows;
}

/**
 * Fetch a single recipe by its primary key ID
 */
export async function getRecipeById(id) {
  const { rows } = await query('SELECT * FROM recipes WHERE id = $1', [id]);
  return rows[0] || null;
}

/**
 * Create a new recipe
 */
export async function createRecipe(recipeData) {
  const {
    title,
    description,
    ingredients,
    instructions,
    prep_time_minutes = 15,
    cook_time_minutes = 30,
    servings = 4,
    image_url = '',
    cuisine = 'General',
    difficulty = 'Medium',
  } = recipeData;

  const sql = `
    INSERT INTO recipes (
      title, description, ingredients, instructions,
      prep_time_minutes, cook_time_minutes, servings,
      image_url, cuisine, difficulty
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
  `;

  const params = [
    title,
    description,
    JSON.stringify(ingredients || []),
    JSON.stringify(instructions || []),
    prep_time_minutes,
    cook_time_minutes,
    servings,
    image_url,
    cuisine,
    difficulty,
  ];

  const { rows } = await query(sql, params);
  return rows[0];
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
      r.description,
      r.ingredients,
      r.instructions,
      r.prep_time_minutes,
      r.cook_time_minutes,
      r.servings,
      r.image_url,
      r.cuisine,
      r.difficulty
    FROM cookbook_items c
    JOIN recipes r ON c.recipe_id = r.id
    WHERE c.user_id = $1
    ORDER BY c.created_at DESC;
  `;

  const { rows } = await query(sql, [userId]);
  return rows;
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
