import mongoose from 'mongoose';

const physioSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePhoto: { type: String },
}, { timestamps: true });

const Physiotherapist = mongoose.model('Physiotherapist', physioSchema);
export default Physiotherapist;
