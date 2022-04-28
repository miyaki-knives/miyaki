const db = require('../models/models');

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
	// find user data in db
	const queryStr = 'SELECT * FROM customers WHERE username = $1';
	const { user } = req.body;

	// find userid and store in a cookie
	db.query(queryStr, [user])
		.then((data) => {
			// res.cookie(`${user}`, data.rows[0].customer_id, {
			res.cookie(`ssid`, data.rows[0].customer_id, {
				// 24 hours
				maxAge: 1000 * 60 * 60 * 24,
				secure: true,
				httpOnly: true,
			});
			console.log('cookie was created');
			// console.log(data.rows[0].customer_id);
			// console.log('Cookies: ', req.cookies);
			// does not show console logs when making requests in postman - why???
			return next();
		})
		.catch((err) =>
			next({
				log: 'cookieController.setCookie',
				message: { err: err },
			})
		);
};

// check if cookie exists, if it does send that cookie exists in response
// have frontend fetch this response and render page appropriately
cookieController.confirmCookie = (req, res, next) => {
	console.log(req.cookies);
	if (req.cookies.ssid) {
		res.locals.confirmCookie = { status: true, cookie: req.cookies };
	} else {
		res.locals.confirmCookie = false;
	}
	return next();
};

module.exports = cookieController;
