import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
export default Service;