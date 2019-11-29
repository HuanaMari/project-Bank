const { sumTransactionsQuery,
    insertTransactionQuery,
    allTransactionsQuery
} = require('./wrappers');


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
        let sum = await sumTransactionsQuery();
        res.status(200).send(sum);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
insertTransaction = async (req, res, next) => {
    try {
        let amount = await insertTransactionQuery(req.body);
        console.log(req.body)
        res.status(200).send('Inserted');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    allTransactions,
    sumTransactions,
    insertTransaction
}