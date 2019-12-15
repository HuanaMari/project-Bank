var jwt = require('jsonwebtoken');
const { Transaction,Account } = require('./models')
var bcrypt = require('bcryptjs');

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
        var temp = new Transaction(x);
        temp = temp.TransactionToShow()
        arr[i].Transactions.push(temp);
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
emailFromToken = (req, res) => {
    const header = req.headers['authorization'];
    const bearer = header.split(' ');
    const token = bearer[1];
    let varijabilna = jwt.verify(token, 'customer', (err, authorizedData) => {
        return authorizedData.user.email
    });
    return varijabilna
};
idFromToken = (req, res) => {
    const header = req.headers['authorization'];
    const bearer = header.split(' ');
    const token = bearer[1];
    let varijabilna = jwt.verify(token, 'customer', (err, authorizedData) => {
        return authorizedData.user.customer_id
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
transactionJSON = (transactions) => {
    let arr = []
    transactions.forEach(e => {
        temp = {
            transaction_amount: e.transaction_amount,
            transaction_madeOn: e.transaction_madeOn
        }
        arr.push(temp)
    });
    return arr
};
accCusJoinJSON = (obj) => {
    let arr = [];
    let accounts = [];
    obj.forEach(e => {
        temp = {
            customerId: e.customerId,
            accounts: accounts
        }
        
        arr.push(temp)
    });
    obj.forEach((x, i) => {
        var temp = new Account(x);
        temp = temp.accNumber()
        arr[i].accounts.push(temp);
    });
    return arr
}
module.exports = {
    jsonJoin,
    jsonCustomerAccounts,
    loginRole,
    emailFromToken,
    transactionJSON,
    idFromToken,
    accCusJoinJSON
}