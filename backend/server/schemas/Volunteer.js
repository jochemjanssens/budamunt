const Joi = require(`joi`);
// Joi.objectId = require(`joi-objectid`)(Joi);
//
// const {ObjectId} = require(`mongoose`).Schema.Types;

const schema = {

  user: {
    type: String,
    required: true,
    validation: Joi.string()
  },

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

  starttime: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  endtime: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  munten: {
    type: Number,
    required: true,
    validation: Joi.number()
  },

  userType: {
    type: String,
    required: true,
    validation: Joi.string()
  }

};

module.exports = {schema};
