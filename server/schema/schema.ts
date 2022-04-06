import graphql = require("graphql");
const db = require("../db");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = graphql;

const SpellType = new GraphQLObjectType({
  name: "Spell",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    learned: { type: new GraphQLNonNull(GraphQLBoolean) },
    mage: {
      type: MageType,
      resolve: async ({ mage_id }) => {
        const result = await db.query("SELECT * FROM mages WHERE id = $1", [
          mage_id,
        ]);
        return result.rows[0];
      },
    },
  }),
});

const MageType = new GraphQLObjectType({
  name: "Mage",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    spells: {
      type: new GraphQLList(SpellType),
      resolve: async ({ id }) => {
        const result = await db.query("SELECT * FROM spells WHERE id = $1", [
          id,
        ]);

        return result.rows;
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMage: {
      type: MageType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (_, { name, age }) => {
        const result = await db.query(
          "INSERT INTO mages (name, age) VALUES ($1, $2) RETURNING *",
          [name, age]
        );
        return result.rows[0];
      },
    },
    addSpell: {
      type: SpellType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        learned: { type: new GraphQLNonNull(GraphQLBoolean) },
        mageId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (_, { name, learned, mageId }) => {
        const result = await db.query(
          "INSERT INTO spells (name, learned, mage_id) VALUES ($1, $2, $3) RETURNING *",
          [name, learned, mageId]
        );
        return result.rows[0];
      },
    },
    deleteMage: {
      type: MageType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: async (_, { id }) => {
        const result = await db.query(
          "DELETE FROM mages WHERE id=$1 RETURNING *",
          [id]
        );
        return result.rows[0];
      },
    },
    deleteSpell: {
      type: SpellType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: async (_, { id }) => {
        const result = await db.query(
          "DELETE FROM spells WHERE id=$1 RETURNING *",
          [id]
        );
        return result.rows[0];
      },
    },
    updateMage: {
      type: MageType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (_, { id, name, age }) => {
        const result = await db.query(
          "UPDATE mages SET name=$2, age=$3 WHERE id=$1 RETURNING *",
          [id, name, age]
        );
        return result.rows[0];
      },
    },
    updateSpell: {
      type: SpellType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        learned: { type: new GraphQLNonNull(GraphQLBoolean) },
        mageId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (_, { id, name, learned, mageId }) => {
        const result = await db.query(
          "UPDATE spells SET name=$2,learned=$3,mage_id=$4 WHERE id=$1 RETURNING *",
          [id, name, learned, mageId]
        );
        return result.rows[0];
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    spell: {
      type: SpellType,
      args: { id: { type: GraphQLID } },
      resolve: async (_, { id }) => {
        const result = await db.query("SELECT * FROM spells WHERE id = $1", [
          id,
        ]);
        return result.rows[0];
      },
    },
    mage: {
      type: MageType,
      args: { id: { type: GraphQLID } },
      resolve: async (_, { id }) => {
        const result = await db.query("SELECT * FROM mages WHERE id = $1", [
          id,
        ]);
        return result.rows[0];
      },
    },
    spells: {
      type: new GraphQLList(SpellType),
      resolve: async () => {
        const result = await db.query("SELECT * FROM spells");
        return result.rows;
      },
    },
    mages: {
      type: new GraphQLList(MageType),
      resolve: async () => {
        const result = await db.query("SELECT * FROM mages");
        return result.rows;
      },
    },
  },
});

export = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
