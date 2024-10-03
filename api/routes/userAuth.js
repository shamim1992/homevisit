import express from 'express';
import { forgotPassword, resetPassword, userlogin, userRegistration } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', userRegistration);
router.post('/login', userlogin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


export default router