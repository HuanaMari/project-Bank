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
    const query = 'INSERT INTO customer(name, surname, city, adress, email, password) VALUES(?,?,?,?,?,?)';
    return new Promise((resolve, reject) => {
        connect.query(query, [customer.name, customer.surname, customer.city, customer.adress, customer.email, customer.username, password], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        })
    })
};
updatingCustomerDataQuery = (email, customer, password) => {
    const query = 'UPDATE customer SET name=?,surname=?,city=?,adress=?,email=?,password=? WHERE email= ?';
    return new Promise((resolve, reject) => {
        connect.query(query, [customer.name, customer.surname, customer.city, customer.adress,
        customer.email, password, email], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};
getCustomerByEmailQuery = (email) => {
    const query = 'SELECT * FROM customer WHERE email = ?'
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
getSpecCustomerWithAccQuery = (email) => {
    const query = 'SELECT customer.name,customer.surname,account.account_number,account.balance \
    FROM customer JOIN account on account.customerId=customer.customer_id \
    WHERE customer.email=?;';
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
    getAllCustomersQuery,
    createCustomerQuery,
    getCustomerByEmailQuery,
    updatingCustomerDataQuery,
    getCustomerByEmailQuery,
    getSpecCustomerWithAccQuery,
}