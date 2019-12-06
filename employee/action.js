const { getAllEmployeesQuery, updateEmployeeDataQuery } = require('./wrappers');
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
    let id = req.params.id
    try {
        const passHash = bcrypt.hashSync(pass, 5)
        await updateEmployeeDataQuery(id,employeeReq, passHash);
        res.status(202).send('Employee data has been updated')
    }
    catch (error) {
        res.status(500).send(error.message)
    }
};

module.exports = {
    getAllEmployees,
    updateEmployeeData
}