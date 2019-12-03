const express = require('express');
const {
    emailValidator } = require('../middleware/validators');
const { getAllCustomers,
    createCustomer,
    updateCustomer } = require('./action');

let routes = express.Router();

routes.get('/customer', getAllCustomers);
routes.post('/customer',emailValidator, createCustomer);
routes.put('/customer/:customer_id',emailValidator, updateCustomer);


module.exports = routes