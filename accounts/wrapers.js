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
getSpecificAccountByBalanceQuery = (balance) => {
    const query = 'SELECT * FROM account JOIN customer ON account_id = customer.accountId\
     JOIN loan ON customer.customer_id = loan.customerId WHERE account.balance < ?;';
    return new Promise((resolve, reject) => {
        connect.query(query, [balance], (error, results, fields) => {
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
        connect.query(query, [account.balance, account.branchId,account.customerId], (error, results, fields) => {
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
}
module.exports = {
    getAllAccountsQuery,
    getSpecificAccountByBalanceQuery,
    createAccountQuery
}