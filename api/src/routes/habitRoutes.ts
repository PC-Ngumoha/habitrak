import { Router } from "express";
import { getHabits, createHabit, editHabit, deleteHabit, markAsDone } from '../controllers/habitController';

const router = Router();

router.get('/', getHabits);
router.post('/', createHabit);
router.put('/:id', editHabit);
router.delete('/:id', deleteHabit);

router.post('/:id/complete', markAsDone);

export default router;
