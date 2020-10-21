const mysql = require('mysql');

const conexion = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'clima'
});

conexion.connect(function (e){
    if(e){
        console.log("Error: " + e);
    }else{
        console.log('DB conectada');
    }
});

module.exports = conexion;