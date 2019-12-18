const express = require('express');
const { emailValidator, passwordValidator } = require('../middleware/validators');
const { getAllCustomers, createCustomer, updateCustomer, getSpecCustomerWithAcc, login } = require('./action');
const { checkToken, verifyToken, checkEmployeeAuth, checkCustomerAuth } = require('../middleware/authentication');

let routes = express.Router();
var cus = "customer"

routes.get('/' + cus, checkToken, verifyToken, checkEmployeeAuth, getAllCustomers);
routes.post('/'+ cus, checkToken, verifyToken, emailValidator, passwordValidator,checkEmployeeAuth ,createCustomer);
routes.get('/' + cus + '/accounts', checkToken, verifyToken,checkCustomerAuth, getSpecCustomerWithAcc);
routes.put('/' + cus + '/data', checkToken, verifyToken, checkCustomerAuth,
    emailValidator, passwordValidator, updateCustomer);
routes.post('/login', login);

module.exports = routes