import express from 'express';
import { userlogin, userRegistration } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', userRegistration);
router.post('/login', userlogin);


export default router