const connect = require('../database');

getAllLoansQuery = () => {
    const query = 'SELECT *FROM loan';
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


getTransactionsForLoanQuery = (id) => {
    const query = 'SELECT customer.customer_id,customer.name,customer.surname,customer.accountId,account.account_number,\
    loan.loan_id,loan.amount,SUM(transaction.transaction_amount) AS TotalTransaction_amount,\
    (loan.amount- SUM(transaction.transaction_amount)) as "Remains" from customer\
    LEFT JOIN account  ON customer.accountId=account.account_id\
    INNER join loan ON loan.customerId=customer.customer_id\
    INNER JOIN transaction ON loan.accountId=transaction.accountId\
    WHERE customer.customer_id=?;';
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
}

module.exports = {
    getAllLoansQuery,
    getTransactionsForLoanQuery
}