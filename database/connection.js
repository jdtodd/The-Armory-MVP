const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'thearmory.cuez6de6mwyl.us-east-2.rds.amazonaws.com',
  database: 'TheArmory',
  user: 'root',
  password: 'password',
  ssl: 'Amazon RDS',
  port: '3306',
  connectionTimeout: '20000',
});

connection.connect();

module.exports = connection;
