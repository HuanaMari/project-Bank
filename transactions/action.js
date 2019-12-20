const { sumTransactionQuery, insertTransactionQuery, allTransactionsQuery, SumInflowAndOtflowQuery, bankStatementQuery } = require('./wrappers');
const { dataFromToken, BankStatementJSON, sumOutInflow } = require('../helpers');
const { getAccountBallanceQuery } = require('../accounts/wrapers')

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
bankStatement = async (req, res, next) => {
    let cus = dataFromToken(req);
    let id = cus.customer_id
    try {
        let balance = await getAccountBallanceQuery(id);
        let sumA = await sumTransactionQuery(id)
        let new_Balance = balance[0].balance + sumA[0].Total
        let iNandOut = await SumInflowAndOtflowQuery(id);
        let total = sumOutInflow(iNandOut);
        let reqStatement = await bankStatementQuery(id);
        let statement = BankStatementJSON(reqStatement, cus.name, cus.surname);
        statement[0].total = total
        statement[0].new_Balance = new_Balance
        res.status(200).send(statement[0]);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
};
module.exports = {
    allTransactions,
    insertTransaction,
    bankStatement
}