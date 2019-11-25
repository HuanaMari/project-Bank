const express = require('express');
const {getAllLoans} = require('./action');

let routes = express.Router();

routes.get('/loan',getAllLoans);

module.exports = routes