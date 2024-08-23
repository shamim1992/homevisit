// routes/serviceRoutes.js
import express from 'express';
import { addService, updateService, deleteService, getService, getAllServices } from '../controllers/serviceController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin only routes for managing services
// Public routes
router.get('/:id', getService);
router.get('/', getAllServices);


router.use(authenticate);
router.post('/', addService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);



export default router;
