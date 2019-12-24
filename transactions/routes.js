const express = require('express');
const { bankStatementCustomer,allTransactions, insertTransaction, bankStatement } = require('./action');
const { checkToken, verifyToken, checkEmployeeAuth, checkCustomerAuth } = require('../middleware/authentication');

let employeeAuth = [checkToken, verifyToken, checkEmployeeAuth];
let customerAuth = [checkToken, verifyToken, checkCustomerAuth];

let routes = express.Router();
var transactions = 'transactions';

routes.post('/' + transactions + '/statement', employeeAuth,bankStatement);
routes.get('/' + transactions + '/customer-statement',customerAuth, bankStatementCustomer);
routes.get('/' + transactions, employeeAuth, allTransactions);
routes.post('/' + transactions, customerAuth, insertTransaction);


module.exports = routes