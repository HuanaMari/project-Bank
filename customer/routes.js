const express = require('express');
const {
    emailValidator} = require('../middleware/validators');
const { getAllCustomers,
    createCustomer
} = require('./action');

let routes = express.Router();

routes.get('/customer', getAllCustomers);
routes.post('/customer',emailValidator,createCustomer);

module.exports = routes