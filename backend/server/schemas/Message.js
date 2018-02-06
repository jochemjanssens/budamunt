const Joi = require(`joi`);
// Joi.objectId = require(`joi-objectid`)(Joi);
//
// const {ObjectId} = require(`mongoose`).Schema.Types;

const schema = {

  sendId: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  receiveId: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  content: {
    type: String,
    required: true,
    validation: Joi.string()
  },




};

module.exports = {schema};
