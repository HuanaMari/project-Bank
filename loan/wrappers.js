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
createLoanQuery = (loan) => {
    const query = 'INSERT INTO loan (borrowedOn,amount,accountId,customerId,employeeId) VALUES (now(),?,?,?,?)';
    return new Promise((resolve, reject) => {
        connect.query(query, [loan.amount, loan.accountId, loan.customerId, loan.employeeId], (error, results, fields) => {
            if (error) {
                let split = error.sqlMessage.split(' ')
                error.message = `That ${split[17]} does not exist!!!`
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};
getSpecificLoanQuery = (id) => {
    const query = 'SELECT * FROM loan WHERE accountId=?';
    return new Promise((resolve, reject) => {
        connect.query(query,[id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
module.exports = {
    getAllLoansQuery,
    createLoanQuery,
    getSpecificLoanQuery
}