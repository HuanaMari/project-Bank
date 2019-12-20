const express = require('express');
const { checkToken, verifyToken, checkEmployeeAuth, checkCustomerAuth } = require('../middleware/authentication');
const { getLoanWithAllDataById,getAllLoans, createLoan, getLoanWithAllData } = require('./action');
let employeeAuth = [checkToken, verifyToken, checkEmployeeAuth];
let customerAuth = [checkToken, verifyToken, checkCustomerAuth];
let routes = express.Router();
var loan = 'loan'

routes.get('/' + loan + '/data',customerAuth , getLoanWithAllData);
routes.post('/' + loan + '/loanId',employeeAuth,getLoanWithAllDataById)
routes.get('/' + loan, employeeAuth, getAllLoans);
routes.post('/' + loan, employeeAuth, createLoan);


module.exports = routes