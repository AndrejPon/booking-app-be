const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/v1/auth');
const servicesRoutes = require('./routes/v1/services');
const ordersRoutes = require('./routes/v1/orders');
const { serverPort } = require('./dbConfig');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  return res.send({ msg: 'Server is running' });
});

app.use('/v1/auth', authRoutes);
app.use('/v1/services', servicesRoutes);
app.use('/v1/orders', ordersRoutes);

app.all('*', (req, res) => {
  return res.status(404).send({ error: 'Page not found' });
});

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});
