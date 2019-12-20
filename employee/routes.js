const express = require('express');
const { checkToken, verifyToken, checkEmployeeAuth } = require('../middleware/authentication');
const { getAllEmployees, updateEmployeeData } = require('./action');
const { emailValidator, passwordValidator } = require('../middleware/validators')
let employeeAuth = [checkToken, verifyToken, checkEmployeeAuth];
let routes = express.Router();
var employee = 'employee'

routes.get('/' + employee, employeeAuth, getAllEmployees);
routes.put('/' + employee + '/data',employeeAuth, emailValidator, passwordValidator, updateEmployeeData);

module.exports = routes