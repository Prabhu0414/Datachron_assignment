// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

dotenv.config();


const app = express();
const allowedOrigins = [
  'http://localhost:5174',
  'https://datachron-assignment.onrender.com',
  'https://datachron-assignment.vercel.app',
  'https://datachron-assignment-git-main-prabhu0414s-projects.vercel.app',
  'https://datachron-assignment-mf20aw3xb-prabhu0414s-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));


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
