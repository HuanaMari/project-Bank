const express = require('express');
const { checkToken, verifyToken, checkEmployeeAuth, checkCustomerAuth } = require('../middleware/authentication');
const { getAllLoans, createLoan, getLoanWithAllData } = require('./action');

let routes = express.Router();
var loan = 'loan'

routes.get('/' + loan + '/data', checkToken, verifyToken, getLoanWithAllData);
routes.get('/' + loan, checkToken, verifyToken, checkEmployeeAuth, getAllLoans);
routes.post('/' + loan, checkToken, verifyToken, checkEmployeeAuth, createLoan);


module.exports = routes