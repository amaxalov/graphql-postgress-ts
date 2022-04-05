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
} = graphql;

const SpellType = new GraphQLObjectType({
  name: "Spell",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    mage: {
      type: MageType,
      resolve: async (parent) => {
        const result = await db.query("SELECT * FROM mages WHERE id = $1", [
          parent.mage_id,
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
      resolve: async (parent) => {
        const result = await db.query("SELECT * FROM spells WHERE id = $1", [
          parent.id,
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
      resolve: async (_, args) => {
        const result = await db.query(
          "INSERT INTO mages (name, age) VALUES ($1, $2) RETURNING *",
          [args.name, args.age]
        );
        return result.rows[0];
      },
    },
    addSpell: {
      type: SpellType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        mageId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (_, args) => {
        const result = await db.query(
          "INSERT INTO spells (name, mage_id) VALUES ($1, $2) RETURNING *",
          [args.name, args.mageId]
        );
        return result.rows[0];
      },
    },
    deleteMage: {
      type: MageType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: async (_, args) => {
        const result = await db.query(
          "DELETE FROM mages WHERE id=$1 RETURNING *",
          [args.id]
        );
        return result.rows[0];
      },
    },
    deleteSpell: {
      type: SpellType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: async (_, args) => {
        const result = await db.query(
          "DELETE FROM spells WHERE id=$1 RETURNING *",
          [args.id]
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
      resolve: async (_, args) => {
        console.log(args);
        const result = await db.query(
          "UPDATE mages SET name=$2, age=$3 WHERE id=$1 RETURNING *",
          [args.id, args.name, args.age]
        );
        return result.rows[0];
      },
    },
    updateSpell: {
      type: SpellType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        mageId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (_, args) => {
        const result = await db.query(
          "UPDATE spells SET name=$2,mage_id=$3 WHERE id=$1 RETURNING *",
          [args.id, args.name, args.mageId]
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
      resolve: async (_, args) => {
        const result = await db.query("SELECT * FROM spells WHERE id = $1", [
          args.id,
        ]);
        return result.rows[0];
      },
    },
    mage: {
      type: MageType,
      args: { id: { type: GraphQLID } },
      resolve: async (_, args) => {
        const result = db.query("SELECT * FROM mages WHERE id = $1", [args.id]);
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
        const result = db.query("SELECT * FROM mages");
        return result.rows;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
