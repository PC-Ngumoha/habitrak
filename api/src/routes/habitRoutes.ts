import { Router } from "express";
import { getHabits, createHabit, editHabit, deleteHabit } from '../controllers/habitController';

const router = Router();

router.get('/', getHabits);
router.post('/', createHabit);
router.put('/:id', editHabit);
router.delete('/:id', deleteHabit);

export default router;
