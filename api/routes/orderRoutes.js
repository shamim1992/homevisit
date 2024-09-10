// routes/orderRoutes.js
import express from 'express';
import { createOrder, getUserOrders, getOrder, updateOrder, getAllOrders, service_area, addSessionToOrder, updateSession, deleteSessionFromOrder } from '../controllers/orderController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import  upload from '../middleware/fileUpload.js';

const router = express.Router();

// User routes
router.get('/service-areas', service_area);
router.use(authenticate);
router.post('/', upload.single('prescription'),createOrder);
router.get('/myorders', getUserOrders);
router.get('/:id', getOrder);


router.post('/add-session',  addSessionToOrder);
router.put('/update-session',  updateSession);
router.delete('/delete-session',  deleteSessionFromOrder);

// Admin routes
router.get('/', authenticate, getAllOrders);
router.put('/:id', authenticate, updateOrder);

export default router;
