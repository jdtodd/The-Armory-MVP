const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  database: 'TheArmory',
  user: 'root',
  password: 'password'
})

connection.connect();

module.exports = connection;