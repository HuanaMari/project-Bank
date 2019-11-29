const connect = require('../database');

allTransactionsQuery = () => {
    const query ='SELECT * FROM transaction'
    return new Promise((resolve, reject) => {
        connect.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};

sumTransactionsQuery = () => {
    const query = 'SELECT SUM(transaction_amount) AS TotalTransaction_amount from transaction; '
    return new Promise((resolve, reject) => {
        connect.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};

insertTransactionQuery = (transaction) => {
    const query = 'INSERT INTO transaction(transaction_amount,transaction_madeOn,accountId)\
    VALUES(?,now(),?); '
    return new Promise((resolve, reject) => {
        connect.query(query,[transaction.transaction_amount,transaction.accountId],(error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};
module.exports = {
    allTransactionsQuery,
    sumTransactionsQuery,
    insertTransactionQuery

}
