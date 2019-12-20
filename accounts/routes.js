const express = require('express');
const actions = require('./actions');
const { checkToken, verifyToken, checkEmployeeAuth, checkCustomerAuth } = require('../middleware/authentication');
let employeeAuth = [checkToken, verifyToken, checkEmployeeAuth];
let customerAuth = [checkToken, verifyToken, checkCustomerAuth]

let routes = express.Router();
var acc = 'account'

routes.get('/' + acc, employeeAuth, actions.getAllAccounts);
routes.post('/' + acc + '/spec_customer', employeeAuth, actions.getAccForSpecCustomer)
routes.post('/' + acc, employeeAuth, actions.createAccount);
routes.get('/' + acc + '/customer', customerAuth, actions.getJoineData)
routes.get('/' + acc + '/:account', employeeAuth, getAccWithCustomerAndTrans);

module.exports = routes
