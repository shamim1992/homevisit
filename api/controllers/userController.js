import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
            token,
            password});

    } catch (error) {
        return next(errorHandler(500, error.message));
    }
};


export const userProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
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