import express from 'express';
import { createPin, getAllPins, getPinById, deletePin } from '../controllers/pin.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import upload from '../config/cloudinary.js';

const router = express.Router();

router.route('/')
    .get(getAllPins)
    .post(protect, upload.single('image'), createPin);

router.route('/:id')
    .get(getPinById)
    .delete(protect, deletePin);

export default router;

