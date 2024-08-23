// routes/orderRoutes.js
import express from 'express';
import { createOrder, getUserOrders, getOrder, updateOrder, getAllOrders } from '../controllers/orderController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes
router.use(authenticate);
router.post('/', createOrder);
router.get('/myorders', getUserOrders);
router.get('/:id', getOrder);

// Admin routes
router.get('/', authenticate, getAllOrders);
router.put('/:id', authenticate, updateOrder);

export default router;
