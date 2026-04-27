import { Router } from "express";
import { getHabits, createHabit, editHabit, deleteHabit, markAsDone, unmarkAsDone } from '../controllers/habitController';
import auth from '../middleware/auth';

const router = Router();

router.get('/', auth, getHabits);
router.post('/', auth, createHabit);
router.put('/:id', auth, editHabit);
router.delete('/:id', auth, deleteHabit);

router.post('/:id/complete', auth, markAsDone);
router.delete('/:id/complete', auth, unmarkAsDone);

export default router;
