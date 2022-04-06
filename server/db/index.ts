import postres = require("pg");

const pool = new postres.Pool({
  user: "gqladmin",
  host: "localhost",
  database: "gqltest",
  password: "root",
  port: 5432,
});

export = {
  query: (text, params?) => pool.query(text, params),
};
