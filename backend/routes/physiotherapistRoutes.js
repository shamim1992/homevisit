import express from 'express';
import { getAssignedServices, updateServiceStatus, getAllPatients, getAllAppointments, updatePatientDetails } from '../controllers/physiotherapistController.js';
import { protect, physiotherapist } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, physiotherapist);

router.get('/assigned-services', getAssignedServices);
router.put('/services/:id', updateServiceStatus);
router.get('/patients', getAllPatients);
router.get('/appointments', getAllAppointments);
router.put('/patients/:id', updatePatientDetails);

export default router;