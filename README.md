# MemoMesh

An AI-powered study and knowledge management platform. Save notes, organize knowledge, generate AI summaries and flashcards, and interact with your personal study materials.

## Repo Structure

```
MemoMesh/
├── client/          # React frontend (Vite + TypeScript)
├── server/          # Express backend (Firebase Cloud Functions)
├── firebase.json    # Firebase hosting + functions config
└── .firebaserc      # Firebase project config
```

## Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React, Vite, TypeScript, Tailwind CSS, shadcn/ui |
| State     | TanStack Query, React Router                    |
| Backend   | Node.js, Express, TypeScript                    |
| Cloud     | Firebase Hosting, Cloud Functions, Firestore    |
| Auth      | Firebase Authentication                         |
| AI        | Vertex AI                                       |

## Prerequisites

- Node.js 20+
- Firebase CLI (`npm install -g firebase-tools`)
- A Firebase project with Firestore, Auth, and Cloud Functions enabled

## Quick Start

```bash
# Install all dependencies
npm run install:all

# Run frontend dev server
npm run dev:client

# Run backend dev server
npm run dev:server
```

## Available Scripts

| Script             | Description                        |
|--------------------|------------------------------------|
| `dev:client`       | Start frontend on localhost:5173   |
| `dev:server`       | Start backend on localhost:3001    |
| `build:client`     | Build frontend for production      |
| `build:server`     | Compile backend TypeScript         |
| `install:all`      | Install deps for client and server |

## Deployment

```bash
# Build both
npm run build:client && npm run build:server

# Deploy to Firebase
firebase deploy
```

## MVP Features

- Authentication (Firebase Auth)
- Notes CRUD
- Tags and Search
- AI Summaries (Vertex AI)
- AI Flashcards (Vertex AI)
