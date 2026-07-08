# Login Signup — Frontend

React (Vite) frontend for the Login Signup app. Talks to the backend API for signup, login, and the protected dashboard.

## Setup

```bash
npm install
cp .env.example .env   # set VITE_API_URL to your backend's URL
npm run dev
```

Runs on `http://localhost:5173` by default.

## Structure

```
src/
├── context/       AuthContext — holds token/user state, exposes login/signup/logout
├── services/      authService.js — fetch wrapper for the backend API
├── components/    Navbar, RequireAuth (route guard)
├── pages/         Home, Login, Signup, Dashboard
├── App.jsx        routes
└── main.jsx       entry point
```

## Deploying

Set `VITE_API_URL` in your hosting platform's environment variables (e.g. on Vercel/Netlify) to point at your deployed backend:

```
VITE_API_URL=https://login-signup-backend-65ha.onrender.com/api/auth
```

Then `npm run build` produces a static `dist/` folder ready to deploy.
