const Joi = require(`joi`);
// Joi.objectId = require(`joi-objectid`)(Joi);
//
// const {ObjectId} = require(`mongoose`).Schema.Types;

const schema = {

  payingId: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  payingName: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  receivingId: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  receivingName: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  munten: {
    type: String,
    required: true,
    validation: Joi.string()
  }
};

module.exports = {schema};
