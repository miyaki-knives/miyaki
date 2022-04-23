// import and require all controllers, port initialization, paths, and app(express)
const path = require('path');
const express = require('express');
const PORT = 3000;
const customerController = require('./customerController.js');
const knifeController = require('./knifeController.js');

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
// app.use('/knives', appRouter);
// app.use('/customers', appRouter);
// app.use('/cart', appRouter);

// routers

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

// export app module
module.exports = app;
