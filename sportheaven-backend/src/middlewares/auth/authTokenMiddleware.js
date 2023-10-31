const jwt = require('jsonwebtoken');
function authTokenMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ message: 'Unauthorized: Token has expired' });
    }
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

module.exports = { authTokenMiddleware };
