import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();

  // Already signed in — no reason to show the form again
  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        username,
        password,
      });
      login({ username }, res.data.token);
      navigate("/admin");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg w-full max-w-sm">
        <Link
          to="/"
          className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
        >
          ← Back to portfolio
        </Link>
        <h2 className="text-2xl font-bold mt-4 mb-6">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-800 p-3 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 p-3 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
