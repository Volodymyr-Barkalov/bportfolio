import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          404
        </p>
        <h1 className="mt-4 text-xl text-gray-200">This page doesn't exist</h1>
        <p className="mt-2 text-sm text-gray-500">{window.location.pathname}</p>
        <Link
          to="/"
          className="inline-block mt-8 px-5 py-2 rounded border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
