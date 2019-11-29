const connect = require('../database');

getAllBranchQuery = () => {
    const query = 'SELECT *FROM branch';
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
    getAllBranchQuery
}