# MemoMesh — Server

Express backend for MemoMesh, deployed as Firebase Cloud Functions.

## Stack

- **Node.js 20** — runtime
- **Express** — HTTP framework
- **TypeScript** — type safety
- **Firebase Admin SDK** — Firestore + Auth token verification
- **Firebase Functions** — serverless deployment

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Runs on `http://localhost:3001`. Requires a `serviceAccountKey.json` in this directory (see Environment below).

## Build

```bash
npm run build
```

Compiles TypeScript to `lib/`. Firebase Functions deploys from there.

## Folder Structure

```
src/
├── routes/          # Express route definitions
├── controllers/     # Request/response handlers
├── services/        # Business logic + Firestore queries
├── middleware/
│   └── auth.ts      # Firebase ID token verification
├── app.ts           # Express app setup
└── index.ts         # Entry point (local dev + Cloud Functions export)
```

## Request Flow

```
Route → Middleware (auth) → Controller → Service → Firestore
```

## Environment

Create a `serviceAccountKey.json` in this directory by going to:

Firebase Console → Project Settings → Service Accounts → Generate new private key

Then set the environment variable:

```env
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
```

Or create a `.env` file:

```env
PORT=3001
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
```

> Never commit `serviceAccountKey.json` — it is listed in `.gitignore`.

## API Endpoints

All routes require a Firebase ID token in the `Authorization: Bearer <token>` header.

| Method | Path         | Description       |
|--------|--------------|-------------------|
| GET    | /notes       | List user's notes |
| POST   | /notes       | Create a note     |
| GET    | /notes/:id   | Get a note        |
| PUT    | /notes/:id   | Update a note     |
| DELETE | /notes/:id   | Delete a note     |
| GET    | /health      | Health check      |
