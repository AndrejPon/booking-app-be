const express = require('express');
const mysql = require('mysql2/promise');
const isAuth = require('../../middleware/auth');
const { mysqlConfig } = require('../../dbConfig');

const router = express.Router();

router.get('/', isAuth, async (req, res) => {
  try {
    const conn = await mysql.createConnection(mysqlConfig);
    const [data] = await conn.execute(`
    SELECT * FROM bapp_orders
    WHERE user_id = (${mysql.escape(req.user.id)})
    `);
    await conn.end();
    return res.send(data);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: 'Unexpected server error. Please try again.' });
  }
});

module.exports = router;
