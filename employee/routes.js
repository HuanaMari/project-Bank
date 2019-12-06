const express = require('express');
const {getAllEmployees,updateEmployeeData} = require('./action');

let routes = express.Router();

routes.get('/employee',getAllEmployees);
routes.put('/employee/:id',updateEmployeeData);

module.exports = routes