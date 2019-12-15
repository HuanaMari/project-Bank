var jwt = require('jsonwebtoken');

checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res(status).send()
    }
};
verifyToken = (req, res, next) => {
    jwt.verify(req.token, 'customer', (err, authorizedData) => {
        if (err) {
            res.status(402).json('invalid token');
        } else {
            next()
        }
    });
};
checkEmployeeAuth = (req, res, next) => {
    jwt.verify(req.token, 'customer', (err, authorizedData) => {
        let employee = Object.keys(authorizedData.user)[0].split('_');
        if (employee[0] !== "employee") {
            res.status(401).json('Unauthorized: Access is denied due to invalid credentials');
        } else {
            next()
        }
    });
};
checkCustomerAuth = (req, res, next) => {
    jwt.verify(req.token, 'customer', (err, authorizedData) => {
        let customer = Object.keys(authorizedData.user)[0].split('_');
        if (customer[0] !== "customer") {

            res.status(401).json({ message: 'Unauthorized: Access is denied due to invalid credentials' });
        } else {
            next()
        }
    });
};
module.exports = {
    checkToken,
    verifyToken,
    checkEmployeeAuth,
    checkCustomerAuth,
}