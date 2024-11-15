const schema = require("../schemas/puntuaciones.schema");

const middleware = {};

const validatePuntuaciones = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
middleware.validatePuntuaciones = validatePuntuaciones;

module.exports = middleware;
