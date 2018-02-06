const Joi = require(`joi`);
// Joi.objectId = require(`joi-objectid`)(Joi);
//
// const {ObjectId} = require(`mongoose`).Schema.Types;

const schema = {

  volunteerId: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  userId: {
    type: String,
    required: true,
    validation: Joi.string()
  },




};

module.exports = {schema};
