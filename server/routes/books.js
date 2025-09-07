// routes/books.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authenticate = require('../middleware/auth');
const permit = require('../middleware/roles');

// Add book - Admin only
router.post('/', authenticate, permit('Admin'), bookController.addBook);

// Get books - public or authenticated; supports ?available=true
router.get('/', bookController.getBooks);

// Borrow a book - any authenticated Member or Admin (we allow Admin to borrow too)
router.post('/:id/borrow', authenticate, permit('Member', 'Admin'), bookController.borrowBook);

// Return a book - borrower or Admin
router.post('/:id/return', authenticate, permit('Member', 'Admin'), bookController.returnBook);

module.exports = router;
