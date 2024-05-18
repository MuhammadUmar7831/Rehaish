import express from 'express';
import { deleteUser, getUser, test, updateUser } from '../controllers/user.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/test', test);
router.get('/getUser', authenticate, getUser);
router.post('/updateUser', authenticate, updateUser);
router.delete('/deleteUser', authenticate, deleteUser);

export default router;