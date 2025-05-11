# Moncho-KG

A modern full-stack project built with a fast backend using **Hono** on **Bun**, and a responsive frontend using **React** and modern libraries. This app supports scheduling, accessing to building with QR, daily cron tasks, and full localization, theming.

## 📁 Project Structure

/
├── server/ # Backend using Bun + Hono
├── frontend/ # Frontend using React + Tailwind
├── .env.example # Environment variable example file
└── README.md

All required environment variables for this project are listed in the env.example file.
Make sure to do this for both frontend and root folders they use separate .env files.

🖥️ Backend (Server)
Built with:

[Hono](https://hono.dev/) – lightweight, fast web framework for Bun

[Bun](https://bun.sh) – blazing fast all-in-one JavaScript runtime

[Drizzle ORM](https://orm.drizzle.team/docs/get-started) – type-safe SQL ORM

[PostgreSQL](http://example.com) – relational database

[Croner](https://www.npmjs.com/package/croner) - job scheduler

[Moment.js](https://momentjs.com/) – date/time manipulation

🔄 Cron Job
A scheduled job runs every day at 12:00 AM using Croner.
You can use it for cleanup tasks, notifications, or any background processing.

Start the server by running these commands at the root level of the project:

```
bun install
bun run dev
```

## 💻 Frontend (Client)

Built with:

- [React](https://react.dev/) – component-based UI
  
- [i18next](https://www.i18next.com/) – internationalization
  
- [TanStack Router](https://tanstack.com/router/latest) – modern, type-safe routing
  
- [TanStack Query](https://tanstack.com/query/latest) – data fetching and caching
  
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) – simple and minimal global state
  
- [Tailwind CSS](https://tailwindcss.com/) – utility-first styling framework
  

### 🚀 Run the Frontend

```
cd frontend
npm install
npm run dev
```

Make sure to define any required frontend environment variables, like `VITE_FIREBASE_KEY`.
