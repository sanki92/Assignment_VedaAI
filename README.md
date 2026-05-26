# VedaAI Assessment Creator

AI assessment creator for teachers. Create an assignment, generate a structured question paper with an LLM, and view it in a clean exam paper layout.

## Structure

This is a monorepo with two workspaces:

- `frontend` - Next.js (TypeScript) client
- `backend` - Node.js + Express (TypeScript) API and worker

## Stack

- Frontend: Next.js, TypeScript, Zustand, WebSocket
- Backend: Express, MongoDB, Redis, BullMQ, WebSocket
- AI: Gemini

## Getting started

Install dependencies from the repo root:

```bash
npm install
```

Run the apps:

```bash
npm run dev:backend
npm run dev:frontend
```

More setup details live in each workspace and are expanded in the sections below as the project grows.
