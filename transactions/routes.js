const express = require('express');
const { allTransactions, insertTransaction, sumTransactions } = require('./action');
const { checkToken, verifyToken, checkEmployeeAuth } = require('../middleware/authentication');

let routes = express.Router();

routes.get('/transactions', checkToken, verifyToken, allTransactions);
routes.post('/transactions', checkToken, verifyToken, insertTransaction);
routes.get('/transactions/:id', checkToken, verifyToken, sumTransactions)


module.exports = routes