const Joi = require(`joi`);
// Joi.objectId = require(`joi-objectid`)(Joi);
//
// const {ObjectId} = require(`mongoose`).Schema.Types;

const schema = {

  question: {
    type: String,
    required: true,
    validation: Joi.string()
  },

};

module.exports = {schema};
