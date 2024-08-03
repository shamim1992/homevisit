import mongoose from 'mongoose';
import User from './User.js';

const physiotherapistSchema = new mongoose.Schema({
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
}, { timestamps: true });

const Physiotherapist = User.discriminator('Physiotherapist', physiotherapistSchema);
export default Physiotherapist;