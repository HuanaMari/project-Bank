class Account {
    constructor(obj) {
        this.obj = obj
        this.account_number = obj.account_number;
        this.createdOn = obj.createdOn;
        this.balance = obj.balance;
        this.branchId = obj.branchId;
        this.customerId = obj.customerId;
    };
    accountToShow() {
        let temp = {
            account_number: this.obj.account_number,
            createdOn: this.obj.createdOn,
            balance: this.obj.balance
        }
        return temp
    };
    accNumber(){
        let temp ={
            account_number: this.obj.account_number,
        }
        return temp
    }
};
class Customer {
    constructor(obj) {
        this.obj = obj
        this.name = obj.name,
            this.surname = obj.surname,
            this.city = obj.city,
            this.adress = obj.adress,
            this.email = obj.email,
            this.username = obj.username,
            this.password = obj.password
    };
    customerToShow() {
        let temp = {
            name: this.obj.name,
            surname: this.obj.surname
        }
        return temp
    };
};
class Loan {
    constructor(obj) {
        this.obj = obj
        this.borrowedOn = obj.borrowedOn,
            this.amount = obj.amount,
            this.accountId = obj.accountId,
            this.customerId = obj.customerId,
            this.employeeId = obj.employeeId
    };
    loanToShow() {
        let temp = {
            borrowedOn: this.obj.borrowedOn,
            amount: this.obj.amount
        }
        return temp
    };
};
class Transaction {
    constructor(obj) {
        this.obj = obj,
            this.transaction_amount = obj.transaction_amount;
        this.transaction_madeOn = obj.transaction_madeOn;
        this.accountId = obj.accountId
    };
    TransactionToShow() {
        let temp = {
            transaction_amount: this.obj.transaction_amount,
            transaction_madeOn: this.obj.transaction_madeOn
        }
        return temp
    };
};

module.exports = {
    Account,
    Customer,
    Loan,
    Transaction
}
