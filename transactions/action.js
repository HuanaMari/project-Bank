const { sumTransactionQuery, insertTransactionQuery, allTransactionsQuery } = require('./wrappers');
const { idFromToken } = require('../helpers');

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
    console.log(customerId)
    let cus = idFromToken(req);
    console.log(req.body)
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
            // let split = error.sqlMessage.split(' ')
            // error.message = `That ${split[17]} does not exist!!!`
            res.status(500).send(error.message)
        }
    }
};

module.exports = {
    allTransactions,
    sumTransactions,
    insertTransaction
}