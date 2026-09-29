# PROJECT: RECIPE BOOK

You’ve gone deep into React and its ecosystem, and now it’s time to cook up something delicious: a full-featured Recipe Creator. Over the next two weeks, you’ll build a website where you can search for recipes, save favorites, and jot down notes, using NextJS. Let’s get chopping!

**ID and Functional Requirement Description**

**FR001:** Public GitHub Repository. Host code in a public repo and merge into main only via pull requests.

**FR002:** Commit Workflow. Make small, frequent commits and open PRs for each feature or fix.

**FR003:** Framework Scaffolding. Scaffold your project with NextJS using the TypeScript template.

**FR004:** Routing Configuration. Set up client-side routes with NextJS pages and server functions.

**FR005:** TailwindCSS Styling. Apply consistent styling throughout using TailwindCSS.

**FR006:** Neon Integration. Set up a Neon database with recipe data and configure server-side functions to query it.

**FR007:** Data Generation. Use Neon to seed your database with sample recipes on project initialization.

**FR008:** Search Functionality. Implement a search interface that queries your Neon database on the server and displays results.

**FR009:** Recipe Detail Page. Create a dedicated page to fetch and display detailed data for a selected recipe from Neon.

**FR010:** Cookbook CRUD. Enable visitors to add, list, update notes, and remove recipes in their cookbook, persisting changes to Neon.

**FR011:** Loading and Error Handling. Provide user feedback: loading indicators and graceful error messages for database operations.

**FR012:** Code Organization. Maintain a clear folder structure (components, utils, types).

**FR013:** Documentation & Readme Include a README with setup instructions, project overview, and Neon usage details.

**FR014:** NextJS Deployment Deploy the NextJS app to Vercel and configure loading.js for data fetching states.

**ADDITIONAL REQUIREMENTS**

When Scaffolding the Project, and asked about using TypeScript, simply say yes.

If you chose TypeScript:

Remember that JavaScript code is TypeScript compliant you can continue writing your components as jsx files. Once you’re ready to integrate TypeScript code gradually (we recommend waiting for the second week of this project), there are some things to consider:

Your components have to be .tsx instead of .jsx

If you are trying to use navigation params in a page, e.g. /recipes/tacos or /recipes/meatballs you need to type the params as follows:

example code snipet:

// src/app/\[pastaType\]/page.tsx

import { notFound } from 'next/navigation';

import pg from 'pg';

const connectionString = process.env.PG\_URI;

type Pasta = {

id: number;

name: string;

description: string;

};

const PastaType = async ({ params }: { params: Promise<{ pastaType: string }> }) => {

const { pastaType } = await params;

const { Pool } = pg;

const pool = new Pool({

connectionString

});

const { rows } = await pool.query<Pasta>('SELECT \* FROM pasta\_types WHERE name = $1', \[

pastaType

\]);

if (!rows.length) notFound();

const result = rows\[0\];

return (

<main className='p-4 space-y-4'>

<h1 className='text-2xl font-bold'>{result.name}</h1>

<p>{result.description}</p>

</main>

);

};

export default PastaType;

The reason for the params to be typed as a Promise that returns your list of params is because in [NextJS Dynamic APIs are asynchronous](https://nextjs.org/docs/messages/sync-dynamic-apis).