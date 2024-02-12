const mysql = require('mysql2')

const db_con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shoppinn',
  });
  
  db_con.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });
  module.exports = db_con;