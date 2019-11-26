const express = require('express');
const { getAllCustomers,
    createCustomer
} = require('./action');

let routes = express.Router();

routes.get('/customer', getAllCustomers);
routes.post('/customer',createCustomer);

module.exports = routes