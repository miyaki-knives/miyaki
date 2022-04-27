const db = require('../models/models');

const customerController = {};

customerController.createCustomer = (req, res, next) => {
	const { user, password } = req.body;
	let isAdmin = false;

	db.query('INSERT INTO customers VALUES (DEFAULT, $1, $2, $3) RETURNING *', [
		user,
		password,
		isAdmin,
	])
		.then((data) => {
			res.locals.addedCustomer = data.rows;
			return next();
		})
		.catch((err) =>
			next({
				log: 'customerController.createCustomer',
				message: { err: err },
			})
		);
};

customerController.deleteCustomer = (req, res, next) => {
	const { customer_id } = req.params;
	db.query('DELETE FROM customers WHERE customer_id = $1 RETURNING *', [
		customer_id,
	])
		.then((data) => {
			res.locals.deletedCustomer = data.rows;
			return next();
		})
		.catch((err) =>
			next({
				log: 'customerController.deleteCustomer',
				message: { err: err },
			})
		);
};

customerController.updateCustomer = (req, res, next) => {
	const { username } = req.params;
	const { password } = req.body;
	db.query(
		'UPDATE customers SET password = $1 WHERE username = $2 RETURNING *',
		[password, username]
	)
		.then((data) => {
			res.locals.updatedCustomer = data.rows;
			return next();
		})
		.catch((err) =>
			next({
				log: 'customerController.updateCustomer',
				message: { err: err },
			})
		);
};

customerController.getCustomer = (req, res, next) => {
	const queryStr = 'SELECT * FROM customers WHERE customer_id = $1';
	const { customer_id } = req.params;
	db.query(queryStr, [customer_id])
		.then((data) => {
			res.locals.customer = data.rows;
			return next();
		})
		.catch((err) =>
			next({
				log: 'customerController.getCustomer',
				message: { err: err },
			})
		);
};

customerController.login = (req, res, next) => {
	const queryStr = 'SELECT * FROM customers WHERE username = $1';
	const { username, password } = req.body;
	// console.log('req.body:  ', req.body);
	db.query(queryStr, [username])
		.then((data) => {
			if (password !== data.rows[0].password) {
				res.locals.authentication = {
					username: null,
					message: 'Your password is invalid',
					isAdmin: false,
				};
				return next();
			}
			res.locals.authentication = {
				id: data.rows[0].customer_id,
				username: data.rows[0].username,
				message: 'You are logged in',
				isAdmin: false,
			};
			if (data.rows[0].is_admin === true) {
				res.locals.authentication.isAdmin = true;
			}
			console.log(data.rows);
			return next();
		})
		.catch((err) =>
			next({
				log: 'customerController.getCustomer',
				message: { err: err },
			})
		);
};

module.exports = customerController;
