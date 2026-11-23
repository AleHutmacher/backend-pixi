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
  puntuacion: Joi.number().integer().min(0).required(),
});

module.exports = schema;
