const accounts = require('./wrapers');
const { Account, Customer, Loan, Transaction } = require('../models');
const { sumTransactionQuery } = require('../transactions/wrappers')


createAccount = async (req, res) => {
    try {
        let account = await accounts.createAccountQuery(req.body)
        res.status(201).send(account)
    } catch (error) {
        res.status(500).send(error.message)
    }
};
getAllAccounts = async (req, res) => {
    try {
        let allAcc = await accounts.getAllAccountsQuery();
        res.status(200).send(allAcc);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};
getAccByBalance = async (req, res) => {
    try {
        let allAccByBalance = await accounts.getSpecificAccountByBalanceQuery(req.body.balance);
        res.status(200).send(allAccByBalance);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
getAccWithCustomerAndTrans = async (req, res, next) => {
    try {
        let sumAmount = await sumTransactionQuery(req.params.id);
        let join = await accounts.getAccountWithCustomerAndTransactionsQuery(req.params.id);
        let dbAccount = join[0];
        var total = dbAccount.balance + sumAmount[0].Total;
        let account = new Account(dbAccount.account_number, dbAccount.createdOn, dbAccount.balance, dbAccount.branchId, dbAccount.customerId)
        account.total = total;
        let customer = new Customer(dbAccount.name, dbAccount.surname)
        account.customer = customer;
        res.status(200).send(account);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllAccounts,
    getAccByBalance,
    createAccount,
    getAccWithCustomerAndTrans
}