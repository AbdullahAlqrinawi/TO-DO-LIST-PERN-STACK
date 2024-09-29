import express from 'express';
import { getNotes, createNote, updateNote, deleteNote, patchIsStar, } from '../controllers/noteController.js';

const router = express.Router();

router.get('/:user_id', getNotes); 
router.post('/:user_id', createNote);
router.put('/:id', updateNote); 
router.delete('/:id', deleteNote); 
router.patch('/:id/is_star', patchIsStar); 


export default router;
