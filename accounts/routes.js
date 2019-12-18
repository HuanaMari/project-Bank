const express = require('express');
const actions = require('./actions');
const { checkToken, verifyToken, checkEmployeeAuth } = require('../middleware/authentication');

let routes = express.Router();
var acc = 'account'

routes.get('/' + acc, checkToken, verifyToken, checkEmployeeAuth, actions.getAllAccounts);
routes.post('/' + acc + '/customer', checkToken, verifyToken, checkEmployeeAuth, actions.getAccForSpecCustomer)
routes.post('/' + acc, checkToken, verifyToken, checkEmployeeAuth, actions.createAccount);
routes.get('/' + acc + '/:account', checkToken, verifyToken, getAccWithCustomerAndTrans);

module.exports = routes
