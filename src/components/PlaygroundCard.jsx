import { Link } from "react-router-dom";

const CARD_CLASSES =
  "p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition flex flex-col";

export function PlaygroundCard({ project }) {
  const isExternal = project.path.startsWith("http");

  const body = (
    <>
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>

      {project.summary && (
        <p className="text-gray-400 mb-4 text-sm leading-relaxed flex-1">
          {project.summary}
        </p>
      )}

      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
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
        {isExternal ? "Open ↗" : "Open →"}
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={project.path}
        target="_blank"
        rel="noreferrer"
        className={CARD_CLASSES}
      >
        {body}
      </a>
    );
  }

  return (
    <Link to={project.path} className={CARD_CLASSES}>
      {body}
    </Link>
  );
}
