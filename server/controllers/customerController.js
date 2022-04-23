const db = require('../models/models');

const customerController = {};

customerController.createCustomer = (req, res, next) => {
  const { username, password, isAdmin } = req.body;
  db.query('INSERT INTO customer VALUES (DEFAULT, $1, $2, $3) RETURNING *', [username, password, isAdmin])
    .then((data) => {
      res.locals.addedCustomer = data.rows; 
      return next();
    })
    .catch((err) => 
      next({
        log: 'customerController.createCustomer',
        message: {err: err}
      })
    );
};




module.exports = customerController;