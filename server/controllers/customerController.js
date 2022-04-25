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

customerController.deleteCustomer = (req, res, next) => {
  const { id } = req.params;
  db.query('DELETE FROM customer WHERE id = $1 RETURNING *', [id])
  .then((data) => {
    res.locals.deletedCustomer = data.rows; 
    return next();
  })
  .catch((err) => 
    next({
      log: 'customerController.deleteCustomer',
      message: {err: err}
    })
  );
}

customerController.updateCustomer = (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;
  db.query('UPDATE customer SET password = $1 WHERE id = $2 RETURNING *', [password, id])
  .then(data => {
    res.locals.updatedCustomer = data.rows;
    return next();
  })
  .catch((err) => 
  next({
    log: 'customerController.updateCustomer',
    message: {err: err}
  })
);
};

customerController.getCustomer = (req, res, next) => {
  const queryStr = 'SELECT * FROM customer WHERE id = $1';
  const { id } = req.params;
  db.query(queryStr, [id])
    .then((data) => {
      res.locals.customer = data.rows;
      return next();
    })
    .catch((err) => 
      next({
        log: 'customerController.getCustomer',
        message: {err: err}
      })
    );
};

// I'm in here too... just waiting for a fellow
// should we start at just reading the lis


module.exports = customerController;