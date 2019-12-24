const {getLoanWithAllDataByIdQuery, getAllLoansQuery, createLoanQuery, getLoanWithAllDataQuery } = require('./wrappers');
const { dataFromToken, instalments } = require('../helpers');

getAllLoans = async (req, res) => {
    try {
        let allCus = await getAllLoansQuery();
        res.status(200).send(allCus);
    }
    catch (error) {
        res.status(500).json(error.message);

    }
};
createLoan = async (req, res, next) => {
    let reqLoan =dataFromToken(req)
    let employeeId = reqLoan.employee_id
    let loan = req.body
    try {
        await createLoanQuery(loan,employeeId);
        res.status(200).send('Loan has been recorded');
    } catch (error) {
        res.status(500).json({ message: "Check your inputs" });
    }
};
getLoanWithAllData = async (req, res, next) => {
    let reqData = dataFromToken(req);
    let email = reqData.email
    try {
        let results = await getLoanWithAllDataQuery(email);
        if (results.length === 0) {
            var error = new Error('There is no loan to your account');
            error.status = 405
            next(error)
        } else {
            let ins = instalments(results)  
            res.status(200).send(ins[0]);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};
getLoanWithAllDataById = async (req, res, next) => {
   let id = req.body.loan_id
    try {
        let results = await getLoanWithAllDataByIdQuery(id);
        if (results.length === 0) {
            var error = new Error(`There is no loan with Id ${id}`);
            error.status = 405
            next(error)
        } else {
            let ins = instalments(results)  
            res.status(200).send(ins[0]);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};
module.exports = {
    getAllLoans,
    createLoan,
    getLoanWithAllData,
    getLoanWithAllDataById
}