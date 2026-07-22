const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // tokens are sent as: Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // extract just the token part, after "Bearer "
      token = req.headers.authorization.split(' ')[1];

      // verify the token is valid and wasn't tampered with
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // fetch the user and attach it to the request, minus the password
      req.user = await User.findById(decoded.id).select('-password');

      next(); // token is valid — let the request continue to the actual route
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };