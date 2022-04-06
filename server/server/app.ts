import express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("../schema/schema");
const db = require("../db");

const app = express();
const PORT = 3300;

app
  .listen(PORT, () => {
    console.log("Server started");
  })
  .on("error", (err) => {
    console.log(err);
  });

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/:id", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM spells");
  res.send(rows[0]);
});
