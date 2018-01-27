const Joi = require(`joi`);
// Joi.objectId = require(`joi-objectid`)(Joi);
//
// const {ObjectId} = require(`mongoose`).Schema.Types;

const schema = {

  name: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  description: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  date: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  location: {
    type: String,
    required: true,
    validation: Joi.string()
  },

};

module.exports = {schema};
