// import and require all controllers, port initialization, paths, and app(express)
const path = require('path');
const fs = require('fs');
const express = require('express');
const PORT = 3000;
const customerController = require('./controllers/customerController');
const knifeController = require('./controllers/knifeController');
const cartController = require('./controllers/CartController');
const cookieController = require('./controllers/cookieController');
const cookieParser = require('cookie-parser');
// invoke express
const app = express();
app.use(cookieParser());
// parse request body using express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '../build')));

// check if cookie exists at main endpoint
app.get('/', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});

app.get('/cookies', cookieController.confirmCookie, (req, res) => {
	res.status(200).json(res.locals.confirmCookie);
});
// cart endpoints:

// add to cart
app.post('/cart/addToCart', cartController.addToCart, (req, res) => {
	console.log('res.locals.added: ', res.locals.addedItem);
	return res.status(200).json(res.locals.addedItem);
});

// get cart
app.get('/cart/:id', cartController.getCart, (req, res) => {
	return res.status(200).json(res.locals.cart);
});

// delete item from cart
app.post('/cart/deleteFromCart', cartController.deleteFromCart, (req, res) => {
	return res.status(200).json(res.locals.deletedItems);
});

// knives endpoints
app.get('/knives', knifeController.getAllKnives, (req, res) => {
	return res.status(200).json(res.locals.knives);
});

app.post('/knives/addKnife', knifeController.createKnife, (req, res) => {
	return res.status(200).json(res.locals.addedKnife);
});

app.delete('/knives/:id', knifeController.deleteKnife, (req, res) => {
	return res.status(200).json(res.locals.deletedKnife);
});

app.put('/knives/:id', knifeController.updateKnife, (req, res) => {
	return res.status(200).json(res.locals.updatedKnife);
});

// customer endpoints
app.get('/customers/:username', customerController.getCustomer, (req, res) => {
	return res.status(200).json(res.locals.customer);
});

app.post(
	'/customers/addCustomer',
	customerController.createCustomer,
	customerController.login,
	cookieController.setCookie,
	(req, res) => {
		return res.status(200).json(res.locals.authentication);
	}
);
// user login endpoint
app.post(
	'/customers/login',
	customerController.login,
	cookieController.setCookie,
	(req, res) => {
		return res.status(200).json(res.locals.authentication);
	}
);

// user logout endpoint
app.post('/customers/logout', customerController.logout, (req, res) => {
	return res.end();
});

app.delete('/customers/:id', customerController.deleteCustomer, (req, res) => {
	return res.status(200).json(res.locals.deletedCustomer);
});

app.put('/customers/:id', customerController.updateCustomer, (req, res) => {
	return res.status(200).json(res.locals.updatedCustomer);
});

// catch-all router handler for any request to an unknown route
app.use('*', (req, res) => {
	return res.status(404).send('ERROR, ROUTE NOT FOUND');
});

// global error handling
app.use((err, req, res, next) => {
	const globalErr = {
		log: 'UNKNOWN MIDDLEWARE ERROR',
		status: 500,
		message: { err: 'ERROR' },
	};
	const errorObj = Object.assign({}, globalErr, err);
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});

// export app module
module.exports = app;
