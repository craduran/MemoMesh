import { getFirestore, FieldValue } from 'firebase-admin/firestore';

export interface Note {
  id: string;
  uid: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

function notesCol(uid: string) {
  return getFirestore().collection('users').doc(uid).collection('notes');
}

export async function listNotes(uid: string): Promise<Note[]> {
  const snap = await notesCol(uid).orderBy('updatedAt', 'desc').get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Note));
}

export async function createNote(
  uid: string,
  data: Pick<Note, 'title' | 'content' | 'tags'>
): Promise<Note> {
  const ref = notesCol(uid).doc();
  const now = FieldValue.serverTimestamp();
  await ref.set({ uid, ...data, createdAt: now, updatedAt: now });
  const snap = await ref.get();
  return { id: snap.id, ...snap.data() } as Note;
}

export async function getNote(uid: string, id: string): Promise<Note | null> {
  const snap = await notesCol(uid).doc(id).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as Note;
}

export async function updateNote(
  uid: string,
  id: string,
  data: Partial<Pick<Note, 'title' | 'content' | 'tags'>>
): Promise<Note | null> {
  const ref = notesCol(uid).doc(id);
  const existing = await ref.get();
  if (!existing.exists) return null;
  await ref.update({ ...data, updatedAt: FieldValue.serverTimestamp() });
  const snap = await ref.get();
  return { id: snap.id, ...snap.data() } as Note;
}

export async function deleteNote(uid: string, id: string): Promise<void> {
  await notesCol(uid).doc(id).delete();
}
