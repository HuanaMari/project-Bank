const express = require('express');
const {getAllLoans,
    getTransactionsForLoan} = require('./action');

let routes = express.Router();

routes.get('/loan',getAllLoans);
routes.get('/loan/:id', getTransactionsForLoan);


module.exports = routes