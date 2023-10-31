const { loginSchema, registerSchema } = require('../../validations/auth');
const { validateData } = require('../../utils');

const loginValidationMiddleware = (req, res, next) => {
  const validationError = validateData(req.body, loginSchema);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }
  next();
};
const registerValidationMiddleware = (req, res, next) => {
  const validationError = validateData(req.body, registerSchema);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }
  next();
};

module.exports = {
  loginValidationMiddleware,
  registerValidationMiddleware,
};
