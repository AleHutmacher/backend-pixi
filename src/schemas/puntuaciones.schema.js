const Joi = require("joi");

const schema = Joi.object({
  nombre: Joi.string()
    .required()
    .max(5)
    .truncate()
    .uppercase()
    .trim()
    .token()
    .pattern(/^\S+$/),
  puntuacion: Joi.number().required().trim(),
});

module.exports = schema;
