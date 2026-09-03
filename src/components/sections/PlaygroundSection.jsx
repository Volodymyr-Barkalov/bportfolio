import { Link } from "react-router-dom";
import { RevealOnScroll } from "../RevealOnScroll";
import { PlaygroundCard } from "../PlaygroundCard";
import { playgroundProjects } from "../../data/playground";

const PREVIEW_COUNT = 4;

export const PlaygroundSection = () => {
  if (playgroundProjects.length === 0) return null;

  return (
    <section
      id="playground"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Playground
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {playgroundProjects.slice(0, PREVIEW_COUNT).map((project) => (
              <PlaygroundCard key={project.id} project={project} />
            ))}
          </div>

          {playgroundProjects.length > PREVIEW_COUNT && (
            <div className="text-center mt-10">
              <Link
                to="/playground"
                className="text-sm text-blue-500 hover:text-blue-400 transition-colors"
              >
                View all projects →
              </Link>
            </div>
          )}
        </div>
      </RevealOnScroll>
    </section>
  );
};
