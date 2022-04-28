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
	const { id } = req.params;
	db.query('DELETE FROM customers WHERE customer_id = $1 RETURNING *', [id])
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
	const { isAdmin } = req.body;
	db.query(
		'UPDATE customers SET password = $1 WHERE username = $2 RETURNING *',
		[isAdmin, username]
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
	const queryStr = 'SELECT * FROM customers WHERE username = $1';
	const { username } = req.params;
	db.query(queryStr, [username])
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
	const { user, password } = req.body;
	// console.log('req.body:  ', req.body);
	db.query(queryStr, [user])
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
			// console.log(data.rows);
			return next();
		})
		.catch((err) =>
			next({
				log: 'customerController.getCustomer',
				message: { err: err },
			})
		);
};

customerController.logout = (req, res, next) => {
	const { user } = req.body;
	const queryStr = 'SELECT customer_id FROM customers WHERE username = $1';
	db.query(queryStr, [user])
		.then((data) => {
			// console.log(data.rows);
			// console.log(req.cookies);
			if (data.rows.customer_id == req.cookies[`${user}`]) {
				res.clearCookie(`${user}`);
				// console.log(req.cookies);
				console.log(`cookie ${user} was deleted`);
			}
			return next();
		})
		.catch((err) =>
			next({
				log: 'customerController.logout',
				message: { err: err },
			})
		);
};

module.exports = customerController;
