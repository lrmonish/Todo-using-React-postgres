const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TODO',
  password: '61232332',
  port: 5432, 
});

module.exports = pool;
