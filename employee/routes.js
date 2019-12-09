const express = require('express');
const {checkToken,verifyToken,checkEmployeeAuth,checkCustomerAuth}=require('../middleware/authentication');
const {getAllEmployees,updateEmployeeData} = require('./action');

let routes = express.Router();

routes.get('/employee',checkToken,verifyToken,checkEmployeeAuth,getAllEmployees);
routes.put('/employee/:id',checkToken,verifyToken,checkEmployeeAuth,updateEmployeeData);

module.exports = routes