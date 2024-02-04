const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors')
const morgan = require('morgan')
// const bcrypt = require('bcrypt');

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(morgan('dev'))

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shoppinn',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const username = req.query.username;
  res.render('pages/index', { pageTitle: 'Home', username: username });
});

app.get('/index1', (req, res) => {
  const username = req.query.username;
  res.render('pages/index1', { pageTitle: 'index1', username: username });
});

app.get('/login', (req, res) => {
    res.render('pages/login', { pageTitle: 'sign in' });
  });
  app.get('/checkout', (req, res) => {
    res.render('pages/checkout', { pageTitle: 'checkout' });
  });


  app.post('/register', (req, res) => {
    const { newUsername, newEmail, newPassword } = req.body;

   
  
    
    
    const checkQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(checkQuery, [newUsername, newEmail], (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Error checking existing user:', checkErr);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      } else if (checkResults.length > 0) {
        res.status(400).json({ success: false, message: 'Username or email already exists' });
      } else {
        
        const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(insertQuery, [newUsername, newEmail, newPassword], (insertErr) => {
          if (insertErr) {
            console.error('Error inserting new user:', insertErr);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
          } else {
            res.json({ success: true, message: 'Registration successful' });
          }
        });
      }
    });
  });

  app.post('/signin', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
   
    const signInQuery = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(signInQuery, [username, password], (signInErr, signInResults) => {
      if (signInErr) {
        console.error('Error during sign-in:', signInErr);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      } else if (signInResults.length > 0) {
        res.json({ success: true, message: 'Sign-in successful', username: signInResults[0].username });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    });
  });
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
