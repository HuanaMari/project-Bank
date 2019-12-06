const {getAllCustomersQuery,createCustomerQuery,getUCustomerByEmailQuery,updatingCustomerDataQuery } = require('./wrappers');
var jwt = require('jsonwebtoken');
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
createCustomer = async (req, res, next) => {
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
updateCustomer = async (req, res, next) => {
    let customerReq = req.body
    let customerId= req.params.customer_id
    const pass = req.body.password
 try{
    const passHash = bcrypt.hashSync(pass, 5)
     var customer = await updatingCustomerDataQuery(customerId,customerReq,passHash)
     res.status(202).send('Customers data has been updated')
 }
 catch(error){
     res.status(500).send(error.message)
 }
};
loginCustomer = async (req, res, next) => {
    const email = req.body.email;
    const pass = req.body.password;
    console.log(newCustomer)
    try {
        var customer = await getUCustomerByEmailQuery(email);
        var newCustomer = customer[0];
        const matchPass = bcrypt.compareSync(pass,newCustomer.password);
        if (matchPass) {
            var token = jwt.sign({ newCustomer }, 'customer', { expiresIn: '12h' });
            res.status(202).send(token);
        }
        else {
            res.status(401).send("wrong password");
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllCustomers,
    createCustomer,
    updateCustomer,
    loginCustomer
}