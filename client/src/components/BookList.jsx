import React, { useEffect, useState } from "react";
import { getBooks } from "../api";
import BookCard from "./BookCard";


export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [availability, setAvailability] = useState("all");

  const fetchBooks = async (avail = availability) => {
    setLoading(true);
    try {
      let url = "http://localhost:5000/api/books";
      if (avail === "available") url += "?available=true";
      else if (avail === "borrowed") url += "?available=false";
      const res = await fetch(url);
      let data = await res.json();
      if (q.trim()) {
        const term = q.toLowerCase();
        data = data.filter(b => b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term));
      }
      setBooks(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load books");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, [availability]);

  const onSearch = async (e) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div className="p-4">

      <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-3 mb-6 items-center">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by title or author" className="flex-1 input" />
        <select
          value={availability}
          onChange={e => setAvailability(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="borrowed">Borrowed</option>
        </select>
        <div className="flex gap-2">
          <button className="btn" type="submit">Search</button>
          <button type="button" className="px-3 py-2 border rounded hover:bg-slate-200" onClick={() => { setQ(''); setAvailability('all'); fetchBooks('all'); }}>Clear</button>
        </div>
      </form>

      {loading ? (
        <div className="text-center text-slate-500">Loading books...</div>
      ) : books.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(b => <BookCard key={b._id} book={b} onUpdate={fetchBooks} />)}
        </div>
      ) : (
        <div className="text-center text-slate-500 mt-10">
          No books found.
        </div>
      )}
    </div>
  );
}
