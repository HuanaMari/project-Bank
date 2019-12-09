const express = require('express');
const {checkToken,verifyToken,checkEmployeeAuth,checkCustomerAuth}=require('../middleware/authentication');
const { getAllLoans,createLoan,getSpecLoan } = require('./action');

let routes = express.Router();

routes.get('/loan',checkToken,verifyToken,getAllLoans);
routes.post('/loan',checkToken,verifyToken,checkEmployeeAuth,createLoan);
routes.get('/loan/:id',getSpecLoan);


module.exports = routes