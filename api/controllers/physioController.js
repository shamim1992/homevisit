// controllers/physioController.js
import Application from '../models/applicationModel.js';
import Order from '../models/orderModel.js';
import Physiotherapist from '../models/physioModel.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Physiotherapist login
export const physioLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const physio = await Physiotherapist.findOne({ email });
        if (!physio) return next(errorHandler(401, 'Invalid credentials'));

        const isMatch = bcryptjs.compareSync(password, physio.password);
        if (!isMatch) return next(errorHandler(401, 'Invalid credentials'));

        const token = jwt.sign({ id: physio._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).cookie('access_token', token, { httpOnly: true }).json({ email: physio.email, name: physio.name });
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};
// View assigned orders
export const viewAssignedOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ physiotherapist: req.user._id }).populate('user', 'name email').populate('services', 'name price');
        res.status(200).json(orders);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};
// Approve/disapprove service
export const approveDisapproveService = async (req, res, next) => {
    const { id } = req.params; // order ID
    const { status } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};
// Manage session details
export const manageSessionDetails = async (req, res, next) => {
    const { id } = req.params; // order ID
    const { sessionStart, sessionEnd } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, { sessionStart, sessionEnd }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};
// View appointments (assuming appointments are part of the order or separate collection)
export const viewAppointments = async (req, res, next) => {
    try {
        // const appointments = await Order.find({ physiotherapist: req.user._id }).select('sessionStart sessionEnd user').populate('services user physiotherapist');
        const appointments =   await Order.find({ physiotherapist: req.user._id })
        .populate('user', 'name')
        .populate('services', 'name')
        .populate('physiotherapist', 'name');
        res.status(200).json(appointments);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};
export const startSession = async (req, res) => {
    try {
        const session = await Order.findByIdAndUpdate(
            req.params.id,
            { status: 'in-progress', sessionStart: Date.now() },
            { new: true }
        );
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: 'Failed to start session' });
    }
};
export const endSession = async (req, res) => {
    try {
        const session = await Order.findByIdAndUpdate(
            req.params.id,
            { status: 'completed', sessionEnd: Date.now() },
            { new: true }
        );
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: 'Failed to end session' });
    }
};

export const createApplication = async (req, res) => {
    try {
        const application = new Application({ 
            name: req.body.name,
            username: req.body.username,
            contact: req.body.contact,
            email: req.body.email,
            dob: req.body.dob,
            qualification: req.body.qualification,
            experience: req.body.experience,
            address: req.body.address,
            resume: req.file ? req.body.resume : null,
            certificate: req.file ? req.body.certificate : null,
         });
        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create application' });
    }
};

export const viewApplications = async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to view applications' });
    }
}
