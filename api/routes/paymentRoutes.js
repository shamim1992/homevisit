// routes/paymentRoutes.js
import express from 'express';
import { initiatePayment, verifyPayment } from '../controllers/paymentController.js';

const router = express.Router();

// Route to initiate payment
router.post('/initiate', initiatePayment);

// Route to verify payment
router.post('/verify', verifyPayment);

export default router;
