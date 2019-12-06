const express = require('express');
const {emailValidator } = require('../middleware/validators');
const { getAllCustomers,createCustomer,updateCustomer ,loginCustomer} = require('./action');

let routes = express.Router();

routes.get('/customer', getAllCustomers);
routes.post('/customer',emailValidator, createCustomer);
routes.put('/customer/:customer_id',emailValidator, updateCustomer);
routes.post('/login',loginCustomer);


module.exports = routes