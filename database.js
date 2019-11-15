var mySql = require('mysql');
require = ('dotenv/config');

var connect = mySql.createConnection({
    host:'localhost',
    user:'Kuzmanoska',
    password:'Banamilolo1',
    database:'bank'
});

connect.connect((error)=>{
    if(error){
        console.log('Problem with DB connection:' + error.message)
    }
    else{
        console.log('DataBase connected!')
    }
});

module.exports = connect;