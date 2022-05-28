const express = require('express');
const mysql = require('mysql2/promise');
const isAuth = require('../../middleware/auth');
const { mysqlConfig } = require('../../dbConfig');

const router = express.Router();

router.post('/:id', isAuth, async (req, res) => {
  try {
    const orderId = req.params.id;

    const conn = await mysql.createConnection(mysqlConfig);

    const [data] = await conn.execute(
      `INSERT INTO bapp_orders(user_id, first_name, last_name, phone_number, email, service_name, service_id, service_duration, service_price)
      SELECT bapp_users.id, bapp_users.first_name, bapp_users.last_name, bapp_users.phone_number, bapp_users.email, bapp_services.name, bapp_services.id, bapp_services.duration, bapp_services.price
      FROM bapp_users, bapp_services
      WHERE bapp_users.id=(${mysql.escape(
        req.user.id
      )}) and bapp_services.id=(${mysql.escape(orderId)})`
    );

    await conn.end();
    if (!data.insertId) {
      return res.status(500).send({
        error: 'Nenumatyta serverio klaida. Prašome, pabandyti dar kartą.',
      });
    }
    return res.send({
      msg: 'Jūsų užsakymas sukurtas.',
      id: data.insertId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: 'Nenumatyta serverio klaida. Prašome, pabandyti dar kartą.',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // const orderId = req.params.id;
    // console.log('orderId===', orderId);
    return res.send(orderId);
  } catch (error) {
    console.log(error);
  }
});

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
    return res.status(500).send({
      error: 'Nenumatyta serverio klaida. Prašome, pabandyti dar kartą.',
    });
  }
});

router.delete('/:id', isAuth, async (req, res) => {
  try {
    const conn = await mysql.createConnection(mysqlConfig);
    const orderId = req.params.id;
    const [data] = await conn.execute(`
    DELETE FROM bapp_orders
    WHERE id = ${mysql.escape(orderId)}
    `);
    await conn.end();
    return res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: 'Nenumatyta serverio klaida. Prašome, pabandyti dar kartą.',
    });
  }
});

module.exports = router;
