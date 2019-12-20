const accounts = require('./wrapers');
const { sumTransactionQuery } = require('../transactions/wrappers');
const { dataFromToken,jsonJoin, accCusJoinJSON } = require('../helpers');

createAccount = async (req, res) => {
    try {
        let account = await accounts.createAccountQuery(req.body)
        res.status(201).send("account has been created")
    } catch (error) {
        res.status(500).json(error.message)
    }
};
getAllAccounts = async (req, res) => {
    try {
        let allAcc = await accounts.getAllAccountsQuery();
        res.status(200).send(allAcc);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
};
getAccWithCustomerAndTrans = async (req, res, next) => {
    try {
        let sumAmount = await sumTransactionQuery(req.params.account);
        let join = await accounts.getAccountWithCustomerAndTransactionsQuery(req.params.account);
        if (join.length === 0) {
            var error = new Error('This account does not exist');
            error.status = 402;
            next(error);
        } else {
            let dbAccount = join[0];
            var newBalance = dbAccount.balance + sumAmount[0].Total;
            let data = jsonJoin(join, newBalance);
            res.status(200).send(data[0]);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
getJoineData = async (req, res, next) => {
    let data = dataFromToken(req);
    let email = data.email;
    try {
        let sumAmount = await sumTransactionQuery(data.customer_id);
        let join = await accounts.getJoineDataForAccByEmailQuery(email);
        if (join.length === 0) {
            var error = new Error('This account does not exist');
            error.status = 402;
            next(error);
        } else {
            let dbAccount = join[0];
            var newBalance = dbAccount.balance + sumAmount[0].Total;
            let data = jsonJoin(join, newBalance);
            res.status(200).send(data[0]);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
getAccForSpecCustomer = async (req, res, next) => {
    let customerId = req.body.customerId
    if (customerId === 0) {
        var error = new Error('CustomerId cannot be 0');
        error.status = 402;
        next(error);
    } else {
        try {
            let reqCustomer = await accounts.getAccForSpecCustomerQuery(req.body.customerId);
            let reqAccounts = accCusJoinJSON(reqCustomer)
            res.status(200).send(reqAccounts[0]);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};
module.exports = {
    getAllAccounts,
    createAccount,
    getAccWithCustomerAndTrans,
    getAccForSpecCustomer,
    getJoineData
}