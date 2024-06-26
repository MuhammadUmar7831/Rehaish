import express from 'express';
import { googleOAuth, signin, signout, signup } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.delete('/signout', authenticate, signout);
router.post('/googleOAuth', googleOAuth);

export default router;