const express = require('express');
const {emailValidator } = require('../middleware/validators');
const { getAllCustomers,createCustomer,updateCustomer,getSpecCustomerWithAcc ,login} = require('./action');
const {checkToken,verifyToken,checkEmployeeAuth,checkCustomerAuth}=require('../middleware/authentication');

let routes = express.Router();

routes.get('/customer',checkToken,verifyToken,checkEmployeeAuth, getAllCustomers);
routes.post('/customer',checkToken,verifyToken,emailValidator, createCustomer);
routes.get('/customer/:id',checkToken,verifyToken,getSpecCustomerWithAcc);
routes.put('/customer/:customer_id',checkToken,verifyToken,checkCustomerAuth,emailValidator, updateCustomer);
routes.post('/login',login);


module.exports = routes