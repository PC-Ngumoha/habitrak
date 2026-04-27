import { Router } from "express";
import HabitController from '../controllers/habitController';
import auth from '../middleware/auth';

const router = Router();
const controller = new HabitController();

router.get('/', auth, controller.getHabits);
router.post('/', auth, controller.createHabit);
router.put('/:id', auth, controller.editHabit);
router.delete('/:id', auth, controller.deleteHabit);

router.post('/:id/complete', auth, controller.markHabitAsDone);
router.delete('/:id/complete', auth, controller.unmarkHabitAsDone);

export default router;