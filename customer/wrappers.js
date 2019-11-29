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
createCustomerQuery = (customer, password) => {
    const query = 'INSERT INTO customer(name, surname, city, adress, accountId, email, username, password)\
    VALUES(?,?,?,?,?,?,?,?)';
    return new Promise((resolve, reject) => {
        connect.query(query, [customer.name, customer.surname, customer.city, customer.adress, customer.accountId
            , customer.email, customer.username, password], (error, results, fields) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
            })
    })

};

module.exports = {
    getAllCustomersQuery,
    createCustomerQuery
}