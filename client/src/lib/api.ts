import { auth } from "@/firebaseConfig";
import type { Note } from "@/types/note";

const BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function authHeaders(): Promise<HeadersInit> {
  const token = await auth.currentUser?.getIdToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function request<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(await authHeaders()),
      ...init.headers,
    },
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: response.statusText }));

    throw new Error(error.error ?? "Request failed");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const api = {
  notes: {
    list: () => request<Note[]>("/notes"),

    get: (id: string) =>
      request<Note>(`/notes/${id}`),

    create: (body: {
      title: string;
      content: string;
      tags: string[];
    }) =>
      request<Note>("/notes", {
        method: "POST",
        body: JSON.stringify(body),
      }),

    update: (
      id: string,
      body: {
        title: string;
        content: string;
        tags: string[];
      }
    ) =>
      request<Note>(`/notes/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }),

    delete: (id: string) =>
      request<void>(`/notes/${id}`, {
        method: "DELETE",
      }),
  },
};