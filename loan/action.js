const {getAllLoansQuery,
    getTransactionsForLoanQuery} = require('./wrappers');

getAllLoans =async(req,res)=>{
    try{
        let allCus= await getAllLoansQuery();
        res.status(200).send(allCus);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};
getTransactionsForLoan= async (req, res, next) => {
    try {
        let total = await getTransactionsForLoanQuery(req.params.id);
        res.status(200).send(total);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
module.exports = {
    getAllLoans,
    getTransactionsForLoan
}