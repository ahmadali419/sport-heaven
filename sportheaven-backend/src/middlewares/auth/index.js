const {
  loginValidationMiddleware,
  registerValidationMiddleware,
} = require('./authValidationMiddleware');
const { authTokenMiddleware } = require('./authTokenMiddleware');
module.exports = {
  loginValidationMiddleware,
  registerValidationMiddleware,
  authTokenMiddleware,
};
