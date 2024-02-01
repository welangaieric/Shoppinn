const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index', { pageTitle: 'Home' });
});
app.get('/login', (req, res) => {
    res.render('pages/login', { pageTitle: 'sign in' });
  });
  app.get('/checkout', (req, res) => {
    res.render('pages/checkout', { pageTitle: 'checkout' });
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
