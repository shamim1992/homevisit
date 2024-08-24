import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import Service from '../models/serviceModel.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const addPhysiotherapist = async (req, res) => {
    const { name, email, password, username, address, phone, dateOfBirth, serviceAreas, state, district, city } = req.body;

    try {
        // Check if the email or username is already taken
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already in use' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new physiotherapist
        const newPhysiotherapist = new User({
            name,
            email,
            password: hashedPassword,
            username,
            address,
            phone,
            dateOfBirth,
            serviceAreas,
            role: 'physiotherapist',
            state,
            district,
            city
        });

        // Save the physiotherapist to the database
        await newPhysiotherapist.save();

        res.status(201).json({ message: 'Physiotherapist added successfully', physiotherapist: newPhysiotherapist });
    } catch (error) {
        console.error('Error adding physiotherapist:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Admin login
export const adminLogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const admin = await User.findOne({ email, role: 'admin' });
        if (!admin) return next(errorHandler(401, 'Invalid credentials'));

        const isMatch = bcryptjs.compareSync(password, admin.password);
        if (!isMatch) return next(errorHandler(401, 'Invalid credentials'));

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200)
            .cookie('access_token', token, { httpOnly: true })
            .json({ email: admin.email, name: admin.name, role: admin.role });
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};

// View all users (including physiotherapists)
export const viewUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};

// View all orders
export const viewOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate('user')
            .populate('services')
            .populate('physiotherapist');
        res.status(200).json(orders);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};

// Update user profile
export const updateUserProfile = async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
        res.status(200).json(updatedUser);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};

// Manage services
export const manageServices = async (req, res, next) => {
    const { name, price, description, thumbnail } = req.body;

    try {
        const newService = new Service({ name, price, description, thumbnail });
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};

// Assign order to physiotherapist based on pin code
export const assignOrderToPhysioByPin = async (req, res, next) => {
    const { id } = req.params; // order ID
    const { physioId } = req.body; // User-provided pin code


    try {
        // Find physiotherapists who serve the given pin code
        const availablePhysios = await User.find({
            role: 'physiotherapist',
            // serviceAreas: pinCode
        });

        if (availablePhysios.length === 0) {
            return next(errorHandler(404, 'No physiotherapists available in this area'));
        }

        // Logic to assign a physiotherapist (e.g., based on availability or manual selection by admin)
        // For example, let's just assign the first one available
        // const physioId = availablePhysios[0]._id;

        const order = await Order.findByIdAndUpdate(id, {
            physiotherapist: physioId
        }, { new: true }).populate('physiotherapist');

        if (!order) {
            return next(errorHandler(404, 'Order not found'));
        }

        res.status(200).json(order);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};




// View all physiotherapists
export const viewPhysiotherapists = async (req, res, next) => {
    try {
        const physiotherapists = await User.find({ role: 'physiotherapist' });
        res.status(200).json(physiotherapists);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};

export const editRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user role', error });
    }
}

// delete user

export const deleteUser = async (req, res) => {
    console.log(req.params.id); // Log the ID being deleted
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error:', error); // Log any errors
        res.status(500).json({ message: 'Error deleting user', error });
    }
};