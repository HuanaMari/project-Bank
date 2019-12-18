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
        connect.query(query, [transaction.transaction_amount, transaction.accountId, transaction.customerId], (error, results, fields) => {
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
    const query = 'SELECT SUM(transaction_amount) as Total FROM transaction WHERE customerId=?;';
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
SumInflowAndOtflowQuery = (id) => {
    const query = 'SELECT SUM(CASE WHEN transaction_amount<0 THEN transaction_amount ELSE 0 END) AS Outflow,SUM(CASE WHEN transaction_amount>=0 THEN transaction_amount ELSE 0 END) AS Inflow FROM transaction WHERE DATE(transaction_madeOn) = DATE(NOW()- INTERVAL 1 DAY) AND customerId = ?;';
    return new Promise((resolve, reject) => {
        connect.query(query, [id], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    })
};
bankStatementQuery = (id) => {
    const query = 'SELECT transaction.*,(CASE WHEN transaction_amount<0 THEN transaction_amount ELSE 0 END) AS Otflow,(CASE WHEN transaction_amount>=0 THEN transaction_amount ELSE 0 END) AS Inflow FROM transaction WHERE DATE(transaction_madeOn) = DATE(NOW()- INTERVAL 1 DAY) AND customerId = ?;';
    return new Promise((resolve, reject) => {
        connect.query(query, [id], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    })
};
module.exports = {
    allTransactionsQuery,
    sumTransactionQuery,
    insertTransactionQuery,
    sumTransactionQuery,
    SumInflowAndOtflowQuery,
    bankStatementQuery
}
