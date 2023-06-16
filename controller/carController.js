const Car = require('../models/Car');

async function createCar(req, res) {
  try {
    const { make, model, year, mileage, price } = req.body;
    const car = await Car.create({ make, model, year, mileage, price });
    res.status(201).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create car', details: error.message });
  }
}

async function getCars(req, res) {
  try {
    const cars = await Car.find();
    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch cars', details: error.message });
  }
}

async function getCarById(req, res) {
  try {
    const carId = req.params.id;
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ success: false, error: 'Car not found' });
    }
    res.status(200).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch car', details: error.message });
  }
}

async function updateCar(req, res) {
  try {
    const carId = req.params.id;
    const { make, model, year, mileage, price } = req.body;

    const car = await Car.findByIdAndUpdate(
      carId,
      { make, model, year, mileage, price },
      { new: true }
    );

    if (!car) {
      return res.status(404).json({ success: false, error: 'Car not found' });
    }

    res.status(200).json({ success: true, data: car });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, error: 'Invalid car ID' });
    }
    res.status(500).json({ success: false, error: 'Failed to update car', details: error.message });
  }
}

async function deleteCar(req, res) {
  try {
    const carId = req.params.id;
    const car = await Car.findByIdAndDelete(carId);

    if (!car) {
      return res.status(404).json({ success: false, error: 'Car not found' });
    }

    res.status(200).json({ success: true, message: 'Car deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, error: 'Invalid car ID' });
    }
    res.status(500).json({ success: false, error: 'Failed to delete car', details: error.message });
  }
}

module.exports = {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar
};
