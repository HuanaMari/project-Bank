const {getAllBranchQuery} = require('./wrappers');

getAllBranch =async(req,res)=>{
    try{
        let allBranch= await getAllBranchQuery();
        res.status(200).send(allBranch);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};
module.exports = {
    getAllBranch
}