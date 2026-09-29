import { NextResponse } from 'next/server';
import { getRecipes, createRecipe } from '@/features/recipes/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || searchParams.get('cuisine') || '';
    const difficulty = searchParams.get('difficulty') || '';
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const recipes = await getRecipes({ search, category, difficulty, limit, offset });
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('API /api/recipes error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: 'Title and description are required fields.' },
        { status: 400 }
      );
    }

    const created = await createRecipe(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('API POST /api/recipes error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create recipe' },
      { status: 500 }
    );
  }
}
