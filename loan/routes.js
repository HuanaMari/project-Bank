const express = require('express');
const { getAllLoans,
    sumTransactionsForLoan,
    createLoan } = require('./action');

let routes = express.Router();

routes.get('/loan', getAllLoans);
routes.get('/loan/:id', sumTransactionsForLoan);
routes.post('/loan',createLoan)


module.exports = routes