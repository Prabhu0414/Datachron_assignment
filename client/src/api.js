const API = process.env.VITE_API_URL || "https://datachron-assignment-1.onrender.com";

// ----------------- Generic request function -----------------
async function request(path, method = "GET", body = null, token = null) {
  try {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    // Try parsing JSON
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      // Include message from server if available
      const errorMessage = data?.message || data?.error || `Request failed with status ${res.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (err) {
    // Network errors or JSON parsing errors
    throw new Error(err.message || "Network error");
  }
}

// ----------------- AUTH APIs -----------------
export const login = (email, password) =>
  request("/api/auth/login", "POST", { email, password });

export const register = (name, email, password) =>
  request("/api/auth/register", "POST", { name, email, password });

// ----------------- BOOK APIs -----------------
export const getBooks = () => request("/api/books", "GET");

export const addBook = (book, token) => request("/api/books", "POST", book, token);

export const borrowBook = (id, token) => request(`/api/books/${id}/borrow`, "POST", null, token);

export const returnBook = (id, token) => request(`/api/books/${id}/return`, "POST", null, token);
