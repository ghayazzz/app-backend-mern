// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// module.exports = function (req, res, next) {
//   const token = req.header('x-auth-token');
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// // Import the shared tokenBlacklist if you use the shared module approach
// const tokenBlacklist = require('../config/tokenBlacklist');

// module.exports = function (req, res, next) {
//   const token = req.header('x-auth-token');

//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     if (tokenBlacklist.has(token)) {
//       return res.status(401).json({ msg: 'Token has been invalidated, authorization denied' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

const jwt = require('jsonwebtoken');
require('dotenv').config();
const tokenBlacklist = require('../config/tokenBlacklist');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    if (tokenBlacklist.has(token)) {
      return res.status(401).json({ msg: 'Token has been invalidated, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
