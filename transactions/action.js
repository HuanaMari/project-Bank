const { sumTransactionsQuery,
   } = require('./wrappers');

sumTransactions = async (req, res, next) => {
    try {
        let sum = await sumTransactionsQuery();
        res.status(200).send(sum);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};




    module.exports = {
        sumTransactions,
    }