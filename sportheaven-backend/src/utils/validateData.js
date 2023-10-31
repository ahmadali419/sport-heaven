// validationUtils.js
const Joi = require('joi');

// Define the validateData utility function
function validateData(data, schema) {
  const { error } = schema.validate(data);
  return error ? error.details[0].message : null;
}

module.exports = { validateData };
