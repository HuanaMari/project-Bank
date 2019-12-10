const { getAllLoansQuery, createLoanQuery, getSpecificLoanQuery, getLoanWithAllDataQuery } = require('./wrappers');
const { sumTransactionQuery } = require('../transactions/wrappers');
const { emailFromToken } = require('../helpers');
const { Account, Customer, Loan, Transaction } = require('../models');

getAllLoans = async (req, res) => {
    try {
        let allCus = await getAllLoansQuery();
        res.status(200).send(allCus);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};
createLoan = async (req, res, next) => {
    let loan = req.body
    try {
        await createLoanQuery(loan);
        res.status(200).send('Loan has been recorded');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
getPostsForUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const result = await getPostsForUserQuery(userId);
        const dbUser = result[0];
        let user = new User(dbUser.Name, dbUser.Surname, dbUser.Email, dbUser.Age, dbUser.IsActive, []);
        let posts = result.map(x => {
            return new Post(x.Text, x.Likes, x.CreatedOn);
        });
        user.posts = posts;
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}
getSpecLoan = async (req, res, next) => {
    let loanReq = req.params.id
    try {
        let sumAmount = await sumTransactionQuery(loanReq);
        let specLoan = await getSpecificLoanQuery(loanReq);
        let spec = specLoan[0]
        var total = spec.amount - sumAmount[0].Total
        let loan = new Loan(spec);
        let loanToShow = loan.loanToShow();

        loanToShow.total = total;
        res.status(200).send(loan);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
getLoanWithAllData = async (req, res, next) => {
    let email = emailFromToken(req);
    try {
        let results = await getLoanWithAllDataQuery(email);
        let dbLoan = results[0];
        let sumAmount = await sumTransactionQuery(dbLoan.account_id);
        var total = dbLoan.amount - sumAmount[0].Total

        let loanRes = new Loan (dbLoan);
        let loan = loanRes.loanToShow();

        let dbtransactions = new Transaction(results[0]);

        let tran = dbtransactions.TransactionToShow();

        console.log(tran)


        res.status(200).send(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllLoans,
    createLoan,
    getSpecLoan,
    getLoanWithAllData
}