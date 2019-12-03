const { getAllLoansQuery,
    sumOfTransactionsForLoanQuery,
    createLoanQuery } = require('./wrappers');

getAllLoans = async (req, res) => {
    try {
        let allCus = await getAllLoansQuery();
        res.status(200).send(allCus);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};
sumTransactionsForLoan = async (req, res, next) => {
    try {
        let total = await sumOfTransactionsForLoanQuery(req.params.id);
        res.status(200).send(total);
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
}
module.exports = {
    getAllLoans,
    sumTransactionsForLoan,
    createLoan
}