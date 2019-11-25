const {getAllEmployeesQuery} = require('./wrappers');

getAllEmployees =async(req,res)=>{
    try{
        let allEmp= await getAllEmployeesQuery();
        res.status(200).send(allEmp);
    }
    catch (error){
        res.status(500).send(error.message);

    }
};

module.exports = {
    getAllEmployees
}