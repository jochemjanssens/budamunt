const Joi = require(`joi`);
// Joi.objectId = require(`joi-objectid`)(Joi);
//
// const {ObjectId} = require(`mongoose`).Schema.Types;

const schema = {

  userId: {
    type: String,
    required: true,
    unique: true,
    validation: Joi.string().alphanum().min(2)
  },

  organisatie: {
    type: String,
    required: true,
    unique: true,
    validation: Joi.string().min(2)
  },

  type: {
    type: String,
    required: true,
    validation: Joi.string().alphanum().min(2),
  },

  street: {
    type: String,
    required: true,
    validation: Joi.string().min(2),
  },

  city: {
    type: String,
    required: true,
    validation: Joi.string().min(3),
  },

};

module.exports = {schema};
