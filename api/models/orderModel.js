import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    sessionStart: { type: Date, required: false },
    sessionEnd: { type: Date, required: false },
    status: { type: String, enum: ['scheduled', 'in-progress', 'completed', 'canceled'], default: 'scheduled' },
});

const orderSchema = new mongoose.Schema(
    {
        patientname: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }],
        physiotherapist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['pending', 'approved', 'disapproved', 'completed'], default: 'pending' },
        address: { type: String },
        pin: { type: String },
        mobile: { type: String },
        preferredDate: { type: Date },
        totalSessions: { type: Number, },
        completedSessions: { type: Number, default: 0 },
        sessions: [sessionSchema],
        prescription: { type: String },
        referredDoctor: { type: String },
        totalAmount:{ type: Number},
        paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
        paymentMethod: { type: String, default: 'cash' }, // 'cash', 'card', 'online'
        paymentDetails: { type: Object },
    },
    { timestamps: true }
);

export default mongoose.model('Order', orderSchema);