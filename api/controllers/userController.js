import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export const userRegistration = async (req, res, next) => {
    const { name, email, password, address, phone, dateOfBirth, username } = req.body;
    console.log(req.body);
    try {
        if (!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === '') {
            return next(errorHandler(400, 'Invalid username or email'));
        }
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({
            username,
            name,
            email,
            password: hashedPassword,
            address,
            phone,
            dateOfBirth,
        });

        const savedUser = await newUser.save();
        const { password: pass, ...others } = savedUser._doc;

        res.status(201).json(others);
    } catch (error) {
        return next(errorHandler(400, error.message));
    }
};

export const userlogin = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return next(errorHandler(401, 'Invalid username or password'));
        }

        const isMatch = bcryptjs.compareSync(password, user.password);

        if (!isMatch) {
            return next(errorHandler(401, 'Invalid username or password'));
        }

        const token = jwt.sign({ id: user._id, role: user.role  }, process.env.JWT_SECRET, { expiresIn: '6h' });

        const { password: pass, ...others } = user._doc;

        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json({_id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role,
            token
            });

    } catch (error) {
        return next(errorHandler(500, error.message));
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
        const resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

        // Update the user document with the reset token and expiry
        user.resetPasswordToken = resetTokenHash;
        user.resetPasswordExpiry = resetTokenExpiry;
        await user.save();

        const resetURL = `${process.env.HOST_URL}/#/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const message = `You requested a password reset. Click the link below to reset your password: \n\n ${resetURL}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            text: message,
        });

        res.status(200).json({ message: 'Password reset link sent to email' });
    } catch (error) {
        console.error('Error sending reset email:', error);
        res.status(500).json({ message: 'Error sending reset email' });
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
        
        // Check if the token is valid and not expired
        const user = await User.findOne({
            resetPasswordToken: resetTokenHash,
            resetPasswordExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update the user's password and clear the reset token and expiry
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;

        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const userProfile = async (req, res, next) => {
    console.log(req.params.id)
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
}

export const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
}

export const changePassword = async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return next(errorHandler(400, 'Please provide both current and new passwords'));
    }

    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }

        const isMatch = bcryptjs.compareSync(currentPassword, user.password);

        if (!isMatch) {
            return next(errorHandler(401, 'Current password is incorrect'));
        }

        const hashedNewPassword = bcryptjs.hashSync(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        return next(errorHandler(500, error.message));
    }
};
