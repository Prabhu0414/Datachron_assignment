# Datachron Library Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing a library. Features include user authentication, admin and member roles, book management, and borrowing/returning books.

## Features

- User registration and login (JWT-based authentication)
- Admin and Member roles
- Admin can add new books
- Members can view and borrow available books
- Admin and Members can return borrowed books
- Book search and filter by availability
- Responsive UI with React and Tailwind CSS

## Project Structure

```
Datachron/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # React components (Navbar, BookList, AddBookForm, etc.)
│   │   ├── context/      # Auth context
│   │   ├── utils/        # Utility functions (PrivateRoute, etc.)
│   │   └── App.jsx       # Main app component
│   ├── public/
│   ├── package.json
│   └── ...
├── server/           # Node.js/Express backend
│   ├── controllers/  # Route controllers (auth, book)
│   ├── middleware/   # Auth and role middleware
│   ├── models/       # Mongoose models (User, Book)
│   ├── routes/       # Express routes (auth, books)
│   ├── config/       # DB config
│   ├── server.js     # Entry point
│   ├── package.json
│   └── ...
└── README.md         # This file
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### 1. Clone the repository
```
git clone <repo-url>
cd Datachron
```

### 2. Setup the Backend
```
cd server
npm install
```

- Create a `.env` file in the `server` folder:
  ```
  MONGO_URI=<your-mongodb-uri>
  JWT_SECRET=<your-secret>
  PORT=5000
  ```
- (Optional) Seed an admin user using `seedAdmin.js` if provided.

- Start the backend:
```
npm run dev
```

### 3. Setup the Frontend
```
cd ../client
npm install
npm run dev
```
- The frontend will run on `http://localhost:5174` (or as shown in your terminal)

## Usage
- Register as a new user or login as admin (see seed script or register and update role in DB)
- Admins can add books and manage the library
- Members can view, search, filter, borrow, and return books

## API Endpoints (Backend)
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login
- `POST /api/books` — Add a new book (Admin only)
- `GET /api/books` — List all books (supports `?available=true|false`)
- `POST /api/books/:id/borrow` — Borrow a book (Member/Admin)
- `POST /api/books/:id/return` — Return a book (Member/Admin)

## Tech Stack
- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Auth:** JWT, bcrypt

## Customization
- Update roles, book schema, or add more features as needed
- Easily extendable for more user types or book actions

## License
MIT
