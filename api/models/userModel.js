// models/userModel.js
import mongoose from 'mongoose';

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
    state: { type: String,},
    district: { type: String},
    city: { type: String},
    serviceAreas: {
      type: [String],
      required: function() { return this.role === 'physiotherapist'; },
  },
    lastLogin: { type: Date },
    lastLogout: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;


