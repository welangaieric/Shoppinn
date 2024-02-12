const express = require('express');
const router = express.Router();
const db = require('../db')
// Create (POST)
router.post('/users', (req, res) => {
  const newUser = req.body;
  const sql = 'INSERT INTO users SET ?';

  db.query(sql, newUser, (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: err.message });
    } else {
      newUser.user_id = result.insertId;
      res.json(newUser);
    }
  });
});


// Read all users (GET)
router.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving users:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Read one user by ID (GET)
router.get('/users/:user_id', (req, res) => {
  const userId = parseInt(req.params.user_id);
  const sql = 'SELECT * FROM users WHERE user_id = ?';

  db.query(sql, userId, (err, results) => {
    if (err) {
      console.error('Error retrieving user:', err);
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Update (PUT)
router.put('/users/:user_id', (req, res) => {
  const userId = parseInt(req.params.user_id);
  const updatedUser = req.body;
  const sql = 'UPDATE users SET ? WHERE user_id = ?';

  db.query(sql, [updatedUser, userId], (err) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'User updated successfully' });
    }
  });
});

// Delete (DELETE)
router.delete('/users/:user_id', (req, res) => {
  const userId = parseInt(req.params.user_id);
  const sql = 'DELETE FROM users WHERE user_id = ?';

  db.query(sql, userId, (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  });
});

/*purchases*/
// Create (POST)
router.post('/purchases', (req, res) => {
  const newPurchase = req.body;
  const sql = 'INSERT INTO purchases SET ?';

  db.query(sql, newPurchase, (err, result) => {
    if (err) {
      console.error('Error creating purchase:', err);
      res.status(500).json({ error: err.message });
    } else {
      newPurchase.purchase_id = result.insertId;
      res.json(newPurchase);
    }
  });
});

// Read all purchases (GET)
router.get('/purchases', (req, res) => {
  const sql = 'SELECT * FROM purchases';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving purchases:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Get a specific purchase by Purchase ID
router.get('/purchases/:purchase_id', (req, res) => {
  const purchaseId = parseInt(req.params.purchase_id);
  const sql = 'SELECT * FROM purchases WHERE purchase_id = ?';

  db.query(sql, purchaseId, (err, results) => {
    if (err) {
      console.error('Error retrieving purchase:', err);
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Purchase not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Update a purchase by Purchase ID
router.put('/purchases/:purchase_id', (req, res) => {
  const purchaseId = parseInt(req.params.purchase_id);
  const updatedPurchase = req.body;
  const sql = 'UPDATE purchases SET ? WHERE purchase_id = ?';

  db.query(sql, [updatedPurchase, purchaseId], (err) => {
    if (err) {
      console.error('Error updating purchase:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Purchase updated successfully' });
    }
  });
});

// Delete a purchase by Purchase ID
router.delete('/purchases/:purchase_id', (req, res) => {
  const purchaseId = parseInt(req.params.purchase_id);
  const sql = 'DELETE FROM purchases WHERE purchase_id = ?';

  db.query(sql, purchaseId, (err, result) => {
    if (err) {
      console.error('Error deleting purchase:', err);
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Purchase not found' });
    } else {
      res.json({ message: 'Purchase deleted successfully' });
    }
  });
});

/*cart*/
// Create (POST)
router.post('/cart', (req, res) => {
  const newCartItem = req.body;
  const sql = 'INSERT INTO cart SET ?';

  db.query(sql, newCartItem, (err, result) => {
    if (err) {
      console.error('Error adding item to cart:', err);
      res.status(500).json({ error: err.message });
    } else {
      newCartItem.cart_item_id = result.insertId;
      res.json(newCartItem);
    }
  });
});

// Read all cart items for a user (GET)
// router.get('/cart/:user_id', (req, res) => {
//   const userId = parseInt(req.params.user_id);
//   const sql = 'SELECT * FROM cart WHERE user_id = ?';

//   db.query(sql, userId, (err, results) => {
//     if (err) {
//       console.error('Error retrieving cart items:', err);
//       res.status(500).json({ error: err.message });
//     } else {
//       res.json(results);
//     }
//   });
// });


// Update cart item (PUT)
router.put('/cart/:user_id', (req, res) => {
  const userId = parseInt(req.params.user_id);
  const updatedCartItem = req.body;
  const sql = 'UPDATE cart SET ? WHERE user_id = ?';

  db.query(sql, [updatedCartItem, userId], (err) => {
    if (err) {
      console.error('Error updating cart item:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Cart item updated successfully' });
    }
  });
});

// Delete cart item (DELETE)
router.delete('/cart/:user_id', (req, res) => {
  const userId = parseInt(req.params.user_id);
  const sql = 'DELETE FROM cart WHERE id = ?';

  db.query(sql, userId, (err, result) => {
    if (err) {
      console.error('Error deleting cart item:', err);
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Cart item not found' });
    } else {
      res.json({ message: 'Cart item deleted successfully' });
    }
  });
});

/*checkout*/
// Create (POST)
router.post('/checkout', (req, res) => {
  const newCheckout = req.body;
  const sql = 'INSERT INTO checkout SET ?';

  db.query(sql, newCheckout, (err, result) => {
    if (err) {
      console.error('Error creating checkout:', err);
      res.status(500).json({ error: err.message });
    } else {
      newCheckout.checkout_id = result.insertId;
      res.json(newCheckout);
    }
  });
});

// Read all checkouts for a user (GET)
router.get('/checkout/:user_id', (req, res) => {
  const userId = parseInt(req.params.user_id);
  const sql = 'SELECT * FROM checkout WHERE user_id = ?';

  db.query(sql, userId, (err, results) => {
    if (err) {
      console.error('Error retrieving checkouts:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Update checkout by ID (PUT)
router.put('/checkout/:checkout_id', (req, res) => {
  const checkoutId = parseInt(req.params.checkout_id);
  const updatedCheckout = req.body;
  const sql = 'UPDATE checkout SET ? WHERE checkout_id = ?';

  db.query(sql, [updatedCheckout, checkoutId], (err) => {
    if (err) {
      console.error('Error updating checkout:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Checkout updated successfully' });
    }
  });
});

// Delete checkout by ID (DELETE)
router.delete('/checkout/:checkout_id', (req, res) => {
  const checkoutId = parseInt(req.params.checkout_id);
  const sql = 'DELETE FROM checkout WHERE checkout_id = ?';

  db.query(sql, checkoutId, (err, result) => {
    if (err) {
      console.error('Error deleting checkout:', err);
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Checkout not found' });
    } else {
      res.json({ message: 'Checkout deleted successfully' });
    }
  });
});

/*products*/
// Create (POST)
router.post('/products', (req, res) => {
  const newProduct = req.body;
  const sql = 'INSERT INTO products SET ?';

  db.query(sql, newProduct, (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      res.status(500).json({ error: err.message });
    } else {
      newProduct.product_id = result.insertId;
      res.json(newProduct);
    }
  });
});

// Read all products (GET)
router.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving products:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;