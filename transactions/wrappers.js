const connect = require('../database');

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

insertTransactionQuery = () => {
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
module.exports = {
    sumTransactionsQuery

}
