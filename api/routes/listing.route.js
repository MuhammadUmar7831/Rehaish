import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {createListing, editUserListing, getUserListing} from '../controllers/listing.controller.js'

const router = express.Router();

router.post('/create', authenticate, createListing);
router.put('/edit', authenticate, editUserListing);
router.get('/getUserListing', authenticate, getUserListing);

export default router;