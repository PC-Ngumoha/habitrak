/**
 * userRoutes.ts
 */
import { Router } from "express";
import {register, login, logout, currentUser} from '../controllers/userController';
import auth from '../middleware/auth';

const router = Router();

router.get('/me', auth, currentUser);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;