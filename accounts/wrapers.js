const connect = require('../database');

getAllAccountsQuery = () => {
    const query = 'SELECT *FROM account';
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
createAccountQuery = (account) => {
    const query = 'INSERT INTO account (account_number,createdOn,balance,branchId,customerId)\
    VALUES (FLOOR(30012346789 + RAND() * 3000000 ),now(),?,?,?);';
    return new Promise((resolve, reject) => {
        connect.query(query, [account.balance, account.branchId, account.customerId], (error, results, fields) => {
            if (error) {
                let split = error.sqlMessage.split(' ')
                error.message = `That ${split[17]} does not exist!!!`
                reject(error)
            }
            else {
                resolve(results)
            }
        });
    });
};
getAccountWithCustomerAndTransactionsQuery = (account) => {
    const query = 'SELECT * FROM customer JOIN account ON customer.customer_id = account.customerId \
    LEFT JOIN transaction ON transaction.accountId=account.account_id WHERE account.account_id=?;';
    return new Promise((resolve, reject) => {
        connect.query(query, [account], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};
getJoineDataForAccByEmailQuery = (email) => {
    const query = 'SELECT * FROM customer JOIN account ON customer.customer_id = account.customerId \
    LEFT JOIN transaction ON transaction.accountId=account.account_id WHERE customer.email=?;';
    return new Promise((resolve, reject) => {
        connect.query(query, [email], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};
getAccForSpecCustomerQuery = (customerId) => {
    const query = 'SELECT * FROM account WHERE customerId=?;';
    return new Promise((resolve, reject) => {
        connect.query(query, [customerId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};
getAccountBallanceQuery = (id) => {
    const query = 'SELECT account.balance FROM account WHERE customerId= ?;';
    return new Promise((resolve, reject) => {
        connect.query(query,[id], (error, results, fields) => {
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
    getAllAccountsQuery,
    createAccountQuery,
    getAccountWithCustomerAndTransactionsQuery,
    getAccForSpecCustomerQuery,
    getAccountBallanceQuery,
    getJoineDataForAccByEmailQuery
}