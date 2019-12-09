var jwt = require('jsonwebtoken');
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
        arr[i].Transactions.push(x.transaction_amount);
    });
    return arr
};
loginRole = (user, employee, customer, pass) => {
    if (employee.length != 0) {
        user = employee;
    } else if (customer.length != 0) {
        user = customer
    } else {
        var error = new Error("wrong credentials");
        error.status = 404;
        return error.message
    };
    user = user[0];
    let role = Object.keys(user)[0].split('_');
    const matchPass = bcrypt.compareSync(pass,user.password);
    if (matchPass) {
        var token = jwt.sign({ user }, 'customer', { expiresIn: '24h' });
        current = {
            role: role[0],
            token: token
        }
        return current
    } else {
        return false
    }
};


module.exports = {
    jsonJoin,
    loginRole
}