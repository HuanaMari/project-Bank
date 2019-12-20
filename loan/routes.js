const express = require('express');
const { checkToken, verifyToken, checkEmployeeAuth, checkCustomerAuth } = require('../middleware/authentication');
const { getAllLoans, createLoan, getLoanWithAllData } = require('./action');
let employeeAuth = [checkToken, verifyToken, checkEmployeeAuth];
let customerAuth = [checkToken, verifyToken, checkCustomerAuth];
let routes = express.Router();
var loan = 'loan'

routes.get('/' + loan + '/data', checkToken, verifyToken, getLoanWithAllData);
routes.get('/' + loan, employeeAuth, getAllLoans);
routes.post('/' + loan, employeeAuth, createLoan);


module.exports = routes