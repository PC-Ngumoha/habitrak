/**
 * userRoutes.ts
 */
import { Router } from "express";
import {register, login, currentUser} from '../controllers/userController';
import auth from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', auth, currentUser);
// router.post('/logout', logout);

export default router;