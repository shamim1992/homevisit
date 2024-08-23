// models/orderModel.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }],
    physiotherapist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'approved', 'disapproved', 'completed'], default: 'pending' },
    sessionStart: { type: Date },
    sessionEnd: { type: Date },
    address:{ type: String},
    pin: { type: String},
    preferredDate:{
        type: Date,
    }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
