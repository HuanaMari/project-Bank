const express = require('express');
const actions = require('./actions');

let routes = express.Router();

routes.get('/acc',actions.getAllAccounts);
routes.post('/acc',actions.getAccByBalance);

module.exports = routes
