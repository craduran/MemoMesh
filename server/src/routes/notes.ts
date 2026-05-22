import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as notesController from '../controllers/notes';

const router = Router();

router.use(authenticate);

router.get('/', notesController.listNotes);
router.post('/', notesController.createNote);
router.get('/:id', notesController.getNote);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

export default router;
