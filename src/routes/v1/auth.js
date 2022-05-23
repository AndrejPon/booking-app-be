const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validation = require('../../middleware/validation');
const { userSchema } = require('../../models/auth');
const { mysqlConfig, jwtSecret } = require('../../dbConfig');
// const isAuth = require('../../middleware/auth');

const router = express.Router();

router.post('/register', validation(userSchema), async (req, res) => {
  try {
    const conn = await mysql.createConnection(mysqlConfig);
    const passHash = bcrypt.hashSync(req.body.password, 10);
    const [data] = await conn.execute(
      `INSERT INTO bapp_users (first_name, last_name, phone_number, email, password)
      VALUES (${mysql.escape(req.body.first_name)}, ${mysql.escape(
        req.body.last_name
      )}, ${mysql.escape(req.body.phone_number)}, ${mysql.escape(
        req.body.email
      )}, '${passHash}' )
            `
    );
    await conn.end();
    if (!data.insertId) {
      return res
        .status(500)
        .send({ error: 'Unexpected server error. Please try again.' });
    }
    return res.send({
      msg: 'You are successfully registered!',
      id: data.insertId,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: 'Unexpected server error. Please try again.' });
  }
});

module.exports = router;
