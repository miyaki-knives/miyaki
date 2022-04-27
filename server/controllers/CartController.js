const db = require('../models/models');

const cartController = {};

cartController.addToCart = (req, res, next) => {
	console.log('req.body: ', req.body);
	const { userID, knife_id, quantity } = req.body;
	knife_id_num = Number(knife_id);
	db.query('INSERT INTO carts VALUES (DEFAULT, $1, $2, $3) RETURNING *', [
		knife_id_num,
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
	const { id } = req.params;
	const queryStr = `SELECT c.*, k.name as name, k.price as price, k.img as image
	FROM carts c
	JOIN knives k
	ON c.knife_id = k.knife_id
	WHERE c.customer_id = $1
	`;
	db.query(queryStr, [id])
		.then((data) => {
			console.log(data);
			res.locals.cart = data.rows;
			next();
		})
		.catch((err) =>
			next({
				log: 'cartController.getCart',
				message: { err: err },
			})
		);
};

cartController.deleteFromCart = (req, res, next) => {
	const { user_id, knife_id } = req.body;

	db.query(
		'DELETE FROM carts WHERE customer_id = $1 and knife_id = $2 RETURNING *',
		[user_id, knife_id]
	)
		.then((data) => {
			console.log(data.rows);
			res.locals.deletedItems = data.rows;
			return next();
		})
		.catch((err) =>
			next({
				log: 'cartController.deleteFromCart',
				message: { err: err },
			})
		);
};

module.exports = cartController;
