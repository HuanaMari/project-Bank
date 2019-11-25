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


module.exports = {
    getAllLoansQuery
}