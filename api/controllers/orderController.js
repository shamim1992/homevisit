// controllers/orderController.js
import Order from '../models/orderModel.js';
import { errorHandler } from '../utils/error.js';
import User from '../models/userModel.js';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';

// export const createOrder = async (req, res) => {
//     const { patientname, services, physiotherapist, address, pin, preferredDate, mobile, referredDoctor } = req.body;
//     const userId = req.user.id;
//     console.log(req.body)

//     try {
//         const order = new Order({
//             user: userId,
//             patientname, 
//             services,
//             physiotherapist,
//             status: 'pending', 
//             address,
//             pin, 
//             preferredDate,
//             mobile,
//             referredDoctor,
//             prescription: req.file ? req.file.filename : null, 
//         });

//         await order.save();

//         res.status(201).json(order);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to book appointment' });
//     }
// };




export const createOrder = async (req, res) => {
    const { patientname, services, physiotherapist, address, pin, preferredDate, mobile, referredDoctor } = req.body;
    const userId = req.user.id;

    try {
        // Create new order
        const order = new Order({
            user: userId,
            patientname,
            services,
            physiotherapist,
            status: 'pending',
            address,
            pin,
            preferredDate,
            mobile,
            referredDoctor,
            prescription: req.file ? req.file.filename : null,
        });

        await order.save();

        // Set up Nodemailer Transport
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use any SMTP service like Gmail, Outlook, etc.
            auth: {
                user: process.env.EMAIL_USER, // Use environment variables to store email credentials
                pass: process.env.EMAIL_PASS,
            },
        });

        // Define email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.user.email,
            // cc: process.env.CC_EMAIL,
            subject: 'Order Confirmation',
            text: `Dear ${patientname},
Thank you for booking an appointment.
Here are your order details:
- Services: ${services.join(', ')}
- Physiotherapist: ${physiotherapist ? physiotherapist.name : 'Not Assigned Yet'}
- Address: ${address}
- Mobile: ${mobile}
- Preferred Date: ${new Date(preferredDate).toLocaleDateString()}
- Pin Code: ${pin}

We will notify you once your order is processed.

Best regards,
Your Company`,
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
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

export const service_area = async (req, res) => {
    try {
        const physiotherapists = await User.find({ role: 'physiotherapist' }, 'serviceAreas');
        // Flattening the array of arrays and removing duplicates
        const allServiceAreas = physiotherapists
            .flatMap(physio => physio.serviceAreas)
            .filter((value, index, self) => self.indexOf(value) === index);

        res.status(200).json(allServiceAreas);
    } catch (error) {
        res.status(500).json({ message: 'Server error, could not fetch service areas.' });
    }
}

export const addSessionToOrder = async (req, res) => {
    const { orderId, sessionStart, sessionEnd, status } = req.body;

    try {
        // Find the order by ID
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Create a new session object
        const newSession = {
            sessionStart,
            sessionEnd,
            status,
        };

        // Add the session to the order
        order.sessions.push(newSession);
        await order.save();

        res.status(201).json({ message: 'Session added successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add session', error: error.message });
    }
};

export const updateSession = async (req, res) => {
    const { orderId, sessionIndex, sessionStart, sessionEnd, status } = req.body;
    console.log(req.body)
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (sessionIndex < 0 || sessionIndex >= order.sessions.length) {
            return res.status(400).json({ message: 'Invalid session index' });
        }

        const session = order.sessions[sessionIndex];
        session.sessionStart = sessionStart || session.sessionStart;
        session.sessionEnd = sessionEnd || session.sessionEnd;
        session.status = status || session.status;

        if (status === 'completed' && order.completedSessions < order.totalSessions) {
            order.completedSessions += 1;
        }

        if (order.completedSessions === order.totalSessions) {
            order.status = 'completed';
        }

        await order.save();
        res.status(200).json({ message: 'Session updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update session', error: error.message });
    }
};

// export const updateSession = async (req, res) => {
//     const { orderId, sessionId, sessionStart, sessionEnd, status } = req.body;

//     try {
//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         const session = order.sessions.id(sessionId);
//         if (!session) {
//             return res.status(404).json({ message: 'Session not found' });
//         }

//         // Update session details
//         session.sessionStart = sessionStart || session.sessionStart;
//         session.sessionEnd = sessionEnd || session.sessionEnd;
//         session.status = status || session.status;

//         await order.save();
//         res.status(200).json({ message: 'Session updated successfully', order });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to update session', error: error.message });
//     }
// };

export const deleteSessionFromOrder = async (req, res) => {
    const { orderId, sessionId } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Remove session by ID
        order.sessions = order.sessions.filter(session => session._id.toString() !== sessionId);
        await order.save();

        res.status(200).json({ message: 'Session deleted successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete session', error: error.message });
    }
};


export const updatePaymentStatus = async (req, res) => {
    const { orderId, status, paymentMethod, paymentDetails } = req.body;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update payment status
        order.paymentStatus = status; // 'paid' or 'failed'
        order.paymentMethod = paymentMethod;
        order.paymentDetails = paymentDetails; // Additional payment data if available

        await order.save();

        res.status(200).json({ message: 'Payment status updated', order });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update payment status' });
    }
};

// In your controller (orderController.js)
export const initiatePayment = async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Integrate with payment gateway (e.g., Stripe, Razorpay)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: order.totalAmount * 100, // amount in cents
            currency: 'usd',
            payment_method_types: ['card'],
            metadata: {
                order_id: order._id,
            },
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment initiation failed' });
    }
};
