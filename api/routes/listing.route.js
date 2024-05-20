import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {createListing, getUserListing} from '../controllers/listing.controller.js'

const router = express.Router();

router.post('/create', authenticate, createListing);
router.get('/getUserListing', authenticate, getUserListing);

export default router;