const express = require('express');
const {
  loginValidationMiddleware,
  registerValidationMiddleware,
} = require('../../middlewares/auth');
const { login, register } = require('../../controllers/auth');
const router = express.Router();

router.post('/login', loginValidationMiddleware, login);
router.post('/register', registerValidationMiddleware, register);

module.exports = router;
