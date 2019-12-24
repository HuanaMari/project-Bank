var jwt = require('jsonwebtoken');
const { Transaction, Account } = require('./models');
var bcrypt = require('bcryptjs');

dataFromToken = (req, res) => {
    const header = req.headers['authorization'];
    const bearer = header.split(' ');
    const token = bearer[1];
    let results = jwt.verify(token, 'customer', (err, authorizedData) => {
        return authorizedData.user
    });
    return results
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
};
sumOutInflow = (obj) => {
    let ouflow = Object.values(obj)[0]
    let inflow = Object.values(obj)[1]
    let temp = {
        Total_ouflow: ouflow,
        Total_inflow: inflow,
    }
    return temp
};
BankStatementJSON = (obj) => {
    let arr = [];
    let outFlow = [];
    let inFlow = [];
    let sumOut = 0
    let sumIn = 0

    obj.forEach(e => {
        temp = {
            name: e.name,
            surname: e.surname,
            accountId: e.accountId,
            createdOn: e.createdOn,
            outflow: outFlow,
            inflow: inFlow,
            old_Balance:e.balance,
            total_Outflow: sumOut,
            total_inFlow: sumIn,
            new_Balance: 0
        }
        arr.push(temp)
    });
            obj.forEach((x, i) => {
                arr[0].outflow.push(x.Outflow);
                arr[0].inflow.push(x.Inflow);
                arr[0].total_Outflow += x.Outflow
                arr[0].total_inFlow += x.Inflow
            });

            arr[0].new_Balance = arr[0].old_Balance +  (arr[0].total_Outflow + arr[0].total_inFlow)
    return arr
};
instalments = (obj) => {
    let arr = [];
    let rata = [];
    var sumOfTransactions = 0

    obj.forEach(y => {
        if (y.Instalments < 0) {
            temp = {
                Instalments: y.Instalments,
                transaction_madeOn: y.transaction_madeOn
            }
            rata.push(temp)
            sumOfTransactions += y.Instalments
        }
    });
    obj.forEach((x) => {
        temp = {
            borrowedOn: x.borrowedOn,
            amount: x.amount,
            name: x.name,
            surname: x.surname,
            account_id: x.account_id,
            account_number: x.account_number,
            instalments: rata,
            Remains: x.amount + sumOfTransactions
        }
        arr.push(temp)
    });
    return arr
};
module.exports = {
    jsonJoin,
    jsonCustomerAccounts,
    loginRole,
    transactionJSON,
    accCusJoinJSON,
    BankStatementJSON,
    dataFromToken,
    sumOutInflow,
    instalments
}