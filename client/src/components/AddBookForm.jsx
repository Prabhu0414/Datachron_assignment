import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function AddBookForm({ onBookAdded }) {
  const { token, user } = useContext(AuthContext);
  const [form, setForm] = useState({ title: "", author: "", isbn: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!user || user.role !== "Admin") return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add book");
      setSuccess("Book added successfully!");
      setForm({ title: "", author: "", isbn: "" });
      if (onBookAdded) onBookAdded(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Add New Book</h2>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Author</label>
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">ISBN</label>
        <input
          type="text"
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <button
        type="submit"
        className="btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Book"}
      </button>
    </form>
  );
}
