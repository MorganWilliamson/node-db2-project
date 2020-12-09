/// IMPORTS ///
const express = require('express');
const Car = require('./cars-model');
const router = express.Router();

/// MIDDLEWARE ///
const validateCarId = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        res.json({ message: "Car with the specified ID could not be found."});
    } else {
        next();
    }
};

/// ENDPOINTS ///
router.get('/', async (req, res) => {
    try {
        const data = await Car.getAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', validateCarId, async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.getById(id);
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', validateCarId, async (req, res) => {
    try {
        const info = req.body;
        const car = await Car.createCar(info);
        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', validateCarId, async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        await Car.updateCar(id, changes);
        const updated = await Car.getById(id);
        res.status(204).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', validateCarId, async (req, res) => {
    try {
        const { id } = req.params;
        await Car.deleteCar(id);
        res.json({ message: `Car with an ID of ${id} has been deleted.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
