/**
 * userRoutes.ts
 */
import { Router } from "express";
import UserController from '../controllers/userController';
import auth from '../middleware/auth';

const router = Router();
const controller = new UserController();

router.post('/register', controller.register);
router.post('/login', controller.login);

router.get('/me', auth, controller.currentUser);
// router.post('/logout', logout);

export default router;