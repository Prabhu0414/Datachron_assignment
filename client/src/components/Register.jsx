import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || JSON.stringify(err));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl mb-4">Register</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="input" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="input" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="input" />
        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  );
}
