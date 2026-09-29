import fs from 'fs';
import path from 'path';
import pg from 'pg';

const { Client } = pg;
const connectionString = process.env.PG_URI || process.env.DATABASE_URL;

async function seed() {
  if (!connectionString) {
    console.error('❌ Error: PG_URI or DATABASE_URL environment variable is missing.');
    console.error('Please configure your Neon connection string in .env.local or pass PG_URI.');
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

    const sqlPath = path.resolve(process.cwd(), '.start.sql');
    if (!fs.existsSync(sqlPath)) {
      throw new Error(`Cannot find .start.sql at ${sqlPath}`);
    }

    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    console.log('Executing .start.sql schema & seed script...');
    await client.query(sqlContent);
    console.log('🎉 Database initialized and seeded successfully!');

    const countRes = await client.query('SELECT COUNT(*) as count FROM recipes;');
    console.log(`📊 Total recipes now in database: ${countRes.rows[0].count}`);
  } catch (error) {
    console.error('❌ Database seed error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
