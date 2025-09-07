import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold tracking-wide">📚 Library</Link>
          <Link to="/" className="hidden sm:inline hover:underline">Books</Link>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{user.name} ({user.role})</span>
              {user.role === 'Admin' && (
                <Link to="/admin/add-book" className="btn bg-green-500 hover:bg-green-600 text-white">Add Book</Link>
              )}
              <button className="btn !bg-red-500 hover:!bg-red-600" onClick={() => { logout(); navigate("/"); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/register" className="px-4 py-2 rounded-lg border border-white/50 hover:bg-white hover:text-indigo-700 transition">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
