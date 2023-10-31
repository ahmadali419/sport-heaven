const bcrypt = require('bcrypt');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
exports.login = async (req, res, next) => {
  const { email, password, isAdmin } = req.body;
  try {
    const user = await User.findOne({ email, isAdmin });
    if (!user) {
      return res.status(404).json({ message: 'Account not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_KEY,
    );
    delete user._doc.password;
    res.status(200).json({
      message: `Welcome ${user._doc.name}`,
      token,
      user: user._doc,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error!',
    });
  }
};

exports.register = async (req, res, next) => {
  const { name, password, email, isAdmin } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'Username or email already exists' });
    }
    const newUser = new User({
      email,
      password,
      name,
      isAdmin,
    });
    const savedUser = await newUser.save();
    res.status(201).json({
      message: 'User account has been created successfully',
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error!' });
  }
};
