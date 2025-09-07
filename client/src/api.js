const API = import.meta.env.VITE_API_URL || "https://datachron-assignment.onrender.com";

// generic request
async function request(path, method = "GET", body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}

// Auth
export const login = (email, password) =>
  request("/api/auth/login", "POST", { email, password });

export const register = (name, email, password) =>
  request("/api/auth/register", "POST", { name, email, password });

// Books
export const getBooks = () => request("/api/books", "GET");

export const addBook = (book, token) =>
  request("/api/books", "POST", book, token);

export const borrowBook = (id, token) =>
  request(`/api/books/${id}/borrow`, "POST", null, token);

export const returnBook = (id, token) =>
  request(`/api/books/${id}/return`, "POST", null, token);
