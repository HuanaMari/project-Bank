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
createLoanQuery = (loan) => {
    const query = 'INSERT INTO loan (borrowedOn,amount,accountId,customerId,employeeId) VALUES (now(),?,?,?,?)';
    return new Promise((resolve, reject) => {
        connect.query(query, [loan.amount, loan.accountId, loan.customerId, loan.employeeId], (error, results, fields) => {
            if (error) {
                // let split = error.sqlMessage.split(' ')
                // error.message = `That ${split[17]} does not exist!!!`
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};
getLoanWithAllDataQuery = (email) => {
    const query = 'SELECT loan.borrowedOn,loan.amount,customer.name,customer.surname,account.account_id,account.account_number,(CASE WHEN transaction_amount<0 THEN transaction_amount ELSE 0 END) AS Instalments,transaction.transaction_madeOn FROM loan JOIN transaction on loan.accountId=transaction.accountId JOIN account on account.account_id = loan.accountId JOIN customer on customer.customer_id=account.customerId where customer.email=?;';
    return new Promise((resolve, reject) => {
        connect.query(query,[email], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};
getLoanWithAllDataByIdQuery = (loanId) => {
    const query = 'SELECT loan.borrowedOn,loan.amount,customer.name,customer.surname,account.account_id,account.account_number,(CASE WHEN transaction_amount<0 THEN transaction_amount ELSE 0 END) AS Instalments,transaction.transaction_madeOn FROM loan JOIN transaction on loan.accountId=transaction.accountId JOIN account on account.account_id = loan.accountId JOIN customer on customer.customer_id=account.customerId where loan.loan_id = ?;';
    return new Promise((resolve, reject) => {
        connect.query(query,[loanId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    getAllLoansQuery,
    createLoanQuery,
    getLoanWithAllDataQuery,
    getLoanWithAllDataByIdQuery  
}