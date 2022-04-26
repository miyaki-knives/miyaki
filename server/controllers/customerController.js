const db = require('../models/models');

const customerController = {};

customerController.createCustomer = (req, res, next) => {
  const { user, password } = req.body;
  let isAdmin = false
  
  db.query('INSERT INTO customer VALUES (DEFAULT, $1, $2, $3) RETURNING *', [user, password, isAdmin])
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
  const { username } = req.params;
  const { isAdmin } = req.body;
  db.query('UPDATE customer SET password = $1 WHERE username = $2 RETURNING *', [isAdmin, username])
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
  const queryStr = 'SELECT * FROM customer WHERE username = $1';
  const { username } = req.params;
  db.query(queryStr, [username])
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

customerController.login = (req, res, next) => {
  const queryStr = 'SELECT * FROM customer WHERE username = $1';
  const { user, password } = req.body;
  // console.log('req.body:  ', req.body);
  db.query(queryStr, [user])
    .then((data) => {
      if (password !== data.rows[0].password) {
        res.locals.authentication = {
          username: null,
          message: 'Your password is invalid',
          isAdmin: false
        };
        return next();
      }
      res.locals.authentication = {
        id: data.rows[0].id,
        username: data.rows[0].username,
        message: 'You are logged in',
        isAdmin: false
      }
      if (data.rows[0].isAdmin === 'true'){
        res.locals.authentication.isAdmin = true;
      }
      console.log(data.rows)
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