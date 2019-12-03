const express = require('express');
const { getAllLoans,
    createLoan,
    getSpecLoan } = require('./action');

let routes = express.Router();

routes.get('/loan', getAllLoans);
routes.post('/loan',createLoan);
routes.get('/loan/:id',getSpecLoan);


module.exports = routes