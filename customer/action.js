const {
    getAllCustomersQuery,
    createCustomerQuery} = require('./wrappers');
const {
    emailValidator} = require('../helpers');
var bcrypt = require('bcryptjs');


getAllCustomers = async (req, res) => {
    try {
        let allCus = await getAllCustomersQuery();
        console.log(allCus)
        res.status(200).send(allCus);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};
createCustomer = async (req, res,next) => {
    const customerRequest = req.body
    let isValid = emailValidator(req.body.email);
    console.log(req.body.email)
    if (!isValid) {
        var error = new Error('email is not valid');
        error.status = 402;
        next(error);
    } else {
        try {
            const passHash = bcrypt.hashSync(customerRequest.password, 10)
            await createCustomerQuery(customerRequest, passHash)
            res.status(200).send('Customer has been created');
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = {
    getAllCustomers,
    createCustomer
}