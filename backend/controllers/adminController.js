import User from '../models/User.js';
import Physiotherapist from '../models/Physiotherapist.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

export const addPhysiotherapist = async (req, res) => {
  const { name, email, password, specialization, experience } = req.body;

  const physiotherapistExists = await Physiotherapist.findOne({ email });

  if (physiotherapistExists) {
    res.status(400);
    throw new Error('Physiotherapist already exists');
  }

  const physiotherapist = await Physiotherapist.create({
    name,
    email,
    password,
    role: 'physiotherapist',
    specialization,
    experience,
  });

  if (physiotherapist) {
    res.status(201).json({
      _id: physiotherapist._id,
      name: physiotherapist.name,
      email: physiotherapist.email,
      role: physiotherapist.role,
      specialization: physiotherapist.specialization,
      experience: physiotherapist.experience,
    });
  } else {
    res.status(400);
    throw new Error('Invalid physiotherapist data');
  }
};

export const removePhysiotherapist = async (req, res) => {
  const physiotherapist = await Physiotherapist.findById(req.params.id);

  if (physiotherapist) {
    await physiotherapist.remove();
    res.json({ message: 'Physiotherapist removed' });
  } else {
    res.status(404);
    throw new Error('Physiotherapist not found');
  }
};

export const getAllPhysiotherapists = async (req, res) => {
  const physiotherapists = await Physiotherapist.find({});
  res.json(physiotherapists);
};