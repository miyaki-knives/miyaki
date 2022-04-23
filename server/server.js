// import and require all controllers, port initialization, paths, and app(express)
const path = require('path');
const express = require('express');
const PORT = 3000;
<<<<<<< HEAD
const customerController = require('./customerController.js');
const knifeController = require('./knifeController.js');

=======
// const customerController = require('./controllers/customerController.js');
const knifeController = require('./controllers/knifeController.js');
>>>>>>> main
// invoke express
const app = express();

// parse request body using express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) =>
    res.status(200).sendFile(path.join(__dirname, '../build/index.html'))
  );
}

// handles routing
const appRouter = express.Router();
app.use('/knives', appRouter);
app.use('/customers', appRouter);
// app.use('/cart', appRouter);

// routers
appRouter.get('/knives', knifeController.getAllKnives, (req, res) => {
  return res.status(200).json(res.locals.knives);
});

appRouter.post('/knives/addKnife', knifeController.createKnife, (req, res) => {
  return res.status(200).json(res.locals.addedKnife);
});

appRouter.delete('/knives/:id', knifeController.deleteKnife, (req, res) => {
  return res.status(200).json(res.locals.deletedKnife);
});

appRouter.put('/knives/:id', knifeController.updateKnife, (req, res) => {
  return res.status(200).json(res.locals.updatedKnife);
});

// appRouter.get('/customers', customerController, (req, res) => {
//   return res.status(200).json(res.locals.customers);
// });

// appRouter.post('/customers/addCustomer', customerController, (req, res) => {
//   return res.status(200).json(res.locals.addedCustomer);
// })

// appRouter.delete('/customers/deleteCustomer', customerController, (req, res) => {
//   return res.status(200).json(res.locals.deletedCustomer);
// });

// appRouter.put('customers/updatedCustomer', customerController, (req, res) => {
//   return res.status(200).json(res.locals.updatedCustomer);
// });


// catch-all router handler for any request to an unknown route
app.use('*', (req, res) => {
  return res.status(404).send('ERROR, ROUTE NOT FOUND');
})

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

app.listen(PORT, () =>{
  console.log(`Server listening on port: ${PORT}`);
});

// export app module
module.exports = app;
