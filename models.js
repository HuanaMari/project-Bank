class Account {
    constructor(account_number,createdOn,balance,branchId,customerId) {
        this.account_number = account_number;
        this.createdOn = createdOn;
        this.balance = balance;
        this.branchId = branchId;
        this.customerId = customerId;
    }
};
class Customer {
    constructor(name,surname,city,adress,email,username,password) {
        this.name = name,
            this.surname = surname,
            this.city = city,
            this.adress = adress,
            this.email = email,
            this.username = username,
            this.password = password
    }
};
class Loan {
    constructor(borrowedOn,amount,accountId,customerId,employeeId) {
        this.borrowedOn = borrowedOn,
            this.amount = amount,
            this.accountId = accountId,
            this.customerId = customerId,
            this.employeeId = employeeId
    }
};
class Transaction {
    constructor(transaction_amount,transaction_madeOn,accountId) {
        this.transaction_amount = transaction_amount;
        this.transaction_madeOn = transaction_madeOn;
        this.accountId = accountId
    }
};

module.exports = {
    Account,
    Customer,
    Loan,
    Transaction
}
