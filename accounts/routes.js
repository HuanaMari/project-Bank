const express = require('express');
const actions = require('./actions');

let routes = express.Router();

routes.get('/acc',actions.getAllAccounts);

module.exports = routes
