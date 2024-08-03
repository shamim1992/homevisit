import Service from '../models/Service.js';

export const getServices = async (req, res) => {
  const services = await Service.find({});
  res.json(services);
};

export const getServiceById = async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (service) {
    res.json(service);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
};

export const createService = async (req, res) => {
  const { name, price, description } = req.body;

  const service = new Service({
    name,
    price,
    description,
  });

  const createdService = await service.save();
  res.status(201).json(createdService);
};

export const updateService = async (req, res) => {
  const { name, price, description, isApproved } = req.body;

  const service = await Service.findById(req.params.id);

  if (service) {
    service.name = name;
    service.price = price;
    service.description = description;
    service.isApproved = isApproved;

    const updatedService = await service.save();
    res.json(updatedService);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
};

export const deleteService = async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    await service.remove();
    res.json({ message: 'Service removed' });
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
};