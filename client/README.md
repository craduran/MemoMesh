# MemoMesh — Client

React frontend for MemoMesh, built with Vite and TypeScript.

## Stack

- **React 19** — UI library
- **Vite** — build tool and dev server
- **TypeScript** — type safety
- **Tailwind CSS v4** — utility-first styling
- **shadcn/ui** — accessible component library
- **TanStack Query** — server state management
- **React Router** — client-side routing

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Runs on `http://localhost:5173`.

## Build

```bash
npm run build
```

Output goes to `dist/`. This is what Firebase Hosting serves.

## Folder Structure

```
src/
├── components/
│   └── ui/          # shadcn/ui components
├── features/        # Feature modules (auth, notes, flashcards)
├── hooks/           # Shared custom hooks
├── lib/
│   └── utils.ts     # shadcn utility (cn helper)
├── pages/           # Route-level page components
├── services/        # API client functions
├── types/           # Shared TypeScript types
├── App.tsx          # Root component with router + query client
└── main.tsx         # Entry point
```

## Path Aliases

`@/` maps to `src/` — use it instead of relative imports:

```ts
import { Button } from '@/components/ui/button';
```

## Adding shadcn Components

```bash
npx shadcn@latest add <component>
# e.g.
npx shadcn@latest add card input dialog
```

## Environment Variables

Create a `.env.local` file in this directory:

```env
VITE_API_BASE_URL=http://localhost:3001
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
```
