import Service from '../models/serviceModel.js';
import { errorHandler } from '../utils/error.js';
export const addService = async (req, res, next) => {
    const { name, price, description } = req.body;

    try {
        const newService = new Service({ name, price, description });
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};
export const updateService = async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedService = await Service.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(updatedService);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};
export const deleteService = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Service.findByIdAndDelete(id);
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};
export const getService = async (req, res, next) => {
    const { id } = req.params;

    try {
        const service = await Service.findById(id);
        res.status(200).json(service);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};
export const getAllServices = async (req, res, next) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};
