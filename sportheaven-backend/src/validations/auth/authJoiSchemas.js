const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required().trim().messages({
    'string.email': 'Invalid email format', // Custom error message without escaping
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.password': 'Password must be at least 6 characters',
    'any.required': 'Password is required',
  }),
  isAdmin: Joi.boolean().optional(),
});
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  isAdmin: Joi.boolean().optional(),
});
module.exports = { loginSchema, registerSchema };
