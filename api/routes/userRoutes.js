
import express from 'express';
import {  changePassword, userProfile } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.get('/appointments', authMiddleware, getUserAppointments);
router.get('/profile/:id',authenticate, userProfile);
router.put('/change-password', authenticate, changePassword);

export default router;
