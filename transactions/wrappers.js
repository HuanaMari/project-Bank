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
    const query = ' INSERT INTO transaction (transaction_amount,transaction_madeOn,accountId,customerId,loanId)\
     VALUES(?,CURDATE(),?,?,?); '
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
bankStatementQuery = (date,account) => {
    const query = 'SELECT transaction.*,account_number,createdOn,balance,name,surname,(CASE WHEN transaction_amount < 0 THEN transaction_amount ELSE 0 END) AS Outflow,(CASE WHEN transaction_amount >= 0 THEN transaction_amount ELSE 0 END) AS Inflow FROM transaction JOIN customer ON customer.customer_id = transaction.customerId JOIN account ON account.account_id = transaction.accountId WHERE transaction_madeOn = ? and accountId=?';
    return new Promise((resolve, reject) => {
        connect.query(query, [date,account], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    })
};
bankStatementCustomerQuery = (date,account,email) => {
    const query = 'SELECT transaction.*,account_number,createdOn,balance,name,surname,(CASE WHEN transaction_amount < 0 THEN transaction_amount ELSE 0 END) AS Outflow,(CASE WHEN transaction_amount >= 0 THEN transaction_amount ELSE 0 END) AS Inflow FROM transaction JOIN customer ON customer.customer_id = transaction.customerId JOIN account ON account.account_id = transaction.accountId WHERE transaction_madeOn = ? and accountId= ? and email= ?';
    return new Promise((resolve, reject) => {
        connect.query(query, [date,account,email], (error, results, fields) => {
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
    bankStatementQuery,
    bankStatementCustomerQuery
}
