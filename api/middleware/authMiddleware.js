import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';
import User from '../models/userModel.js';

export const authenticate = async (req, res, next) => {
    const token = req.cookies.access_token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return next(errorHandler(401, 'Access denied. No token provided.'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        next(errorHandler(400, 'Invalid token.'));
    }
};


