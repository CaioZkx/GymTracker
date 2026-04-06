const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gym",
  password: "4436",
  port: 5432,
});

module.exports = pool;