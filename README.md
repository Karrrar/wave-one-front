This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



## Backend Repository

This project is supported by a backend repository that handles additional server-side logic, database operations, and API endpoints.

- **Repository Name:** [wave-one-api](https://github.com/Karrrar/wave-one-api)
- **Description:** The backend repository provides APIs and database integration for the Wave One project. It ensures data persistence, user authentication, and other server-side functionalities.

## Running the Api
To run the backend API server, follow:

```bash
yarn dev
```


## Getting Started

First, install the dependencies:

```bash
yarn
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Features

### Menu
The menu is implemented using an array of objects to represent food items and an object to manage favorite items. It provides an interactive interface for users to add, remove, and update their favorite foods.

**URL:** [http://localhost:3000/menu](http://localhost:3000/menu)  
**Path:** `app/menu/page.tsx`

### Menu API
The `/menu-api` page utilizes the `/api/foods` API provided by Next.js. This API handles food-related data operations.

**URL:** [http://localhost:3000/menu-api](http://localhost:3000/menu-api)  
**Path:** `app/menu-api/page.tsx` and `app/api/foods/route.ts`

### Menu Database API
The `/menu-db` page interacts with an external API that connects to a database. This ensures that data persists even after a page refresh, providing a more robust solution for managing menu data.

**URL:** [http://localhost:3000/menu-db](http://localhost:3000/menu-db)  
**Path:** `app/menu-db/page.tsx`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Learn Next.js Basics](https://github.com/Karrrar/FutureWave-WaveOne/blob/main/docs/07-nextjs-getting-started.md) - a guide to getting started with Next.js.
- [FutureWave-WaveOne GitHub Repository](https://github.com/Karrrar/FutureWave-WaveOne) - explore the project repository for more insights.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
