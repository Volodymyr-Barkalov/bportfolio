import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/articles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(res.data);
    } catch (err) {
      setError("Failed to load articles.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this article?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError("Failed to delete article.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Top bar */}
      <div className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            ← Back to portfolio
          </Link>
          <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Logged in as <span className="text-gray-300">{user?.username}</span>
          </span>
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-1.5 border border-gray-700 rounded hover:border-red-500 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Articles</h2>
            <p className="text-gray-500 text-sm mt-1">
              {articles.length} article{articles.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <Link
            to="/admin/new-article"
            className="bg-white text-black px-5 py-2 rounded font-semibold text-sm hover:bg-gray-200 transition-colors"
          >
            + New Article
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-gray-500 text-center py-20">
            Loading articles...
          </div>
        )}

        {/* Empty state */}
        {!loading && articles.length === 0 && (
          <div className="text-center py-24 border border-dashed border-gray-800 rounded-lg">
            <p className="text-gray-500 mb-4">No articles yet.</p>
            <Link
              to="/admin/new-article"
              className="text-sm text-blue-400 hover:text-blue-300 underline"
            >
              Create your first article
            </Link>
          </div>
        )}

        {/* Articles list */}
        {!loading && articles.length > 0 && (
          <div className="flex flex-col gap-3">
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-lg px-6 py-4 hover:border-gray-700 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white truncate">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        article.published
                          ? "bg-green-900/50 text-green-400"
                          : "bg-gray-800 text-gray-500"
                      }`}
                    >
                      {article.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-6">
                  <Link
                    to={`/admin/edit-article/${article.id}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="text-sm text-gray-600 hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
