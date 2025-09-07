const Book = require('../models/Book');

// POST /api/books - Add new book (Admin only)
exports.addBook = async (req, res) => {
	try {
		const { title, author, isbn } = req.body;
		if (!title || !author || !isbn) return res.status(400).json({ message: 'title, author and isbn are required' });

		const existing = await Book.findOne({ isbn });
		if (existing) return res.status(400).json({ message: 'Book with this ISBN already exists' });

		const book = new Book({ title, author, isbn });
		await book.save();
		res.status(201).json(book);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

// GET /api/books - Get all books or only available? We'll support query ?available=true
exports.getBooks = async (req, res) => {
	try {
		const { available } = req.query;
		const filter = {};
		if (available === 'true') filter.available = true;
		else if (available === 'false') filter.available = false;

		const books = await Book.find(filter).populate('borrowedBy', 'name email role');
		res.json(books);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

// POST /api/books/:id/borrow - Borrow a book (Member)
exports.borrowBook = async (req, res) => {
	try {
		const { id } = req.params;
		const book = await Book.findById(id);
		if (!book) return res.status(404).json({ message: 'Book not found' });
		if (!book.available) return res.status(400).json({ message: 'Book is not available' });

		book.available = false;
		book.borrowedBy = req.user._id;
		book.borrowedAt = new Date();
		await book.save();
		res.json({ message: 'Book borrowed', book });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

// POST /api/books/:id/return - Return a book (Member or Admin)
exports.returnBook = async (req, res) => {
	try {
		const { id } = req.params;
		const book = await Book.findById(id);
		if (!book) return res.status(404).json({ message: 'Book not found' });
		if (book.available) return res.status(400).json({ message: 'Book is already returned' });

		// Optionally restrict: only borrower or Admin can return
		if (!req.user._id.equals(book.borrowedBy) && req.user.role !== 'Admin') {
			return res.status(403).json({ message: 'Only borrower or Admin can return this book' });
		}

		book.available = true;
		book.borrowedBy = null;
		book.borrowedAt = null;
		await book.save();
		res.json({ message: 'Book returned', book });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};
