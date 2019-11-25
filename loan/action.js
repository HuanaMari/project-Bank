const {getAllLoansQuery} = require('./wrappers');

getAllLoans =async(req,res)=>{
    try{
        let allCus= await getAllLoansQuery();
        res.status(200).send(allCus);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

module.exports = {
    getAllLoans
}