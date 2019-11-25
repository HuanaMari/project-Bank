const express = require('express');
const {getAllBranch} = require('./action');

let routes = express.Router();

routes.get('/branch',getAllBranch);

module.exports = routes