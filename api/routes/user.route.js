import express from 'express';
import { getUser, test } from '../controllers/user.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/test', test);
router.get('/getUser', authenticate, getUser);

export default router;