# AI Cyber Laws Assistant Client

AI Cyber Laws Assistant is a Gemini-powered legal-tech Q&A platform that helps non-technical users understand Indian cyber laws through a guided, browser-based experience. This repository contains the React, TypeScript, and Vite frontend that powers the user interface, including authentication, chatbot interactions, community features, and the platform's cyber awareness dashboards.

Built as a single-page application with a dashboard-style layout, the client brings together learning, assessment, and interaction in one place. It includes secure sign-in flows, a full-stack community tab for user discussions, a tuned chatbot experience that returns short and accurate responses, and a site-wide light/dark mode theme for better usability.

The project was developed by a 4-person team and pairs this frontend with a PostgreSQL-backed server that uses Google Gemini for AI responses. The result is a practical legal-tech product that makes cyber law guidance easier to access, understand, and apply.

Backend repository: [AI Cyber Laws Assistant Server](https://github.com/Sourish-Kanna/AI-Cyber-Laws-Assistant-Server)

## What It Includes

- Toolpad-based dashboard shell with navigation and theme switching
- Auth flows for login, registration, and logout
- Protected chatbot experience with chat section management
- Cyber news, cyber health, community, statistics, data breach, attack map, and security checklist pages
- Google sign-in and API calls to the backend

## Prerequisites

- Node.js 18+
- A running backend server
- A Google OAuth client ID

## Environment Setup

Create a `.env` file in the `Client` folder before starting the app. A sample configuration is available in `.env-local`.

Required variables:

- `VITE_BASE_SERVER_URL`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_NEWS_API_KEY`

Example:

```bash
VITE_BASE_SERVER_URL=http://localhost:8001/api/v1
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_NEWS_API_KEY=your-news-api-key
```

## Install And Run

```bash
npm install
```

```bash
npm run dev
```

## Scripts

- `npm run dev` - starts the Vite dev server
- `npm run build` - type-checks and builds the production bundle
- `npm run lint` - runs ESLint
- `npm run preview` - previews the production build locally

## Main Routes

- `/` - dashboard shell
- `/login`
- `/register`
- `/logout`
- `/chatbot`
- `/cybernews`
- `/cyberhealth`
- `/community`
- `/stats`
- `/databreach`
- `/attackmap`
- `/securitychecklist`
