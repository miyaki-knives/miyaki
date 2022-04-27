// backend
// create pool allowing use of queries to access db
const { Pool } = require('pg');
const PG_URI =
  'postgres://lnuxytew:4bu8l-UEm00Uk5MoEvG4J9CT-W2XL3pm@isilo.db.elephantsql.com/lnuxytew';

// initate new pool
const pool = new Pool({
  connectionString: PG_URI,
});

//export pool
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
