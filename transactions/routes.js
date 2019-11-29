const express = require('express');
const {allTransactions,
   sumTransactions,
   insertTransaction
   } = require('./action');

let routes = express.Router();

routes.get('/transactions', allTransactions);
routes.get('/transactions/sum', sumTransactions);
routes.post('/transactions',insertTransaction);


module.exports = routes