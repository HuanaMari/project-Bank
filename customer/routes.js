const express = require('express');
const {getAllCustomers} = require('./action');

let routes = express.Router();

routes.get('/customer',getAllCustomers);

module.exports = routes