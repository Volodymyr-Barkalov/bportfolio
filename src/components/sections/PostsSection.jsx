import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { RevealOnScroll } from "../RevealOnScroll";

export const PostsSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/articles`)
      .then((res) => setPosts(Array.isArray(res.data) ? res.data : res.data.articles ?? res.data.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || posts.length === 0) return null;

  return (
    <section
      id="posts"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.slice(0, 4).map((post) => (
              <Link
                key={post.id}
                to={`/posts/${post.id}`}
                className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition flex flex-col"
              >
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>

                {post.summary && (
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed flex-1">
                    {post.summary}
                  </p>
                )}

                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <span className="text-blue-400 text-sm mt-auto">
                  View Details →
                </span>
              </Link>
            ))}
          </div>

          {posts.length > 4 && (
            <div className="text-center mt-10">
              <Link
                to="/posts"
                className="text-sm text-blue-500 hover:text-blue-400 transition-colors"
              >
                View all posts →
              </Link>
            </div>
          )}
        </div>
      </RevealOnScroll>
    </section>
  );
};
