const accounts = require('./wrapers');
const { Account,
    Customer,
    Loan
} = require('../models');

getAllAccounts = async (req, res) => {
    try {
        let allAcc = await accounts.getAllAccountsQuery();
        res.status(200).send(allAcc);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};
getAccByBalance = async (req, res) => {
    try {
        let allAccByBalance = await accounts.getSpecificAccountByBalanceQuery(req.body.balance);
        res.status(200).send(allAccByBalance);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
}

module.exports = {
    getAllAccounts,
    getAccByBalance
}