// routes/physioRoutes.js
import express from 'express';
import { physioLogin, viewAssignedOrders, approveDisapproveService, manageSessionDetails, viewAppointments, startSession, endSession, createApplication } from '../controllers/physioController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Physiotherapist login route
router.post('/login', physioLogin);
router.post('/create', createApplication);

router.use(authenticate);
router.get('/orders', viewAssignedOrders);
router.put('/order/:id/approve', approveDisapproveService);
router.put('/order/:id/session', manageSessionDetails);
router.get('/appointments', viewAppointments);
router.patch('/session/:id/start', startSession);
router.patch('/session/:id/end', endSession);



export default router;
