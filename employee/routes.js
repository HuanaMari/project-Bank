const express = require('express');
const {checkToken,verifyToken,checkEmployeeAuth,checkCustomerAuth}=require('../middleware/authentication');
const {getAllEmployees,updateEmployeeData} = require('./action');
const{emailValidator,passwordValidator} = require('../middleware/validators')

let routes = express.Router();

routes.get('/employee',checkToken,verifyToken,checkEmployeeAuth,getAllEmployees);
routes.put('/employee/data',checkToken,verifyToken,checkEmployeeAuth,emailValidator,passwordValidator,updateEmployeeData);

module.exports = routes