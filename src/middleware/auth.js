const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../dbConfig');

const isAuth = (res, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: 'Invalid token' });
  }
};

module.exports = isAuth;
