const Joi = require(`joi`);
// Joi.objectId = require(`joi-objectid`)(Joi);
//
// const {ObjectId} = require(`mongoose`).Schema.Types;

const schema = {

  userId: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  questionId: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  answer: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  motivation: {
    type: String,
    required: true,
    validation: Joi.string()
  },

};

module.exports = {schema};
