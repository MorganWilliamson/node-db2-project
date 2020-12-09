const db = require('../../data/dbConfig');

module.exports = {
    getAll() {
        return db('cars');
    },
    getById(id) {
        return db('cars').where({ id }).first();
    },
    createCar(car) {
        return db('cars').insert(car)
            .then(([id]) => {
                return db('cars').where('id', id).first();
            });
    },
    updateCar(id, car) {
        return db('cars').where('id', id).update(car);
    },
    deleteCar(id) {
        return db('cars').where('id', id).del();
    }
};
