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
            accountId: this.obj.account_id,
            account_number: this.obj.account_number,
        }
        return temp
    }
};
class Customer {
    constructor(customers) {
        this.customers = customers
        this.name = customers.name,
            this.surname = customers.surname,
            this.city = customers.city,
            this.adress = customers.adress,
            this.email = customers.email,
            this.username = customers.username,
            this.password = customers.password
    };
    customerToShow() {
        let temp = {
            name: this.customers.name,
            surname: this.customers.surname
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
    constructor(transactions) {
        this.transactions = transactions,
            this.transaction_amount = transactions.transaction_amount;
        this.transaction_madeOn = transactions.transaction_madeOn;
        this.accountId = transactions.accountId,
        this.customerId = transactions.customerId
    };
    TransactionToShow() {
        let temp = {
            transaction_amount: this.transactions.transaction_amount,
            transaction_madeOn: this.transactions.transaction_madeOn
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
