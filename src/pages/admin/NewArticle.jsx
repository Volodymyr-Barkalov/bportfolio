import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export function NewArticle() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    tags: "",
    published: false, 
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setError("Title, tag and content are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/api/articles", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/admin");
    } catch (err) {
      setError("Failed to save article. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const wordCount = form.content.trim()
    ? form.content.trim().split(/\s+/).length
    : 0;

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Top bar */}
      <div className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            to="/admin"
            className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            ← Back to dashboard
          </Link>
          <h1 className="text-xl font-semibold text-white">New Article</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-600">{wordCount} words</span>

          {/* Published toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <span className="text-sm text-gray-400">
              {form.published ? "Published" : "Draft"}
            </span>
            <div className="relative">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                className="sr-only"
              />
              <div
                onClick={() =>
                  setForm((p) => ({ ...p, published: !p.published }))
                }
                className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${
                  form.published ? "bg-green-600" : "bg-gray-700"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                    form.published ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          </label>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-white text-black px-5 py-1.5 rounded font-semibold text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Article"}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-8 py-10">
        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Article title..."
              className="w-full bg-transparent text-3xl font-bold text-white placeholder-gray-700 border-none outline-none resize-none"
            />
          </div>

          <div className="border-t border-gray-800" />

          {/* Summary */}
          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
              Summary{" "}
              <span className="text-gray-700 normal-case tracking-normal">
                (shown in article list)
              </span>
            </label>
            <textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              placeholder="A short description of this article..."
              rows={2}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg p-4 text-gray-300 placeholder-gray-700 outline-none focus:border-gray-600 transition-colors resize-none text-sm"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
              Content
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your article here..."
              rows={20}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg p-4 text-gray-300 placeholder-gray-700 outline-none focus:border-gray-600 transition-colors resize-y text-sm leading-relaxed font-mono"
            />
          </div>

          {/* Bottom save */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-white text-black px-6 py-2 rounded font-semibold text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
