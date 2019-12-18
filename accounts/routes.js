const express = require('express');
const actions = require('./actions');
const { checkToken, verifyToken, checkEmployeeAuth, checkCustomerAuth } = require('../middleware/authentication');

let routes = express.Router();
var acc = 'account'

routes.get('/' + acc, checkToken, verifyToken, checkEmployeeAuth, actions.getAllAccounts);
routes.post('/' + acc + '/spec_customer', checkToken, verifyToken, checkEmployeeAuth, actions.getAccForSpecCustomer)
routes.post('/' + acc, checkToken, verifyToken, checkEmployeeAuth, actions.createAccount);
routes.get('/' + acc + '/customer',checkToken, verifyToken,checkCustomerAuth,actions.getJoineData)
routes.get('/' + acc + '/:account', checkToken, verifyToken,checkEmployeeAuth, getAccWithCustomerAndTrans);

module.exports = routes
