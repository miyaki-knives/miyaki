// import and require all controllers, port initialization, paths, and app(express)
const path = require('path');
const express = require('express');
const PORT = 3000;
const customerController = require('./controllers/customerController');
const knifeController = require('./controllers/knifeController');
const cartController = require('./controllers/CartController');
// invoke express
const app = express();

// parse request body using express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) =>
	res.status(200).sendFile(path.join(__dirname, '../build/index.html'))
);

// app.post('/api', (req, res) => {
//   res.status(200).json({isLogged=In: true})
// })
// handles routing
const appRouter = express.Router();

appRouter.post('/cart/addToCart', cartController.addToCart, (req, res) => {
	console.log('res.locals.added: ', res.locals.addedItem);
	return res.status(200).json(res.locals.addedItem);
}),
	// routers
	appRouter.get('/knives', knifeController.getAllKnives, (req, res) => {
		return res.status(200).json(res.locals.knives);
	});

appRouter.post('/knives/addKnife', knifeController.createKnife, (req, res) => {
	return res.status(200).json(res.locals.addedKnife);
});

appRouter.delete(
	'/knives/:knife_id',
	knifeController.deleteKnife,
	(req, res) => {
		return res.status(200).json(res.locals.deletedKnife);
	}
);

appRouter.put('/knives/:knife_id', knifeController.updateKnife, (req, res) => {
	return res.status(200).json(res.locals.updatedKnife);
});

appRouter.get(
	'/customers/:customer_id',
	customerController.getCustomer,
	(req, res) => {
		return res.status(200).json(res.locals.customer);
	}
);
//
appRouter.post(
	'/customers/addCustomer',
	customerController.createCustomer,
	customerController.login,
	(req, res) => {
		return res.status(200).json(res.locals.authentication);
	}
);
//
appRouter.post('/customers/login', customerController.login, (req, res) => {
	return res.status(200).json(res.locals.authentication);
});

appRouter.delete(
	'/customers/:customer_id',
	customerController.deleteCustomer,
	(req, res) => {
		return res.status(200).json(res.locals.deletedCustomer);
	}
);

appRouter.put(
	'/customers/:customer_id',
	customerController.updateCustomer,
	(req, res) => {
		return res.status(200).json(res.locals.updatedCustomer);
	}
);

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
