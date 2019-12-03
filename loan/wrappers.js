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
sumOfTransactionsForLoanQuery = (id) => {
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
};

createLoanQuery = (loan) => {
    const query = 'INSERT INTO loan (borrowedOn,amount,accountId,customerId,employeeId) VALUES (now(),?,?,?,?)';
    return new Promise((resolve, reject) => {
        connect.query(query, [loan.amount, loan.accountId, loan.customerId, loan.employeeId], (error, results, fields) => {
            if (error) {
                let split = error.sqlMessage.split(' ')
                error.message = `That ${split[17]} does not exist!!!`
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
    sumOfTransactionsForLoanQuery,
    createLoanQuery
}