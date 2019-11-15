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

module.exports = {
    getAllAccountsQuery
}