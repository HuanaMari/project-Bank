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
    const query = 'SELECT loan.loan_id,loan.amount,SUM(transaction.transaction_amount)AS TotalTransaction_amount ,\
     (loan.amount- SUM(transaction.transaction_amount )) as "Remains" FROM loan\
      INNER JOIN transaction ON loan.accountId=transaction.accountId where loan.accountId=?;';
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