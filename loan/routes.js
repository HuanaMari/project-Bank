const express = require('express');
const {checkToken,verifyToken,checkEmployeeAuth,checkCustomerAuth}=require('../middleware/authentication');
const { getAllLoans,createLoan,getSpecLoan,getLoanWithAllData } = require('./action');

let routes = express.Router();

routes.get('/loan/data',checkToken,verifyToken,getLoanWithAllData);
routes.get('/loan',checkToken,verifyToken,checkEmployeeAuth,getAllLoans);
routes.post('/loan',checkToken,verifyToken,checkEmployeeAuth,createLoan);
routes.get('/loan/:id',checkToken,verifyToken,getSpecLoan);


module.exports = routes