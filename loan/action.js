const { getAllLoansQuery, createLoanQuery, getLoanWithAllDataQuery } = require('./wrappers');
const { sumTransactionQuery } = require('../transactions/wrappers');
const { emailFromToken, transactionJSON } = require('../helpers');
const { Account, Customer, Loan, Transaction } = require('../models');

getAllLoans = async (req, res) => {
    try {
        let allCus = await getAllLoansQuery();
        res.status(200).send(allCus);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};
createLoan = async (req, res, next) => {
    let loan = req.body
    try {
        await createLoanQuery(loan);
        res.status(200).send('Loan has been recorded');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
getLoanWithAllData = async (req, res, next) => {
    let email = emailFromToken(req);
    try {
        let results = await getLoanWithAllDataQuery(email);
        let dbLoan = results[0];
        let sumAmount = await sumTransactionQuery(dbLoan.account_id);
        var remains = dbLoan.amount - sumAmount[0].Total
        let loanRes = new Loan(dbLoan);
        let acc = new Account(dbLoan);
        let cus = new Customer(dbLoan);
        let transaction = transactionJSON(results);
        let dbtransactions = new Transaction(transaction);
        let loan = loanRes.loanToShow();
        let customer = cus.customerToShow();
        let account = acc.accNumber();
        loan.customer= customer;
        loan.account = account;
        loan.installments = dbtransactions;
        loan.remains = remains;
        res.status(200).send(loan);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllLoans,
    createLoan,
    getLoanWithAllData
}