import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import * as notesService from '../services/notes';

export async function listNotes(req: AuthRequest, res: Response): Promise<void> {
  const notes = await notesService.listNotes(req.uid!);
  res.json(notes);
}

export async function createNote(req: AuthRequest, res: Response): Promise<void> {
  const note = await notesService.createNote(req.uid!, req.body);
  res.status(201).json(note);
}

export async function getNote(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params as { id: string };
  const note = await notesService.getNote(req.uid!, id);
  if (!note) {
    res.status(404).json({ error: 'Note not found' });
    return;
  }
  res.json(note);
}

export async function updateNote(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params as { id: string };
  const note = await notesService.updateNote(req.uid!, id, req.body);
  if (!note) {
    res.status(404).json({ error: 'Note not found' });
    return;
  }
  res.json(note);
}

export async function deleteNote(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params as { id: string };
  await notesService.deleteNote(req.uid!, id);
  res.status(204).send();
}
