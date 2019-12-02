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
    let amount = req.body.transaction_amount;
    if (amount === 0) {
        var error = new Error('Transaction cannot be 0');
        error.status = 402;
        next(error);
    }else if(req.body.transaction_madeOn != null){
        var error = new Error('You cannot add time!');
        error.status = 402;
        next(error);
    }
     else {
        try {
            await insertTransactionQuery(req.body);
            res.status(200).send(`Inserted ${req.body.transaction_amount} $`);
        }
        catch (error) {
            res.status(500).json({
                error: 'account does not exist'
            })
        }
    }
};

module.exports = {
    allTransactions,
    sumTransactions,
    insertTransaction
}