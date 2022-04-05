/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("mages", {
    id: "id",
    name: { type: "varchar(20)", notNull: true },
    age: { type: "integer" }
  });
  pgm.createTable("spells", {
    id: "id",
    name: { type: "varchar(40)", notNull: true },
    mage_id: {
      type: "integer",
      notNull: true,
      references: '"mages"',
      onDelete: "cascade",
    },
  });
};

exports.down = (pgm) => {};
