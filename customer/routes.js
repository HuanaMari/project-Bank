const express = require('express');
const { emailValidator, passwordValidator } = require('../middleware/validators');
const { getAllCustomers, createCustomer, updateCustomer, getSpecCustomerWithAcc, login } = require('./action');
const { checkToken, verifyToken, checkEmployeeAuth, checkCustomerAuth } = require('../middleware/authentication');
let employeeAuth = [checkToken, verifyToken, checkEmployeeAuth];
let customerAuth = [checkToken, verifyToken, checkCustomerAuth];
let routes = express.Router();
var cus = "customer"

routes.get('/' + cus, employeeAuth, getAllCustomers);
routes.post('/'+ cus, employeeAuth, emailValidator, passwordValidator ,createCustomer);
routes.get('/' + cus + '/accounts', customerAuth, getSpecCustomerWithAcc);
routes.put('/' + cus + '/data', customerAuth, emailValidator, passwordValidator, updateCustomer);
routes.post('/login', login);

module.exports = routes