import fs from 'fs';
import path from 'path';
import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Client } = pg;
const connectionString = process.env.PG_URI || process.env.DATABASE_URL;

async function seed() {
  if (!connectionString) {
    console.error('❌ Error: PG_URI or DATABASE_URL environment variable is missing.');
    console.error('Please configure your Neon connection string in .env.local.');
    process.exit(1);
  }

  console.log('Connecting to Neon PostgreSQL...');
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('✅ Connected successfully to Neon database.');

    // 1. Read and execute .start.sql (official 43 recipes schema and seed)
    const sqlPath = path.resolve(process.cwd(), '.start.sql');
    if (!fs.existsSync(sqlPath)) {
      throw new Error(`Cannot find .start.sql at ${sqlPath}`);
    }

    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    console.log('Executing .start.sql (creating recipes table and inserting 43 curated recipes)...');
    await client.query(sqlContent);
    console.log('✅ .start.sql executed successfully.');

    // 2. Ensure users table exists for authentication
    console.log('Ensuring users and cookbook_items tables exist...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 3. Ensure cookbook_items table exists for personal cookbook CRUD
    await client.query(`
      CREATE TABLE IF NOT EXISTS cookbook_items (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE,
        personal_notes TEXT DEFAULT '',
        rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT unique_user_recipe UNIQUE (user_id, recipe_id)
      );
    `);

    // Create helpful performance indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_recipes_title ON recipes(title);
      CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category);
      CREATE INDEX IF NOT EXISTS idx_cookbook_user_id ON cookbook_items(user_id);
    `);

    // 4. Seed demo user if missing
    const demoPasswordHash = await bcrypt.hash('password123', 10);
    await client.query(`
      INSERT INTO users (id, email, password_hash, name)
      VALUES (1, 'chef@recipebook.com', $1, 'Head Chef')
      ON CONFLICT (email) DO NOTHING;
    `, [demoPasswordHash]);

    // Reset sequence for users
    await client.query(`
      SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE(MAX(id), 1)) FROM users;
    `);

    // 5. Add a sample cookbook bookmark for demo user
    await client.query(`
      INSERT INTO cookbook_items (user_id, recipe_id, personal_notes, rating)
      VALUES (1, 1, 'Pro tip: Use fresh room temperature egg yolks and coarse black pepper!', 5)
      ON CONFLICT (user_id, recipe_id) DO NOTHING;
    `);

    console.log('🎉 Database initialized and seeded successfully!');

    // 6. Report total statistics
    const recipeCount = await client.query('SELECT COUNT(*) as count FROM recipes;');
    const userCount = await client.query('SELECT COUNT(*) as count FROM users;');
    const cookbookCount = await client.query('SELECT COUNT(*) as count FROM cookbook_items;');

    console.log('────────────────────────────────────────');
    console.log(`📊 Total Recipes in Neon:    ${recipeCount.rows[0].count}`);
    console.log(`👤 Total Users in Neon:      ${userCount.rows[0].count}`);
    console.log(`📖 Total Cookbook Bookmarks: ${cookbookCount.rows[0].count}`);
    console.log('────────────────────────────────────────');
  } catch (error) {
    console.error('❌ Database seed error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
