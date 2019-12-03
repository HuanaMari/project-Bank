const { getAllLoansQuery,
    createLoanQuery,
    getSpecificLoanQuery } = require('./wrappers');
const { sumTransactionQuery } = require('../transactions/wrappers')
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
getSpecLoan = async (req, res, next) => {
    let loanReq = req.params.id
    try {
        let sumAmount = await sumTransactionQuery(loanReq);
        let spec = await getSpecificLoanQuery(loanReq);
        console.log(spec)
        var edna = spec[0].amount - sumAmount[0].Total
        let object = {
            borrowedOn:spec[0].borrowedOn,
            customerId:spec[0].customerId,
            employeeId:spec[0].employeeId,
            remain: edna        
        }
        res.status(200).send(object);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllLoans,
    createLoan,
    getSpecLoan
}