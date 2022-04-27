const db = require('../models/models');

const cartController = {};

cartController.addToCart = (req, res, next) => {
	console.log('req.body: ', req.body);
	const { userID, knife_id, quantity } = req.body;
	knife_id = Number(knife_id);
	db.query('INSERT INTO cart VALUES (DEFAULT, $1, $2, $3) RETURNING *', [
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
};

module.exports = cartController;
