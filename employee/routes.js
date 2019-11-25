const express = require('express');
const {getAllEmployees} = require('./action');

let routes = express.Router();

routes.get('/employee',getAllEmployees);

module.exports = routes