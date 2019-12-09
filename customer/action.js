const { getAllCustomersQuery, createCustomerQuery, getCustomerByEmailQuery, updatingCustomerDataQuery } = require('./wrappers');
const { getEmployeeByEmailQuery } = require('../employee/wrappers');
const { loginRole } = require('../helpers');
var bcrypt = require('bcryptjs');


getAllCustomers = async (req, res) => {
    try {
        let allCus = await getAllCustomersQuery();
        res.status(200).send(allCus);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
createCustomer = async (req, res) => {
    const customerRequest = req.body
    const pass = req.body.password
    try {
        const passHash = bcrypt.hashSync(pass, 5)
        console.log(passHash)
        await createCustomerQuery(customerRequest, passHash)
        res.status(200).send('Customer has been created');
    } catch (error) {
        res.status(500).send(error.message)
    }
};
updateCustomer = async (req, res) => {
    let customerReq = req.body
    let customerId = req.params.customer_id
    const pass = req.body.password
    try {
        const passHash = bcrypt.hashSync(pass, 5)
        var customer = await updatingCustomerDataQuery(customerId, customerReq, passHash)
        res.status(202).send('Customer data has been updated')
    }
    catch (error) {
        res.status(500).send(error.message)
    }
};
login = async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    try {
        let user
        let employee = await getEmployeeByEmailQuery(email);
        let customer = await getCustomerByEmailQuery(email);
        let bool = loginRole(user, employee, customer, pass)
        res.send(bool)
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllCustomers,
    createCustomer,
    updateCustomer,
    login
}