const express = require('express');
const {emailValidator ,passwordValidator} = require('../middleware/validators');
const { getAllCustomers,createCustomer,updateCustomer,getSpecCustomerWithAcc ,login} = require('./action');
const {checkToken,verifyToken,checkEmployeeAuth,checkCustomerAuth}=require('../middleware/authentication');

let routes = express.Router();

routes.get('/customer',[checkToken,verifyToken,checkEmployeeAuth], getAllCustomers);
routes.post('/customer',checkToken,verifyToken,emailValidator,passwordValidator, createCustomer);
routes.get('/customer/accounts',checkToken,verifyToken,getSpecCustomerWithAcc);
routes.put('/customer/:customer_id',checkToken,verifyToken,checkCustomerAuth,
emailValidator,passwordValidator, updateCustomer);
routes.post('/login',login);


module.exports = routes