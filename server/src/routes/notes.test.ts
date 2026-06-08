import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

vi.mock('firebase-admin/auth', () => ({
  getAuth: () => ({
    verifyIdToken: vi.fn().mockResolvedValue({ uid: 'test-uid' }),
  }),
}));

vi.mock('../services/notes');

import app from '../app';
import * as notesService from '../services/notes';

const AUTH = { Authorization: 'Bearer fake-token' };

const fakeTimestamp = {
  seconds: 0,
  nanoseconds: 0,
  toDate: () => new Date(),
  toMillis: () => 0,
  isEqual: () => false,
  valueOf: () => '',
} as unknown as FirebaseFirestore.Timestamp;

const mockNote = {
  id: 'note-1',
  uid: 'test-uid',
  title: 'Test Note',
  content: 'Hello world',
  tags: ['test'],
  createdAt: fakeTimestamp,
  updatedAt: fakeTimestamp,
};

describe('Notes CRUD', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /notes', () => {
    it('returns a list of notes', async () => {
      vi.mocked(notesService.listNotes).mockResolvedValue([mockNote]);

      const res = await request(app).get('/notes').set(AUTH);

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].title).toBe('Test Note');
    });

    it('returns 401 when no token is provided', async () => {
      const res = await request(app).get('/notes');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /notes', () => {
    it('creates and returns a new note', async () => {
      vi.mocked(notesService.createNote).mockResolvedValue(mockNote);

      const res = await request(app)
        .post('/notes')
        .set(AUTH)
        .send({ title: 'Test Note', content: 'Hello world', tags: ['test'] });

      expect(res.status).toBe(201);
      expect(res.body.id).toBe('note-1');
      expect(res.body.title).toBe('Test Note');
    });
  });

  describe('GET /notes/:id', () => {
    it('returns a single note', async () => {
      vi.mocked(notesService.getNote).mockResolvedValue(mockNote);

      const res = await request(app).get('/notes/note-1').set(AUTH);

      expect(res.status).toBe(200);
      expect(res.body.id).toBe('note-1');
    });

    it('returns 404 when note does not exist', async () => {
      vi.mocked(notesService.getNote).mockResolvedValue(null);

      const res = await request(app).get('/notes/missing').set(AUTH);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Note not found');
    });
  });

  describe('PUT /notes/:id', () => {
    it('updates and returns the note', async () => {
      const updated = { ...mockNote, title: 'Updated Title' };
      vi.mocked(notesService.updateNote).mockResolvedValue(updated);

      const res = await request(app)
        .put('/notes/note-1')
        .set(AUTH)
        .send({ title: 'Updated Title' });

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated Title');
    });

    it('returns 404 when note does not exist', async () => {
      vi.mocked(notesService.updateNote).mockResolvedValue(null);

      const res = await request(app)
        .put('/notes/missing')
        .set(AUTH)
        .send({ title: 'Updated Title' });

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Note not found');
    });
  });

  describe('DELETE /notes/:id', () => {
    it('deletes the note and returns 204', async () => {
      vi.mocked(notesService.deleteNote).mockResolvedValue(undefined);

      const res = await request(app).delete('/notes/note-1').set(AUTH);

      expect(res.status).toBe(204);
    });
  });
});
