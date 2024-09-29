import express from 'express';
import { getNotes, createNote, updateNote, deleteNote, patchIsStar } from '../controllers/noteController.js';

const router = express.Router();

// Ensure the route is correctly defined
router.get('/:user_id', getNotes); // استخدم :user_id فقط هنا
router.post('/:user_id', createNote);
router.put('/:id', updateNote); // استخدم :id هنا
router.delete('/:id', deleteNote); // استخدم :id هنا
router.patch('/:id/is_star', patchIsStar); 

export default router;
