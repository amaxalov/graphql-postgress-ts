/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns("spells", {learned: { type: "boolean", notNull: true, default: false }})
};

exports.down = pgm => {
    pgm.dropColumns("spells", ['learned'])
};
