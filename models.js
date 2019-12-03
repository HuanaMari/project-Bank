class Account {
    constructor(obj) {
        this.obj = obj;
        this.account_number = obj.account_number;
        this.createdOn = obj.createdOn;
        this.balance = obj.balance;
        this.branchId = obj.branchId;
        this.customerId = obj.customerId;
    }
};
class Customer {
    constructor(obj) {
        this.obj = obj;
        this.name = obj.name,
        this.surname = obj.surname,
        this.city = obj.city,
        this.adress = obj.adress,
        this.email = obj.email,
        this.username = obj.username,
        this.password = obj.password
    }
}
class Loan {
    constructor(obj) {
        this.obj = obj;
        this.borrowedOn = obj.borrowedOn,
        this.amount = obj.amount,
        this.accountId = obj.accountId,
        this.customerId = obj.customerId,
        this.employeeId = obj.employeeId
    }
};
class Transaction {
    constructor(obj) {
        this.obj = obj;
        this.transaction_amount = obj.transaction_amount;
        this.transaction_madeOn = obj.transaction_madeOn;
        this.accountId = obj.accountId
    }
};

module.exports = {
    Account,
    Customer,
    Loan,
    Transaction
}
