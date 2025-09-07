// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

dotenv.config();


const app = express();
app.use(cors({ origin: 'http://localhost:5174', credentials: true }));

app.use(bodyParser.json());

// connect db
connectDB(process.env.MONGO_URI);

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));

// basic health
app.get('/', (req, res) => res.send({ message: 'Library API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
