const Scopes = require(`../const/Scopes`);
const Joi = require(`joi`);

const schema = {

  email: {
    type: String,
    required: true,
    unique: true,
    validation: Joi.string().email(),
    login: true
  },

  firstname: {
    type: String,
    required: true,
    validation: Joi.string().alphanum().min(2),
    login: true
  },

  name: {
    type: String,
    required: true,
    validation: Joi.string().alphanum().min(2),
    login: true
  },

  password: {
    type: String,
    required: true,
    validation: Joi.string().min(3),
    projection: false
  },

  scope: {
    type: String,
    default: Scopes.USER,
    validation: Joi.string().min(3)
  }

};

module.exports = {
  schema,
  auth: true
};
