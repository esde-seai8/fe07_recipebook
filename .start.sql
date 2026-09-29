-- ========================================================
-- RECIPE BOOK - DATABASE SCHEMA & SEED DATA
-- Target Database: Neon Serverless PostgreSQL
-- ========================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. RECIPES TABLE
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    ingredients JSONB NOT NULL,
    instructions JSONB NOT NULL,
    prep_time_minutes INT DEFAULT 15,
    cook_time_minutes INT DEFAULT 30,
    servings INT DEFAULT 4,
    image_url TEXT,
    cuisine VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50) DEFAULT 'Medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for title search and cuisine filtering
CREATE INDEX IF NOT EXISTS idx_recipes_title ON recipes(title);
CREATE INDEX IF NOT EXISTS idx_recipes_cuisine ON recipes(cuisine);

-- 3. COOKBOOK ITEMS TABLE (Saved recipes with personal notes)
CREATE TABLE IF NOT EXISTS cookbook_items (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE,
    personal_notes TEXT DEFAULT '',
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_recipe UNIQUE (user_id, recipe_id)
);

CREATE INDEX IF NOT EXISTS idx_cookbook_user_id ON cookbook_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cookbook_recipe_id ON cookbook_items(recipe_id);

-- ========================================================
-- SEED DATA: INITIAL DEMO USER
-- Password hash for 'password123'
-- ========================================================
INSERT INTO users (id, email, password_hash, name)
VALUES (
    1,
    'chef@recipebook.com',
    '$2a$10$wO3rG50dYpG/V4m68J.B1.8b8qN96gq0z6OqX0/YwJt2V0P7fK7i.',
    'Head Chef'
) ON CONFLICT (email) DO NOTHING;

-- Reset sequence for users
SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE(MAX(id), 1)) FROM users;

-- ========================================================
-- SEED DATA: CURATED RECIPES
-- ========================================================
INSERT INTO recipes (id, title, description, ingredients, instructions, prep_time_minutes, cook_time_minutes, servings, image_url, cuisine, difficulty)
VALUES
(
    1,
    'Classic Neapolitan Margherita Pizza',
    'Crisp chewy crust topped with sweet San Marzano tomato sauce, fresh buffalo mozzarella, fragrant basil leaves, and extra virgin olive oil.',
    '[
        {"name": "Pizza dough", "amount": "500g"},
        {"name": "San Marzano canned tomatoes", "amount": "400g crushed"},
        {"name": "Fresh buffalo mozzarella", "amount": "200g sliced"},
        {"name": "Fresh basil leaves", "amount": "10-12 leaves"},
        {"name": "Extra virgin olive oil", "amount": "2 tbsp"},
        {"name": "Sea salt", "amount": "1 tsp"}
    ]'::jsonb,
    '[
        "Preheat your oven to its highest setting (preferably 250°C / 485°F) with a pizza stone inside.",
        "Stretch the dough gently by hand into a 12-inch circle on a floured surface.",
        "Spoon crushed San Marzano tomatoes evenly over the base, leaving a 1-inch border for the crust.",
        "Distribute mozzarella slices evenly and drizzle with extra virgin olive oil.",
        "Slide onto the hot pizza stone and bake for 7-9 minutes until crust is blistered and cheese is bubbly.",
        "Garnish immediately with fresh basil leaves and a final pinch of sea salt before serving."
    ]'::jsonb,
    20,
    10,
    2,
    'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=1000&auto=format&fit=crop',
    'Italian',
    'Medium'
),
(
    2,
    'Creamy Tuscan Garlic Chicken',
    'Tender golden chicken breasts simmered in a luscious garlic, sun-dried tomato, and baby spinach cream sauce.',
    '[
        {"name": "Boneless skinless chicken breasts", "amount": "2 large halved"},
        {"name": "Heavy cream", "amount": "1 cup"},
        {"name": "Chicken broth", "amount": "1/2 cup"},
        {"name": "Garlic cloves", "amount": "6 minced"},
        {"name": "Sun-dried tomatoes in oil", "amount": "1/2 cup drained and chopped"},
        {"name": "Fresh baby spinach", "amount": "2 cups packed"},
        {"name": "Grated parmesan cheese", "amount": "1/2 cup"},
        {"name": "Olive oil and butter", "amount": "1 tbsp each"}
    ]'::jsonb,
    '[
        "Season chicken breasts generously with salt, pepper, and Italian herb seasoning.",
        "Heat olive oil and butter in a large skillet over medium-high heat. Sear chicken 5 minutes per side until golden; transfer to a plate.",
        "In the same skillet, sauté minced garlic for 1 minute until fragrant.",
        "Add chicken broth, heavy cream, and sun-dried tomatoes. Bring to a gentle simmer for 3 minutes.",
        "Stir in grated parmesan until smoothly melted, then fold in baby spinach until wilted.",
        "Return chicken breasts along with resting juices back into the skillet. Simmer for 3 minutes until chicken is cooked through.",
        "Serve warm over pasta, steamed rice, or with crusty sourdough bread."
    ]'::jsonb,
    15,
    20,
    4,
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1000&auto=format&fit=crop',
    'Italian',
    'Easy'
),
(
    3,
    'Authentic Mexican Beef Birria Tacos',
    'Slow-braised beef chuck roast infused with guajillo chilies, warm spices, and rich broth, fried in corn tortillas with melted Oaxaca cheese.',
    '[
        {"name": "Beef chuck roast", "amount": "1 kg cubed"},
        {"name": "Dried Guajillo chiles", "amount": "4 stemmed and seeded"},
        {"name": "Dried Ancho chiles", "amount": "2 stemmed and seeded"},
        {"name": "White onion", "amount": "1 large quartered"},
        {"name": "Garlic", "amount": "5 cloves"},
        {"name": "Corn tortillas", "amount": "12 tortillas"},
        {"name": "Oaxaca or Monterey Jack cheese", "amount": "250g shredded"},
        {"name": "Fresh cilantro and diced onion", "amount": "for garnish"},
        {"name": "Lime wedges", "amount": "2 limes"}
    ]'::jsonb,
    '[
        "Toast dried chiles in a dry pan for 2 minutes, then soak in boiling water for 15 minutes to soften.",
        "Blend softened chiles with onion, garlic, tomatoes, cumin, oregano, apple cider vinegar, and broth until silky smooth.",
        "Sear beef cubes in a Dutch oven until browned on all sides.",
        "Pour chile marinade over the beef, cover tightly, and braise on low for 3 hours until fork-tender and shreddable.",
        "Shred the beef and reserve the deep red consume broth in bowls.",
        "Dip tortillas in the fat atop the broth, place on a hot griddle, top with cheese and shredded beef, and fold in half.",
        "Crisp until golden and cheese is melted. Serve hot with consume for dipping, chopped cilantro, and fresh lime."
    ]'::jsonb,
    30,
    180,
    6,
    'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=1000&auto=format&fit=crop',
    'Mexican',
    'Hard'
),
(
    4,
    'Japanese Tonkotsu Style Ramen',
    'Rich and savory noodle soup with tender pork chashu, soft-boiled ajitsuke tamago egg, nori, scallions, and springy ramen noodles.',
    '[
        {"name": "Fresh ramen noodles", "amount": "4 portions"},
        {"name": "Rich pork/chicken bone broth", "amount": "6 cups"},
        {"name": "Soy sauce and mirin tare", "amount": "4 tbsp"},
        {"name": "Chashu pork belly slices", "amount": "8 slices"},
        {"name": "Ramen eggs (soft-boiled seasoned)", "amount": "4 halved"},
        {"name": "Scallions", "amount": "1 bunch thinly sliced"},
        {"name": "Nori seaweed sheets", "amount": "4 small squares"},
        {"name": "Toasted sesame oil", "amount": "1 tbsp"}
    ]'::jsonb,
    '[
        "In a deep pot, bring bone broth to a rolling simmer. Whisk in tare sauce and sesame oil to adjust seasoning.",
        "In a separate pot of boiling water, cook fresh ramen noodles for 90 seconds until al dente. Drain thoroughly.",
        "Divide tare and piping-hot broth into 4 deep ramen bowls.",
        "Gently fold cooked noodles into the broth with chopsticks.",
        "Top each bowl with two slices of tender chashu, half an egg, sliced scallions, and a sheet of nori.",
        "Serve immediately while steaming hot."
    ]'::jsonb,
    25,
    35,
    4,
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1000&auto=format&fit=crop',
    'Asian',
    'Medium'
),
(
    5,
    'Aromatic Thai Green Curry with Tofu & Bamboo',
    'A vibrant, fragrant coconut curry with lemongrass, galangal, Thai basil, crisp vegetables, and tender tofu cubes.',
    '[
        {"name": "Firm tofu", "amount": "400g pressed and cubed"},
        {"name": "Coconut milk", "amount": "2 cans (800ml)"},
        {"name": "Thai green curry paste", "amount": "3 tbsp"},
        {"name": "Bamboo shoots", "amount": "1 cup sliced"},
        {"name": "Zucchini", "amount": "1 sliced"},
        {"name": "Red bell pepper", "amount": "1 julienned"},
        {"name": "Kaffir lime leaves", "amount": "4 torn"},
        {"name": "Fresh Thai sweet basil", "amount": "1 cup"},
        {"name": "Soy sauce / tamari", "amount": "2 tbsp"}
    ]'::jsonb,
    '[
        "Heat 3 tablespoons of thick coconut cream from the top of the can in a wok over medium heat until oil separates.",
        "Add green curry paste and fry for 2 minutes until fragrant and vibrant green.",
        "Pour in remaining coconut milk, kaffir lime leaves, and bamboo shoots; bring to a simmer.",
        "Add cubed tofu, zucchini, and red bell pepper. Cook for 8 minutes until vegetables are tender-crisp.",
        "Stir in soy sauce and brown sugar to balance sweet, salty, and spicy notes.",
        "Remove from heat, fold in fresh Thai basil leaves, and serve with jasmine rice."
    ]'::jsonb,
    15,
    20,
    4,
    'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=1000&auto=format&fit=crop',
    'Asian',
    'Easy'
),
(
    6,
    'Pan-Seared Mediterranean Salmon with Lemon Dill',
    'Crispy-skinned Atlantic salmon fillet served with a zesty garlic-lemon butter sauce, capers, and fresh dill.',
    '[
        {"name": "Salmon fillets", "amount": "4 (6 oz each) skin-on"},
        {"name": "Olive oil", "amount": "2 tbsp"},
        {"name": "Butter", "amount": "2 tbsp"},
        {"name": "Fresh lemon juice & zest", "amount": "from 1 lemon"},
        {"name": "Garlic", "amount": "3 cloves minced"},
        {"name": "Capers", "amount": "2 tbsp drained"},
        {"name": "Fresh dill", "amount": "3 tbsp finely chopped"}
    ]'::jsonb,
    '[
        "Pat salmon fillets dry with paper towels and season skin and flesh generously with salt and pepper.",
        "Heat olive oil in a stainless steel skillet over medium-high heat until shimmering.",
        "Place salmon skin-side down, press gently for 10 seconds, and sear undisturbed for 5 minutes until crispy.",
        "Carefully flip and cook flesh-side for 2-3 minutes.",
        "Lower heat, add butter, minced garlic, lemon juice, lemon zest, and capers. Spoon pan sauce over salmon.",
        "Garnish with freshly chopped dill and lemon slices before serving."
    ]'::jsonb,
    10,
    12,
    4,
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000&auto=format&fit=crop',
    'Mediterranean',
    'Easy'
),
(
    7,
    'Traditional Provençal Ratatouille',
    'A stunning French casserole of layered zucchini, yellow squash, eggplant, and ripe tomatoes baked over a seasoned bell pepper pipérade.',
    '[
        {"name": "Eggplant", "amount": "2 medium thinly sliced into rounds"},
        {"name": "Zucchini", "amount": "2 medium thinly sliced"},
        {"name": "Yellow squash", "amount": "2 medium thinly sliced"},
        {"name": "Roma tomatoes", "amount": "4 thinly sliced"},
        {"name": "Crushed tomatoes", "amount": "1 cup"},
        {"name": "Bell peppers", "amount": "2 roasted and finely diced"},
        {"name": "Garlic & thyme", "amount": "4 cloves garlic, 1 tbsp fresh thyme"},
        {"name": "Olive oil", "amount": "3 tbsp"}
    ]'::jsonb,
    '[
        "Preheat oven to 190°C (375°F).",
        "Spread crushed tomatoes, roasted peppers, minced garlic, and thyme evenly across the bottom of a round baking dish.",
        "Arrange vegetable slices in alternating concentric patterns around the dish until tightly packed.",
        "Drizzle olive oil over the vegetables, season with salt, pepper, and fresh thyme sprigs.",
        "Cover dish with parchment paper and bake for 40 minutes.",
        "Uncover and bake for another 15 minutes until vegetables are tender and edges lightly caramelized."
    ]'::jsonb,
    30,
    55,
    6,
    'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?q=80&w=1000&auto=format&fit=crop',
    'French',
    'Medium'
),
(
    8,
    'Classic Indian Butter Chicken (Murgh Makhani)',
    'Tender yogurt-marinated chicken bites cooked in a velvety spiced tomato, cream, and butter curry gravy.',
    '[
        {"name": "Chicken thighs", "amount": "700g boneless cubed"},
        {"name": "Plain Greek yogurt", "amount": "1/2 cup"},
        {"name": "Garam masala & cumin", "amount": "1 tbsp each"},
        {"name": "Kashmiri chili powder", "amount": "1 tbsp"},
        {"name": "Crushed canned tomatoes", "amount": "400g"},
        {"name": "Heavy cream", "amount": "1/2 cup"},
        {"name": "Butter", "amount": "3 tbsp"},
        {"name": "Kasuri methi (fenugreek leaves)", "amount": "1 tbsp crushed"}
    ]'::jsonb,
    '[
        "Marinate chicken cubes with yogurt, garlic, ginger, lemon juice, and spices for at least 30 minutes.",
        "Sear marinated chicken in a hot skillet with 1 tbsp butter until lightly charred; set aside.",
        "In the same skillet, melt remaining butter and cook onions, ginger, and garlic until golden.",
        "Add canned tomatoes and spices; simmer for 15 minutes, then blend smooth with an immersion blender.",
        "Stir in heavy cream and kasuri methi.",
        "Add cooked chicken back into the gravy, simmer for 8 minutes, and serve with garlic naan."
    ]'::jsonb,
    35,
    30,
    4,
    'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=1000&auto=format&fit=crop',
    'Indian',
    'Medium'
) ON CONFLICT (id) DO UPDATE 
SET title = EXCLUDED.title,
    description = EXCLUDED.description,
    ingredients = EXCLUDED.ingredients,
    instructions = EXCLUDED.instructions,
    prep_time_minutes = EXCLUDED.prep_time_minutes,
    cook_time_minutes = EXCLUDED.cook_time_minutes,
    servings = EXCLUDED.servings,
    image_url = EXCLUDED.image_url,
    cuisine = EXCLUDED.cuisine,
    difficulty = EXCLUDED.difficulty;

-- Reset sequence for recipes
SELECT setval(pg_get_serial_sequence('recipes', 'id'), COALESCE(MAX(id), 1)) FROM recipes;

-- ========================================================
-- SEED DATA: SAMPLE COOKBOOK ENTRY FOR DEMO USER
-- ========================================================
INSERT INTO cookbook_items (user_id, recipe_id, personal_notes, rating)
VALUES (
    1,
    1,
    'Secret tip: cold ferment dough for 48 hours for even better blistering!',
    5
) ON CONFLICT (user_id, recipe_id) DO NOTHING;
