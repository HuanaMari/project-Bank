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
        connect.query(query,[balance], (error, results, fields) => {
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
    getSpecificAccountByBalanceQuery
}