// models/userModel.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    address: { type: String },
    phone: { type: String },
    dateOfBirth: { type: Date },
    profilePhoto: { type: String }, // Assuming you will store the photo as a path to an image file
    role: { type: String, enum: ['user', 'admin', 'physiotherapist'], default: 'user' },
    state: { type: String, },
    district: { type: String },
    city: { type: String },
    serviceAreas: {
      type: [String],
      required: function () { return this.role === 'physiotherapist'; },
    },
    lastLogin: { type: Date },
    lastLogout: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// Instance method to check password
userSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);


