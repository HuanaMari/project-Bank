const connect = require('../database');

getAllCustomersQuery = () => {
    const query = 'SELECT *FROM customer';
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
    getAllCustomersQuery
}