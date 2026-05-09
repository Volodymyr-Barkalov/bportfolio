import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/articles")
      .then((res) => setPosts(res.data))
      .catch(() => setError("Failed to load posts."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Top bar */}
      <div className="border-b border-white/10 px-8 py-4 flex items-center justify-between backdrop-blur-lg bg-[rgba(10,10,10,0.8)] sticky top-0 z-40">
        <Link
          to="/"
          className="font-mono text-xl font-bold text-white"
        >
          vobar<span className="text-blue-500">.dev</span>
        </Link>
        <span className="text-sm text-gray-500">Posts</span>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-2">Posts</h1>
        <p className="text-gray-500 mb-12">Thoughts, notes, and articles.</p>

        {loading && (
          <div className="text-gray-600 text-center py-24">Loading...</div>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-24 text-gray-600">
            No posts published yet.
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className="flex flex-col gap-10">
            {posts.map((post) => (
              <article key={post.id} className="group">
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                  <time>
                    {new Date(post.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  {post.tags?.length > 0 && (
                    <div className="flex gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-900 border border-gray-800 rounded-full text-gray-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <Link to={`/posts/${post.id}`}>
                  <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors mb-2">
                    {post.title}
                  </h2>
                </Link>

                {post.summary && (
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {post.summary}
                  </p>
                )}

                <Link
                  to={`/posts/${post.id}`}
                  className="inline-block mt-3 text-sm text-blue-500 hover:text-blue-400 transition-colors"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
