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
updateEmployeeDataQuery = (email,employee,password) => {
    const query = 'UPDATE employee SET name = ?,surname=?,email=?,password=?,branchId=? WHERE email=?;';
    return new Promise((resolve, reject) => {
        connect.query(query,[employee.name,employee.surname,employee.email,password,employee.branchId,email], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};
getEmployeeByEmailQuery = (email) => {
    const query = 'SELECT * FROM employee WHERE email = ?;'
    return new Promise((resolve, reject) => {
        connect.query(query, [email], function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};
module.exports = {
    getAllEmployeesQuery,
    updateEmployeeDataQuery,
    getEmployeeByEmailQuery
}