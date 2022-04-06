const { Pool } = require("pg");

const pool = new Pool({
  user: "gqladmin",
  host: "localhost",
  database: "gqltest",
  password: "root",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
