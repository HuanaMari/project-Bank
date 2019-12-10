const { getAllEmployeesQuery, updateEmployeeDataQuery,getEmployeeByEmailQuery } = require('./wrappers');
const{emailFromToken}=require('../helpers')
var bcrypt = require('bcryptjs');


getAllEmployees = async (req, res) => {
    try {
        let allEmp = await getAllEmployeesQuery();
        res.status(200).send(allEmp);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
updateEmployeeData = async (req, res) => {
    let employeeReq = req.body
    const pass = req.body.password
    let email = emailFromToken(req);
   
    try {
        const passHash = bcrypt.hashSync(pass, 5)
        await updateEmployeeDataQuery(email,employeeReq, passHash);
        res.status(202).send('Employee data has been updated')
    }
    catch (error) {
        error.message = 'You do not have permission to view this directory or page using the credentials that you supplied.'
        res.status(500).send(error)
    }
};
module.exports = {
    getAllEmployees,
    updateEmployeeData
}