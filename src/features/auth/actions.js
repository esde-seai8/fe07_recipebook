'use server';

import { cookies } from 'next/headers';
import { authenticateUser, registerUser } from './server';

export async function loginAction(formData) {
  try {
    const email = formData.get ? formData.get('email') : formData.email;
    const password = formData.get ? formData.get('password') : formData.password;

    const { user, token } = await authenticateUser(email, password);

    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function registerAction(formData) {
  try {
    const name = formData.get ? formData.get('name') : formData.name;
    const email = formData.get ? formData.get('email') : formData.email;
    const password = formData.get ? formData.get('password') : formData.password;

    const { user, token } = await registerUser(name, email, password);

    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
  return { success: true };
}
