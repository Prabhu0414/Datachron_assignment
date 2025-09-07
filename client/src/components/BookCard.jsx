import React, { useContext, useState } from "react";
import { borrowBook, returnBook } from "../api";
import AuthContext from "../context/AuthContext";

export default function BookCard({ book, onUpdate }) {
  const { token, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleBorrow = async () => {
    setLoading(true);
    try {
      await borrowBook(book._id, token);
      onUpdate();
    } catch (e) {
      alert(e.message || "Error borrowing book");
    }
    setLoading(false);
  };

  const handleReturn = async () => {
    setLoading(true);
    try {
      await returnBook(book._id, token);
      onUpdate();
    } catch (e) {
      alert(e.message || "Error returning book");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg">{book.title}</h3>
        <p className="text-slate-600">{book.author}</p>
        <p className="text-xs text-slate-500">ISBN: {book.isbn}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span
          className={`text-sm ${
            book.available ? "text-green-600" : "text-red-600"
          }`}
        >
          {book.available ? "Available" : "Borrowed"}
        </span>
        {book.available ? (
          <button
            className="btn"
            onClick={handleBorrow}
            disabled={loading || !token}
          >
            {loading ? "..." : "Borrow"}
          </button>
        ) : (
          <button
            className="btn bg-yellow-500 hover:bg-yellow-600"
            onClick={handleReturn}
            disabled={loading || !token}
          >
            {loading ? "..." : "Return"}
          </button>
        )}
      </div>
    </div>
  );
}
