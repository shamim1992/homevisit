// controllers/orderController.js
import Order from '../models/orderModel.js';
import { errorHandler } from '../utils/error.js';


export const createOrder = async (req, res) => {
    const { services, date, physiotherapist, address, pin, preferredDate } = req.body;
    const userId = req.user.id;

    try {
        // Create a new order with the provided details
        const order = new Order({
            user: userId,
            services, // Assuming `services` is an array of ObjectId's
            date,
            physiotherapist,
            status: 'pending', // Default status
            address, // Address field
            pin, // Pin field
            preferredDate,
        });

        // Save the order to the database
        await order.save();

        // Return the created order as a response
        res.status(201).json(order);
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ error: 'Failed to book appointment' });
    }
};




// Get a user's orders (User)
export const getUserOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('services', 'name price').populate('physiotherapist', 'name');
        res.status(200).json(orders);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};

// Get a specific order (User/Admin)
export const getOrder = async (req, res, next) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id).populate('user', 'name email').populate('services', 'name price').populate('physiotherapist', 'name');
        res.status(200).json(order);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};

// Update an order (Admin)
export const updateOrder = async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('user', 'name email').populate('services', 'name price').populate('physiotherapist', 'name');
        res.status(200).json(orders);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};
