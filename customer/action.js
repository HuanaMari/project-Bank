const customer = require('./wrappers');

getAllCustomers =async(req,res)=>{
    try{
        let allCus= await customer.getAllCustomersQuery();
        res.status(200).send(allCus);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

module.exports = {
    getAllCustomers
}