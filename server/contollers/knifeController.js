const db = require('../models/models');

const knifeController = {};

knifeController.getAllKnives = (req, res, next) => {
    const queryStr = 'SELECT * FROM knives'
}