import { auth } from './firebase';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

async function authHeaders(): Promise<HeadersInit> {
  const token = await auth.currentUser?.getIdToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { ...(await authHeaders()), ...init.headers },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? 'Request failed');
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  notes: {
    list: () => request('/notes'),
    get: (id: string) => request(`/notes/${id}`),
    create: (body: unknown) => request('/notes', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: unknown) => request(`/notes/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (id: string) => request(`/notes/${id}`, { method: 'DELETE' }),
  },
};
