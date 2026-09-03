import { Link } from "react-router-dom";
import { PlaygroundCard } from "../components/PlaygroundCard";
import { playgroundProjects } from "../data/playground";

export function Playground() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="border-b border-white/10 px-8 py-4 flex items-center justify-between backdrop-blur-lg bg-[rgba(10,10,10,0.8)] sticky top-0 z-40">
        <Link to="/" className="font-mono text-xl font-bold text-white">
          vobar<span className="text-blue-500">.dev</span>
        </Link>
        <Link
          to="/"
          className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          ← Back to portfolio
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-2">Playground</h1>
        <p className="text-gray-500 mb-12">
          Small pet projects, built for the fun of it.
        </p>

        {playgroundProjects.length === 0 ? (
          <div className="text-center py-24 text-gray-600">
            Nothing here yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {playgroundProjects.map((project) => (
              <PlaygroundCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
