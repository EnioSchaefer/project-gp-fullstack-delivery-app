require('express-async-errors');
const express = require('express');
const cors = require('cors');
const UserRoute = require('./routes/UserRoutes');
const registerRoute = require('./routes/RegisterRoute');
const CustomerRoute = require('./routes/CustomerRoute');
const OrderRoute = require('./routes/OrderRouter');
const AdminRoute = require('./routes/AdminRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/images', express.static('public'));
app.use('/register', registerRoute);
app.use('/login', UserRoute);
app.use('/customer', CustomerRoute);
app.use('/orders', OrderRoute);
app.use('/admin', AdminRoute);

module.exports = app;
