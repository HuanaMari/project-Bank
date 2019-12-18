const express = require('express');
const { allTransactions, insertTransaction, sumTransactions,bankStatement } = require('./action');
const { checkToken, verifyToken, checkEmployeeAuth, checkCustomerAuth } = require('../middleware/authentication');

let routes = express.Router();
var transactions = 'transactions';

routes.get('/'+transactions + '/statement',bankStatement);
routes.get('/' + transactions, checkToken, verifyToken, checkEmployeeAuth, allTransactions);
routes.post('/' + transactions, checkToken, verifyToken, checkCustomerAuth, insertTransaction);
routes.get('/' + transactions + '/id', checkToken, verifyToken, sumTransactions);


module.exports = routes