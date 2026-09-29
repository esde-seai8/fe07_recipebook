import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.PG_URI || process.env.DATABASE_URL;

// Global singleton to prevent pool recreation during Next.js Hot Module Replacement (HMR)
let pool;

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });
} else {
  if (!global.__pgPool) {
    global.__pgPool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  pool = global.__pgPool;
}

export default pool;

/**
 * Execute parameterized SQL query against Neon PostgreSQL
 * @param {string} text - SQL query string with $1, $2 parameter placeholders
 * @param {Array} params - Query parameters
 * @returns {Promise<pg.QueryResult>}
 */
export async function query(text, params = []) {
  if (!connectionString) {
    console.warn('Database query skipped: PG_URI / DATABASE_URL environment variable is not defined.');
    return { rows: [] };
  }

  const start = Date.now();
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'production') {
      console.log('Executed query', { text: text.slice(0, 80), duration, rows: res.rowCount });
    }
    return res;
  } catch (error) {
    console.error('Database query error:', { text, error: error.message });
    throw error;
  } finally {
    client.release();
  }
}
