const express = require('express');
const crudRoutes = require('./Routes/CRUD');
const bodyParser = require('body-parser');
const cors = require('cors')
const morgan = require('morgan')
const db = require('./db');
const axios = require('axios');
const fs = require('fs').promises;
// const bcrypt = require('bcrypt');
const path = require('path');


const app = express();
const port = 4000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(morgan('dev'))

app.use(express.static('public'));
app.use('/api', crudRoutes);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const username = req.query.username;
  res.render('pages/index', { pageTitle: 'Home', username: username });
});

app.get('/index1', (req, res) => {
  res.render('pages/index1', { pageTitle: 'Index 1' });
});

app.get('/jsondata', async (req, res) => {
    const dataUrl = 'https://159.100.9.179:4000/products.json'; 
    try {
      const response = await axios.get(dataUrl);
      const jsonData = response.data;
      const outputPath = path.join(__dirname, 'output.json');
      await fs.writeFile(outputPath, JSON.stringify(jsonData, null, 2));   
      res.send(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  })
app.get('/login', (req, res) => {
    res.render('pages/login', { pageTitle: 'sign in' });
  });

  app.get('/dashboard', (req, res) => {
    res.render('pages/dashboard', { pageTitle: 'Dashboard' });
});

app.get('/checkout/:id', async (req, res) => {
  const id =parseInt( req.params.id);
  console.log(id);
  try {
    const response = await axios.get('https://159.100.9.179:4000/jsondata');
    const records = response.data;

    // Find the item with the matching itemId
    const selectedItem = records.find(item => item.itemId === id);

    if (selectedItem) {
        // If the item is found, render the checkout page with the item details
        res.render('pages/checkout', { pageTitle: 'Checkout', item: selectedItem });
    } else {
        // If no matching item is found, send a 404 response
        res.status(404).send('Item not found');
    }
} catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send('Internal Server Error');
}
});
app.get('/cartitem/:id/:user', async (req, res) => {
  const id =parseInt( req.params.id);
  const user= parseInt(req.params.user)
  console.log(id);
  try {
    const response = await axios.get('https://159.100.9.179:4000/jsondata');
    const records = response.data;

    // Find the item with the matching itemId
    const selectedItem = records.find(item => item.itemId === id);

    if (selectedItem) {
        // If the item is found, render the checkout page with the item details
        // add to cart
        const cartQuery = 'Insert into cart set ?'
        const data = {
          user_id:user,
          product_id:selectedItem.itemId,
          product_name:selectedItem.itemName,
          image:selectedItem.itemImage,
          price:selectedItem.itemPrice
        }
       db.query(cartQuery,[data])
        res.status(200).json(selectedItem)
    } else {
        // If no matching item is found, send a 404 response
        res.status(404).send('Item not found');
    }
} catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send('Internal Server Error');
}
});
app.get('/cart/:id', (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM cart WHERE user_id = ?`;

  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ' + error.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // If records are found, send them as JSON response
    res.status(200).json(results);
  });
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

        const userId = generateRandomString(8);

        const insertQuery = 'INSERT INTO users (user_id, username, email, password) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [userId, newUsername, newEmail, newPassword], (insertErr) => {
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
    try {

      const { username, password } = req.body;
          if (!username || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const signInQuery = 'SELECT * FROM users WHERE username = ? AND password = ?';
        db.query(signInQuery, [username, password], (signInErr, signInResults) => {
            if (signInErr) {
                console.error('Error during sign-in:', signInErr);
                res.status(500).json({ success: false, message: 'Internal Server Error' });
            } else if (signInResults.length > 0) {
                const user = signInResults[0];
                console.log(user)
                if (user.userType === 'admin') {
                   console.log('admin')

                  res.render('pages/dashboard', { pageTitle: 'Dashboard',data:user });
                } if(user.userType === 'user') {
                console.log('user')

                  res.render('pages/index1', { pageTitle: 'Index 1', data:user });
                }
                else {
                  console.log('fail')
                  res.render('pages/login', { pageTitle: 'sign in',  message: 'Invalid credentials'});
                }
            }
        });
      
    } catch (error) {
      console.log(error)
      
    }

});

// Function to generate a random string of specified length
function generateRandomString(length) {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const startChar = 'K';
  let result = startChar;
  for (let i = 1; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
  }
  return result;
}

// Function to check if a user ID already exists in the database
function isUserIdExists(userId, callback) {
  const checkQuery = 'SELECT COUNT(*) AS count FROM users WHERE user_id = ?';
  db.query(checkQuery, [userId], (err, results) => {
      if (err) {
          callback(err);
      } else {
          callback(null, results[0].count > 0);
      }
  });
}

// Generate a unique user ID
function generateUniqueUserId(callback) {
  let userId = generateRandomString(8);
  isUserIdExists(userId, (err, exists) => {
      if (err) {
          callback(err);
      } else if (exists) {       
          generateUniqueUserId(callback);
      } else {
          callback(null, userId);
      }
  });
}


generateUniqueUserId((err, userId) => {
  if (err) {
      console.error('Error generating unique user ID:', err);
  } else {
      console.log('Unique User ID:', userId);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
