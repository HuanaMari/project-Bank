const { getAllLoansQuery,
    createLoanQuery,
    getSpecificLoanQuery } = require('./wrappers');
const { sumTransactionQuery } = require('../transactions/wrappers');
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
        let loan = new Loan(spec.borrowedOn, spec.amount, spec.accountId, spec.customerId, spec.employeeId)
        // let object = {
        //     borrowedOn:spec[0].borrowedOn,
        //     customerId:spec[0].customerId,
        //     employeeId:spec[0].employeeId,
        //     remain: total        
        // }
        loan.total = total;
        res.status(200).send(loan);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllLoans,
    createLoan,
    getSpecLoan
}