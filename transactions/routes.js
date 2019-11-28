const express = require('express');
const {sumTransactions,
   } = require('./action');

let routes = express.Router();

routes.get('/transactions', sumTransactions);


module.exports = routes