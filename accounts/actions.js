const accounts = require('./wrapers');

getAllAccounts =async(req,res)=>{
    try{
        let allAcc = await accounts.getAllAccountsQuery();
        res.status(200).send(allAcc);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

module.exports = {
    getAllAccounts
}