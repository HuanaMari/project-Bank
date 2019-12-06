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
updateEmployeeDataQuery = (id,employee,password) => {
    const query = 'UPDATE employee SET name = ?,surname=?,email=?,password=?,branchId=? WHERE employee_id=?;';
    return new Promise((resolve, reject) => {
        connect.query(query,[employee.name,employee.surname,employee.email,password,employee.branchId,id], (error, results, fields) => {
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
    getAllEmployeesQuery,
    updateEmployeeDataQuery
}