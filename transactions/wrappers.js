const connect = require('../database');

allTransactionsQuery = () => {
    const query = 'SELECT * FROM transaction'
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
    const query = ' INSERT INTO transaction (transaction_amount,transaction_madeOn,accountId,customerId)\
     VALUES(?,now(),?,?); '
    return new Promise((resolve, reject) => {
        connect.query(query, [transaction.transaction_amount, transaction.accountId,transaction.customerId], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};
sumTransactionQuery = (id) => {
    const query = 'SELECT SUM(transaction_amount) as Total FROM transaction WHERE accountId=?;';
    return new Promise((resolve, reject) => {
        connect.query(query, [id], (error, results, fields) => {
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
    sumTransactionQuery,
    insertTransactionQuery,
    sumTransactionQuery
}
