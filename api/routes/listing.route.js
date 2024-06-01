import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {createListing, editUserListing, getListingById, getUserListing} from '../controllers/listing.controller.js'

const router = express.Router();

router.post('/create', authenticate, createListing);
router.put('/edit', authenticate, editUserListing);
router.get('/getUserListing', authenticate, getUserListing);
router.get('/get/:listingId', getListingById);

export default router;