import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const AUTH_SECRET = process.env.AUTH_SECRET || 'fallback-secret-for-development-change-in-prod';

export async function authenticateUser(email, password) {
  const { rows } = await query('SELECT * FROM users WHERE email = $1', [email]);
  const user = rows[0];

  if (!user) {
    throw new Error('User not found with this email');
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, name: user.name },
    AUTH_SECRET,
    { expiresIn: '7d' }
  );

  return {
    user: { id: user.id, email: user.email, name: user.name },
    token,
  };
}

export async function registerUser(name, email, password) {
  const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    throw new Error('User already exists with this email');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const { rows } = await query(
    'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
    [name, email, passwordHash]
  );

  const user = rows[0];
  const token = jwt.sign(
    { userId: user.id, email: user.email, name: user.name },
    AUTH_SECRET,
    { expiresIn: '7d' }
  );

  return { user, token };
}
