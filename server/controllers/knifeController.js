const db = require('../models/models');

const knifeController = {};

knifeController.getAllKnives = (req, res, next) => {
    const queryStr = 'SELECT * FROM knives;';

    db.query(queryStr)
      .then((data) => {
        res.locals.knives = data.rows;
        return next();
      })
      .catch((err) => 
        next({
          log: 'knifeController.getAllKnives',
          message: {err: err}
        })
      );
};

knifeController.createKnife = (req, res, next) => {
  const { name, length, steel_type, price, type, img, hrc, bevel } = req.body;
  db.query('INSERT INTO knives VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [name, length, steel_type, price, type, img, hrc, bevel])
    .then((data) => {
      res.locals.addedKnife = data.rows; 
      return next();
    })
    .catch((err) => 
      next({
        log: 'knifeController.createKnife',
        message: {err: err}
      })
    );
};

knifeController.deleteKnife = (req, res, next) => {
  const { id } = req.params;
  db.query('DELETE FROM knives WHERE id = $1 RETURNING *', [id])
  .then((data) => {
    console.log(data);
    res.locals.deletedKnife = data.rows; 
    return next();
  })
  .catch((err) => 
    next({
      log: 'knifeController.deleteKnife',
      message: {err: err}
    })
  );
}

knifeController.updateKnife = (req, res, next) => {
  const { id } = req.params;
  const { newPrice } = req.body;
  db.query('UPDATE knives SET price = $1 WHERE id = $2 RETURNING *', [newPrice, id])
  .then(data => {
    res.locals.updatedKnife = data.rows;
    return next();
  })
  .catch((err) => 
  next({
    log: 'knifeController.updateKnife',
    message: {err: err}
  })
);
}

module.exports = knifeController;