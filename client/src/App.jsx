import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './utils/PrivateRoute';
import AdminAddBookPage from './pages/AdminAddBookPage';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin add book route - only visible to admin */}
          <Route
            path="/admin/add-book"
            element={
              <PrivateRoute>
                <AdminAddBookPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
