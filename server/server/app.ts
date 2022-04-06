import express = require("express");
import g = require("express-graphql");
import cors = require("cors");
import schema = require("../schema/schema");
import db = require("../db");

const app = express();
const PORT = 3300;

app
  .listen(PORT, () => {
    console.log("Server started");
  })
  .on("error", (err) => {
    console.log(err);
  });

app.use(cors());

app.use(
  "/graphql",
  g.graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/:id", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM spells");
  res.send(rows[0]);
});
