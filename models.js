class Account {
    constructor(account_number, createdOn, balance, branchId) {
        this.account_number = account_number;
        this.createdOn = createdOn;
        this.balance = balance;
        this.branchId = branchId;
    }
}

class Customer {
    constructor(name, surname, city, adress, accountId, email, username, password) {
        this.name = name,
            this.surname = surname,
            this.city = city,
            this.adress = adress,
            this.accountId = accountId,
            this.email = email,
            this.username = username,
            this.password = password
    }
}
class Loan {
    constructor(borrowedOn, amount, accountId, customerId, employeeId) {
        this.borrowedOn = borrowedOn,
            this.amount = amount,
            this.accountId = accountId,
            this.customerId = customerId,
            this.employeeId = employeeId
    }
}

module.exports = {
    Account,
    Customer,
    Loan
}
