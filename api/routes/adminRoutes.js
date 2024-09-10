// routes/adminRoutes.js
import express from 'express';
import { adminLogin, viewUsers, viewOrders, updateUserProfile, manageServices, assignOrderToPhysioByPin, viewPhysiotherapists, editRole, deleteUser, addPhysiotherapist } from '../controllers/adminController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { viewApplications } from '../controllers/physioController.js';

const router = express.Router();

// Admin login route
router.post('/login', adminLogin);
router.get('/apllications', viewApplications);  
// Admin-only routes (protected by authentication middleware)
router.use(authenticate);
router.get('/users', viewUsers);
router.get('/orders', viewOrders);
router.put('/user/:id', updateUserProfile);
router.post('/service', manageServices); // CRUD for services
router.patch('/order/:id/assign', assignOrderToPhysioByPin);
router.get('/physiotherapists', viewPhysiotherapists);
router.put('/users/:id/role',editRole);
router.delete('/users/:id', deleteUser);
router.post('/physiotherapists', addPhysiotherapist);



export default router;
