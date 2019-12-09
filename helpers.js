var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const {checkToken}=require('./middleware/authentication');


jsonJoin = (obj, balance) => {
    let arr = [];
    let transactions = [];
    obj.forEach(e => {
        temp = {
            Name: e.name,
            Surname: e.surname,
            Account: e.account_number,
            Created: e.createdOn,
            Transactions: transactions,
            Balance: balance
        }
        arr.push(temp)
    });
    obj.forEach((x, i) => {
        arr[i].Transactions.push(x.transaction_amount);
    });
    return arr
};
jsonCustomerAccounts = (obj) => {
    let arr = [];
    let account = [];
    obj.forEach(e => {
        temp = {
            Name: e.name,
            Surname: e.surname,
            Accounts: account,
            Created: e.createdOn,
        }
        arr.push(temp)
    });
    obj.forEach((x, i) => {
        arr[i].Accounts.push(x.account_number);
    });
    return arr
};
emailFromToken = (req,res) => {
    const header = req.headers['authorization'];
    
    const bearer = header.split(' ');
    const token = bearer[1];
    let varijabilna = jwt.verify(token, 'customer', (err, authorizedData) => {
    return authorizedData.user.email
    });
    return varijabilna
};
loginRole = (user, employee, customer, pass) => {
    if (employee.length != 0) {
        user = employee;
    } else if (customer.length != 0) {
        user = customer
    } else {
        var error = new Error("Invalid email or password");
        error.status = 404;
        return error.message
    };
    user = user[0];
    let role = Object.keys(user)[0].split('_');
    const matchPass = bcrypt.compareSync(pass, user.password);
    if (matchPass) {
        var token = jwt.sign({ user }, 'customer', { expiresIn: '24h' });
        current = {
            role: role[0],
            token: token
        }
        return current
    } else {
        return "password you entered is incorect"
    }
};


module.exports = {
    jsonJoin,
    jsonCustomerAccounts,
    loginRole,
    emailFromToken
}