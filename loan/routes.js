const express = require('express');
const {getAllLoans,
    sumTransactionsForLoan} = require('./action');

let routes = express.Router();

routes.get('/loan',getAllLoans);
routes.get('/loan/:id', sumTransactionsForLoan);


module.exports = routes