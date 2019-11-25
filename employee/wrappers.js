const connect = require('../database');

getAllEmployeesQuery = () => {
    const query = 'SELECT *FROM employee';
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
    getAllEmployeesQuery
}