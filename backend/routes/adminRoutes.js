import express from 'express';
import { getAllUsers, updateUserProfile, addPhysiotherapist, removePhysiotherapist, getAllPhysiotherapists } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, admin);

router.route('/users')
  .get(getAllUsers);

router.route('/users/:id')
  .put(updateUserProfile);

router.route('/physiotherapists')
  .get(getAllPhysiotherapists)
  .post(addPhysiotherapist);

router.route('/physiotherapists/:id')
  .delete(removePhysiotherapist);

export default router;