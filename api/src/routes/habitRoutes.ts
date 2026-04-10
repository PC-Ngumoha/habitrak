import { Router } from "express";
import { getHabits, createHabit } from '../controllers/habitController';

const router = Router();

router.get('/', getHabits);
router.post('/', createHabit);

export default router;
