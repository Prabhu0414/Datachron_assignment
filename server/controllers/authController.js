const jwt = require('jsonwebtoken');
const User = require('../models/User');

// helper to sign JWT
const signToken = (user) => {
	return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN || '7d'
	});
};

// POST /api/auth/register
exports.register = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;
		if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required.' });

		const existing = await User.findOne({ email });
		if (existing) return res.status(400).json({ message: 'Email already registered' });

		// allow only Admin to create Admins — if role === 'Admin' and requester is not admin, ignore
		let createdRole = 'Member';
		if (role === 'Admin') {
			// if route is called by authenticated admin, allow. Otherwise default to Member.
			if (req.user && req.user.role === 'Admin') createdRole = 'Admin';
			else createdRole = 'Member';
		}

		const user = new User({ name, email, password, role: createdRole });
		await user.save();

		const token = signToken(user);
		res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

// POST /api/auth/login
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });

		const user = await User.findOne({ email });
		if (!user) return res.status(401).json({ message: 'Invalid credentials' });

		const isMatch = await user.comparePassword(password);
		if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

		const token = signToken(user);
		res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};





// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmQwOGUxZDQxMGRkOTAzYzM1NjNjNyIsInJvbGUiOiJNZW1iZXIiLCJpYXQiOjE3NTcyMTkwNDEsImV4cCI6MTc1NzgyMzg0MX0.tS0nJ_15PTZiGxYtG1q8JpfJASocjjODEh6DDO5H-KM