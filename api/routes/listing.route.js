import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {createListing} from '../controllers/listing.controller.js'

const router = express.Router();

router.post('/create', authenticate, createListing);

export default router;