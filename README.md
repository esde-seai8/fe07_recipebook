# Recipe Book (fe07_recipebook)

A modern, full-featured **Recipe Creator, Search, and Personal Cookbook** web application built with **Next.js**, **TypeScript**, **TailwindCSS**, **Neon Serverless PostgreSQL**, and **TanStack React Query**.

---

## Features & Functional Requirements

- **FR001 / FR002: GitHub & PR Workflow**: Hosted in public GitHub repository ([`esde-seai8/fe07_recipebook`](https://github.com/esde-seai8/fe07_recipebook)) following Conventional Commits and feature branches.
- **FR003: Framework Scaffolding**: Built on Next.js with TypeScript template (`"allowJs": true`).
- **FR004: Routing Configuration**: Declarative client routes (`/`, `/search`, `/recipes/[id]`, `/dashboard`, `/(auth)/login`, `/(auth)/register`), Next.js Server Actions, and REST Route Handlers.
- **FR005: TailwindCSS Styling**: Polished, responsive culinary design system with warm amber/stone accents, card grids, badges, and mobile-friendly layouts.
- **FR006: Neon Integration**: Server-side singleton connection pooling to Neon Serverless PostgreSQL (`pg.Pool` with TLS) connected to the built-in PgBouncer pooler endpoint (`-pooler.neon.tech`).
- **FR007: Data Generation & Seeding**: Automated seeding script (`npm run db:seed`) executing `.start.sql` with **43 curated international recipes**, plus `users` and `cookbook_items` tables.
- **FR008: Search Functionality**: Real-time recipe search by title and description, filterable by cuisine/category (`Italian`, `Indian`, `Mediterranean`, `Breakfast`, `Japanese`, `Dessert`, etc.).
- **FR009: Recipe Detail Page**: Dedicated detail view, ingredients checklist, descriptions or instructions, and Next.js async promise params typing: `params: Promise<{ id: string }>`.
- **FR010: Cookbook CRUD**: Add recipes to cookbook, list saved items, edit personal culinary notes and star ratings, and remove items with persistent PostgreSQL storage.
- **FR011: Loading & Error Handling**: Instant feedback with skeleton cards (`Loading.jsx`), Suspense loading (`loading.jsx`), and resilient error boundaries (`error.jsx`).
- **FR012: Code Organization**: Strictly modular architecture following the `fe07_recipebook.txt` component tree.
- **FR013: Documentation**: Complete setup, architecture, schema, and Neon guide.
- **FR014: Next.js Deployment**: Ready for Vercel deployment with edge-compatible pooling and streaming.

---

## Project Structure

```
fe07_recipebook
 ┣ src
 ┃ ┣ app
 ┃ ┃ ┣ (auth)
 ┃ ┃ ┃ ┣ login/page.jsx             # User sign-in page (FormSignIn)
 ┃ ┃ ┃ ┗ register/page.jsx          # User registration page (FormSignUp)
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┣ auth/[...all]/route.js     # Auth endpoints (session, login, register, logout)
 ┃ ┃ ┃ ┗ recipes
 ┃ ┃ ┃ ┃ ┣ [id]/route.js            # Single recipe API (async params)
 ┃ ┃ ┃ ┃ ┗ route.js                 # Recipe listing & creation API
 ┃ ┃ ┣ dashboard
 ┃ ┃ ┃ ┣ loading.jsx                # Cookbook dashboard loading 
 ┃ ┃ ┃ ┗ page.jsx                   # User's personal cookbook with notes CRUD
 ┃ ┃ ┣ recipes
 ┃ ┃ ┃ ┗ [id]
 ┃ ┃ ┃ ┃ ┣ loading.tsx              # Detail view loading 
 ┃ ┃ ┃ ┃ ┗ page.tsx                 # Recipe detail page (TypeScript async params)
 ┃ ┃ ┣ search
 ┃ ┃ ┃ ┣ loading.jsx                # Search page loading 
 ┃ ┃ ┃ ┗ page.jsx                   # Search and category filtering page
 ┃ ┃ ┣ favicon.ico
 ┃ ┃ ┣ globals.css                  # TailwindCSS theme
 ┃ ┃ ┣ layout.tsx                   # Root layout with Provider & Navbar
 ┃ ┃ ┣ not-found.jsx                # Custom culinary 404 page
 ┃ ┃ ┣ page.tsx                     # Landing home page (Hero, Categories & Featured)
 ┃ ┃ ┣ provider.jsx                 # TanStack QueryClientProvider wrapper
 ┃ ┃ ┣ loading.jsx                  # Fallback streaming loader
 ┃ ┃ ┗ error.jsx                    # Root error boundary
 ┃ ┣ components
 ┃ ┃ ┣ index.js                     # Component barrel exports
 ┃ ┃ ┣ Loading.jsx                  # Skeletons and spinners
 ┃ ┃ ┗ Navbar.jsx                   # Live session-aware navigation bar
 ┃ ┣ features
 ┃ ┃ ┣ auth
 ┃ ┃ ┃ ┣ components
 ┃ ┃ ┃ ┃ ┣ FormSignIn.jsx           # Sign in form
 ┃ ┃ ┃ ┃ ┣ FormSignOut.jsx          # Sign out action button
 ┃ ┃ ┃ ┃ ┗ FormSignUp.jsx           # Registration form
 ┃ ┃ ┃ ┣ actions.js                 # Server Actions for authentication
 ┃ ┃ ┃ ┣ index.js
 ┃ ┃ ┃ ┗ server.js                  # User verification & password hashing (bcryptjs)
 ┃ ┃ ┗ recipes
 ┃ ┃ ┃ ┣ components
 ┃ ┃ ┃ ┃ ┣ AddRecipeForm.jsx        # Modal form to add custom recipes
 ┃ ┃ ┃ ┃ ┣ CookbookItemCard.jsx     # Cookbook item with inline notes and rating editor
 ┃ ┃ ┃ ┃ ┣ CookbookManager.jsx      # Cookbook dashboard manager with stats and filters
 ┃ ┃ ┃ ┃ ┣ DetailCookbookSave.jsx   # Recipe detail cookbook bookmarking widget
 ┃ ┃ ┃ ┃ ┣ InteractiveIngredients.tsx # Checkable ingredients checklist
 ┃ ┃ ┃ ┃ ┣ RecipeCard.jsx           # Recipe presentation card
 ┃ ┃ ┃ ┃ ┗ RecipesList.jsx          # Responsive recipe grid
 ┃ ┃ ┃ ┣ actions.js                 # Next.js Server Actions (CRUD)
 ┃ ┃ ┃ ┣ index.js
 ┃ ┃ ┃ ┣ mutations.js               # TanStack Query mutations
 ┃ ┃ ┃ ┣ queries.js                 # TanStack Query hooks
 ┃ ┃ ┃ ┗ server.js                  # Parameterized Neon SQL queries
 ┃ ┗ lib
 ┃ ┃ ┣ utils
 ┃ ┃ ┃ ┗ makeQueryClient.js         # SSR-safe QueryClient factory
 ┃ ┃ ┗ db.js                        # Neon PostgreSQL connection pool singleton
 ┣ scripts
 ┃ ┗ seed.mjs                       # Database schema and seed execution script
 ┣ .env.example                     # Environment template
 ┣ .env.local                       # Local environment secrets (gitignored)
 ┣ .gitignore                       # Git exclusion rules
 ┣ .start.sql                       # Official PostgreSQL DDL schema & 43 seed recipes
 ┣ next.config.ts                   # Next.js configuration
 ┣ package.json                     # NPM dependencies and scripts
 ┣ tsconfig.json                    # TypeScript configuration (with allowJs: true)
 ┗ README.md
```

---

## Database Architecture (`.start.sql`)

The database is built on **Neon Serverless PostgreSQL** and adheres to the official `.start.sql` specification:

### 1. `recipes` Table (from `.start.sql`)
- `id`: `SERIAL PRIMARY KEY`
- `title`: `TEXT NOT NULL`
- `category`: `TEXT NOT NULL` (e.g., `'Italian'`, `'Indian'`, `'Mediterranean'`, `'Breakfast'`, `'Japanese'`, `'Dessert'`)
- `duration`: `INT NOT NULL` (total cooking time in minutes)
- `servings`: `INT NOT NULL`
- `ingredients`: `TEXT[] NOT NULL` (native PostgreSQL array of strings, automatically parsed by `pg`)
- `description`: `TEXT NOT NULL` (cooking steps and culinary summary)
- `image`: `TEXT` (high-resolution Unsplash photo URL)
- `created_at`: `TIMESTAMPTZ DEFAULT NOW()`

### 2. `users` Table (Auth Extension)
- `id`: `SERIAL PRIMARY KEY`
- `email`: `VARCHAR(255) UNIQUE NOT NULL`
- `password_hash`: `VARCHAR(255) NOT NULL` (hashed with `bcryptjs`)
- `name`: `VARCHAR(255) NOT NULL`
- `created_at`: `TIMESTAMPTZ DEFAULT NOW()`

### 3. `cookbook_items` Table (Cookbook CRUD Extension)
- `id`: `SERIAL PRIMARY KEY`
- `user_id`: `INT REFERENCES users(id) ON DELETE CASCADE`
- `recipe_id`: `INT REFERENCES recipes(id) ON DELETE CASCADE`
- `personal_notes`: `TEXT DEFAULT ''`
- `rating`: `INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5)`
- `created_at`: `TIMESTAMPTZ DEFAULT NOW()`
- `updated_at`: `TIMESTAMPTZ DEFAULT NOW()`
- `CONSTRAINT unique_user_recipe UNIQUE (user_id, recipe_id)`

---

## Neon PostgreSQL Setup & Connection (FR006)

1. Sign in to [https://neon.tech](https://neon.tech) via GitHub.
2. Create a new project named **`recipe-book`** (Postgres 16/17).
3. On the Neon Project Dashboard, navigate to **Connection Details**:
   - Check the **"Pooled connection"** checkbox.
   - Choose database: `neondb`.
   - Copy the connection string ending with `-pooler...`.
4. In the project root, create `.env.local` and add:
   ```env
   # Neon Serverless PostgreSQL (Pooled Endpoint with PgBouncer)
   PG_URI=postgresql://neondb_owner:your_password@ep-your-id-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
   DATABASE_URL=postgresql://neondb_owner:your_password@ep-your-id-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require

   # Authentication Session Key (32+ character random secret)
   AUTH_SECRET=8e4b1a7d9c2f5e0a3b6d8c1e4f7a2b9d0e3c6f8a1b4d7e0c3f5a8b2d6e9f1a4c
   ```

---

## Getting Started

### 1. Install Dependencies
*(On Windows PowerShell, use `npm.cmd`)*:
```powershell
npm.cmd install
```

### 2. Initialize and Seed Neon Database (FR007)
With `.env.local` saved, run:
```powershell
npm.cmd run db:seed
```
This executes `.start.sql` and the schema extensions, creating all tables and seeding 43 gourmet recipes into your Neon database.

### 3. Run Development Server
```powershell
npm.cmd run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

- `npm.cmd run dev`: Launch Next.js development server with Turbopack hot-reloading.
- `npm.cmd run build`: Compile and build optimized production bundle.
- `npm.cmd run start`: Start production server.
- `npm.cmd run lint`: Run ESLint checks.
- `npm.cmd run db:seed`: Execute database schema initialization and seed 43 recipes into Neon.

---

## TypeScript Dynamic APIs Provision

In Next.js, dynamic route parameters are asynchronous Promises. All dynamic pages and route handlers type `params` as a `Promise` and resolve them with `await params`:

```typescript
// src/app/recipes/[id]/page.tsx
export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipeById(parseInt(id, 10));
  // ...
}
```

---

## Deployment to Vercel (FR014)

1. Push your repository to GitHub:
   ```powershell
   git push -u origin main
   ```
2. In the [Vercel Dashboard](https://vercel.com), click **Add New... -> Project** and import `esde-seai8/fe07_recipebook`.
3. Under **Environment Variables**, add:
   - `PG_URI`: Your Neon pooled connection string.
   - `DATABASE_URL`: Your Neon pooled connection string.
   - `AUTH_SECRET`: Your production secret string.
4. Click **Deploy**. Vercel will automatically build and deploy your application.
