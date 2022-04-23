// backend
// create pool allowing use of queries to access db
const { Pool } = require('pg');
const PG_URI =
  'postgres://rrhtblrt:TC75Dx_XjsoqG5tNptnv_Tr9BNZJ3W0f@isilo.db.elephantsql.com/rrhtblrt';

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
