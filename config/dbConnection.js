var mysql = require('mysql');

var connMySQL = function(){
    return connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'bemobi-lucasliu'
    });
}

module.exports = function(){
    return connMySQL;
}