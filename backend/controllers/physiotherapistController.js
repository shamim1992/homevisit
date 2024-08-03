import Order from '../models/Order.js';
import User from '../models/User.js';

export const getAssignedServices = async (req, res) => {
  try {
    const orders = await Order.find({ assignedPhysiotherapist: req.user._id })
      .populate('services')
      .populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateServiceStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.assignedPhysiotherapist.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    order.status = req.body.status || order.status;
    if (req.body.status === 'approved') {
      order.startSession = req.body.startSession || new Date();
      order.endSession = req.body.endSession || null;
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: 'user' }).select('-password');
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Order.find({ 
      assignedPhysiotherapist: req.user._id, 
      status: 'approved' 
    }).populate('user', 'name email')
      .populate('services', 'name description');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updatePatientDetails = async (req, res) => {
  try {
    const patient = await User.findById(req.params.id);

    if (!patient || patient.role !== 'user') {
      return res.status(404).json({ message: 'Patient not found' });
    }

    patient.name = req.body.name || patient.name;
    patient.email = req.body.email || patient.email;

    const updatedPatient = await patient.save();
    res.json({
      _id: updatedPatient._id,
      name: updatedPatient.name,
      email: updatedPatient.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getPatientDetails = async (req, res) => {
  try {
    const patient = await User.findById(req.params.id).select('-password');
    if (!patient || patient.role !== 'user') {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Order.find({
      user: req.params.id,
      assignedPhysiotherapist: req.user._id
    }).populate('services', 'name description');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};