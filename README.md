# 🍳 Recipe Book (fe07_recipebook)

A modern, full-featured **Recipe Creator, Search, and Personal Cookbook** web application built with **Next.js 15 (App Router)**, **TypeScript**, **TailwindCSS**, **Neon Serverless PostgreSQL**, and **TanStack React Query**.

---

## 🌟 Features & Functional Requirements

- **FR001 / FR002: GitHub & PR Workflow**: Hosted in public GitHub repository (`esde-seai8/fe07_recipebook`) following Conventional Commits and feature branches.
- **FR003: Framework Scaffolding**: Built on Next.js 15 with the official TypeScript template and App Router.
- **FR004: Routing Configuration**: Declarative client routes (`/`, `/search`, `/recipes/[id]`, `/dashboard`, `/(auth)/login`, `/(auth)/register`), Next.js Server Actions, and REST Route Handlers.
- **FR005: TailwindCSS Styling**: Polished, responsive culinary design system with warm amber/stone accents, card grids, badges, and mobile-friendly layouts.
- **FR006: Neon Integration**: Server-side singleton connection pooling to Neon Serverless PostgreSQL with SSL support.
- **FR007: Data Generation & Seeding**: Automated seeding script (`npm run db:seed`) executing `.start.sql` with rich, diverse recipes from around the globe.
- **FR008: Search Functionality**: Real-time recipe search by title and description, filterable by cuisine and difficulty.
- **FR009: Recipe Detail Page**: Dedicated detail view with hero photography, ingredients checklist, step-by-step instructions, and Next.js 15 async promise params typing.
- **FR010: Cookbook CRUD**: Add recipes to cookbook, list saved items, edit personal culinary notes and star ratings, and remove items with persistent PostgreSQL storage.
- **FR011: Loading & Error Handling**: Instant feedback with skeleton cards (`Loading.jsx`), Suspense streaming (`loading.jsx`), and resilient error boundaries (`error.jsx`).
- **FR012: Code Organization**: Strictly modular architecture following the `fe07_recipebook.txt` component tree.
- **FR013: Documentation**: Complete setup, architecture, and Neon guide.
- **FR014: Next.js Deployment**: Ready for Vercel deployment with edge-compatible pooling and streaming.

---

## 📂 Project Structure

```
fe07_recipebook
 ┣ src
 ┃ ┣ app
 ┃ ┃ ┣ (auth)
 ┃ ┃ ┃ ┣ login/page.jsx             # User sign-in page
 ┃ ┃ ┃ ┗ register/page.jsx          # User registration page
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┣ auth/[...all]/route.js     # Auth endpoints (session, login, register, logout)
 ┃ ┃ ┃ ┗ recipes
 ┃ ┃ ┃ ┃ ┣ [id]/route.js            # Single recipe API (async params)
 ┃ ┃ ┃ ┃ ┗ route.js                 # Recipe listing & creation API
 ┃ ┃ ┣ dashboard/page.jsx           # User's personal cookbook with notes CRUD
 ┃ ┃ ┣ recipes/[id]/page.tsx        # Recipe detail page (TypeScript async params)
 ┃ ┃ ┣ search/page.jsx              # Search and filtering page
 ┃ ┃ ┣ favicon.ico
 ┃ ┃ ┣ globals.css                  # TailwindCSS theme
 ┃ ┃ ┣ layout.tsx                   # Root layout with Provider & Navbar
 ┃ ┃ ┣ page.tsx                     # Landing home page
 ┃ ┃ ┣ provider.jsx                 # TanStack QueryClientProvider wrapper
 ┃ ┃ ┣ loading.jsx                  # Fallback streaming loader
 ┃ ┃ ┗ error.jsx                    # Root error boundary
 ┃ ┣ components
 ┃ ┃ ┣ index.js                     # Component barrel exports
 ┃ ┃ ┣ Loading.jsx                  # Skeletons and spinners
 ┃ ┃ ┗ Navbar.jsx                   # Sticky navigation bar
 ┃ ┣ features
 ┃ ┃ ┣ auth
 ┃ ┃ ┃ ┣ components
 ┃ ┃ ┃ ┃ ┣ FormSingIn.jsx
 ┃ ┃ ┃ ┃ ┣ FormSingOut.jsx
 ┃ ┃ ┃ ┃ ┗ FormSingUp.jsx
 ┃ ┃ ┃ ┣ actions.js                 # Server Actions for authentication
 ┃ ┃ ┃ ┣ index.js
 ┃ ┃ ┃ ┗ server.js                  # User verification & password hashing
 ┃ ┃ ┗ recipes
 ┃ ┃ ┃ ┣ components
 ┃ ┃ ┃ ┃ ┣ AddRecipeForm.jsx        # Modal form to add custom recipes
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
 ┣ .gitignore                       # Git exclusion rules
 ┣ .start.sql                       # PostgreSQL DDL schema & seed records
 ┣ next.config.ts                   # Next.js configuration
 ┣ package.json                     # NPM dependencies and scripts
 ┣ tsconfig.json                    # TypeScript configuration (with allowJs: true)
 ┗ README.md
```

---

## 🐘 Neon PostgreSQL Setup (FR006)

1. Create a free account at [https://neon.tech](https://neon.tech).
2. Create a new project named **recipe-book**.
3. In the Neon Console Dashboard, find the **Connection Details** box.
4. Select **Pooled connection** (this uses Neon's built-in PgBouncer pooler endpoint, which prevents connection exhaustion in serverless environments).
5. Copy the connection string, which looks like:
   ```text
   postgresql://[user]:[password]@[endpoint-id]-pooler.[region].neon.tech/[dbname]?sslmode=require
   ```
6. In the project root, create `.env.local` and paste your URI:
   ```env
   PG_URI=postgresql://[user]:[password]@[endpoint-id]-pooler.[region].neon.tech/[dbname]?sslmode=require
   DATABASE_URL=postgresql://[user]:[password]@[endpoint-id]-pooler.[region].neon.tech/[dbname]?sslmode=require
   AUTH_SECRET=generate_a_random_32_character_string_here
   ```

---

## 🚀 Getting Started

### 1. Install Dependencies
*(On Windows PowerShell, use `npm.cmd`)*:
```bash
npm install
```

### 2. Initialize and Seed Neon Database (FR007)
Ensure `.env.local` is configured with your `PG_URI`, then run:
```bash
npm run db:seed
```
This executes `.start.sql`, creating the `users`, `recipes`, and `cookbook_items` tables and seeding 8+ international gourmet recipes.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠 Available Scripts

- `npm run dev`: Launch Next.js development server with hot-reloading.
- `npm run build`: Compile and build optimized production bundle.
- `npm run start`: Start production server.
- `npm run lint`: Run ESLint checks.
- `npm run db:seed`: Initialize database schema and populate seed data in Neon.

---

## 📝 TypeScript Dynamic APIs Provision

In Next.js 15, dynamic route parameters are asynchronous Promises. Dynamic pages and route handlers type `params` as a `Promise` and resolve them with `await params`:

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

## 🚢 Deployment to Vercel (FR014)

1. Push your repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New... -> Project** and import `esde-seai8/fe07_recipebook`.
3. Under **Environment Variables**, add:
   - `PG_URI`: Your Neon pooled connection string.
   - `DATABASE_URL`: Your Neon pooled connection string.
   - `AUTH_SECRET`: A secure random secret string.
4. Click **Deploy**. Vercel will automatically run `next build` and deploy serverless functions.
