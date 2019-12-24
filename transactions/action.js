const {  bankStatementCustomerQuery, insertTransactionQuery, allTransactionsQuery, bankStatementQuery } = require('./wrappers');
const { dataFromToken, BankStatementJSON} = require('../helpers');

allTransactions = async (req, res, next) => {
    try {
        let sum = await allTransactionsQuery();
        res.status(200).send(sum);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
insertTransaction = async (req, res, next) => {
    let amount = req.body.transaction_amount;
    customerId = req.body.customerId;
    let cus = dataFromToken(req);
    let id = cus.customer_id
    if (id != customerId) {
        var error = new Error('you can not make transaction for this account');
        error.status = 402;
        next(error);
    } else if (customerId === 0) {
        var error = new Error('CustomerId cannot be 0');
        error.status = 402;
        next(error);
    } else if (amount === 0) {
        var error = new Error('Transaction cannot be 0');
        error.status = 402;
        next(error);
    } else if (req.body.transaction_madeOn != null) {
        var error = new Error('You cannot add time!');
        error.status = 402;
        next(error);
    } else {
        try {
            await insertTransactionQuery(req.body);
            res.status(200).json(`Inserted ${req.body.transaction_amount} $`);
        }
        catch (error) {
            res.status(500).json(error.message)
        }
    }
};
bankStatement = async (req, res) => {
    let date = req.params.date
    let account =req.params.account
    try {
        let sum = await bankStatementQuery(date,account);
        let prikaz = BankStatementJSON(sum,date)
        let db = [prikaz[0]]
        db.date={DATE:date}
        let arr = [db.date,...db]
        res.status(200).send(arr);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
bankStatementCustomer = async (req, res) => {
    let date = req.body.date
    let reqEmail = dataFromToken(req)
    let email = reqEmail.email
    let account =req.body.account
    try {
        let sum = await bankStatementCustomerQuery(date,account,email);
        let prikaz = BankStatementJSON(sum,date)
        let db = [prikaz[0]]
        db.date={DATE:date}
        let arr = [db.date,...db]
        res.status(200).send(arr);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
module.exports = {
    allTransactions,
    insertTransaction,
    bankStatement,
    bankStatementCustomer
}