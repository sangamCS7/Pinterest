import express from 'express';
import { getUserProfile } from '../controllers/user.controller.js';

const router = express.Router();

// Getting a user profile is public, but you could add `protect` if you wanted it to be private
router.get('/:id', getUserProfile); 

export default router;