const express = require('express');
const {allTransactions,
   insertTransaction,
   sumTransactions
   } = require('./action');

let routes = express.Router();

routes.get('/transactions', allTransactions);
routes.post('/transactions',insertTransaction);
routes.get('/transactions/:id',sumTransactions)


module.exports = routes