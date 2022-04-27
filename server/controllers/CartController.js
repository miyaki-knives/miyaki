const db = require('../models/models');

const cartController = {};

cartController.addToCart = (req, res, next) => {
	console.log('req.body: ', req.body);
	const { knife_id, quantity, userID } = req.body;
	db.query('INSERT INTO carts VALUES (DEFAULT, $1, $2, $3) RETURNING *', [
		knife_id,
		quantity,
		userID,
	])
		.then((data) => {
			console.log('DATA:  ', data);
			res.locals.addedItem = data.rows[0];
			return next();
		})
		.catch((err) =>
			next({
				log: 'cartController.addToCart',
				message: { err: err },
			})
		);
};

cartController.getCart = (req, res, next) => {
	console.log(req.body);
	// need to write this function to send cart to frontend
};

module.exports = cartController;
