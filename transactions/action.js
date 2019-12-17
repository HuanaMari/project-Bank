const { sumTransactionQuery, insertTransactionQuery, allTransactionsQuery, bankStatementQuery } = require('./wrappers');
const { dataFromToken,BankStatementJSON,idFromToken } = require('../helpers');
const {Transaction}=require('../models')

allTransactions = async (req, res, next) => {
    try {
        let sum = await allTransactionsQuery();
        res.status(200).send(sum);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
sumTransactions = async (req, res, next) => {
    try {
        let sum = await sumTransactionQuery(req.params.id);
        res.status(200).send(sum);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
insertTransaction = async (req, res, next) => {
    let amount = req.body.transaction_amount;
    customerId = req.body.customerId;
    let cus = idFromToken(req);
    if (cus != customerId) {
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
            res.status(200).send(`Inserted ${req.body.transaction_amount} $`);
        }
        catch (error) {
            res.status(500).send(error.message)
        }
    }
};
bankStatement = async (req, res, next) => {
    let cus = dataFromToken(req);
    try {
        let reqStatement = await bankStatementQuery(cus.customer_id);
        let ccc = BankStatementJSON(reqStatement,cus.name,cus.surname);
         res.status(200).send(ccc[0]);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    allTransactions,
    sumTransactions,
    insertTransaction,
    bankStatement
}