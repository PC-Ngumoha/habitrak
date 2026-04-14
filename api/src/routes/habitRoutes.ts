import { Router } from "express";
import { getHabits, createHabit, editHabit } from '../controllers/habitController';

const router = Router();

router.get('/', getHabits);
router.post('/', createHabit);
router.put('/:id', editHabit);

export default router;
