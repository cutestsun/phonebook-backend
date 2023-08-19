const Joi = require("joi");

const fullContactSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required(),
});

module.exports = { fullContactSchema };
