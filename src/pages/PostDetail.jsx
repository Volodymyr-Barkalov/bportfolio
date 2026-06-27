import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/articles/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => setError("Post not found."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="border-b border-white/10 px-8 py-4 flex items-center justify-between backdrop-blur-lg bg-[rgba(10,10,10,0.8)] sticky top-0 z-40">
        <Link to="/" className="font-mono text-xl font-bold text-white">
          vobar<span className="text-blue-500">.dev</span>
        </Link>
        <Link to="/posts" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
          ← All posts
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        {loading && (
          <div className="text-gray-600 text-center py-24">Loading...</div>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        {post && (
          <article>
            <div className="flex items-center gap-3 text-xs text-gray-600 mb-4">
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

            <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>

            {post.summary && (
              <p className="text-gray-400 text-lg leading-relaxed mb-10 border-l-2 border-gray-800 pl-4">
                {post.summary}
              </p>
            )}

            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
