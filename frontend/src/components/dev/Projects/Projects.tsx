import { projects } from "../../../data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-32">
      <div
        className="
                    mx-auto
                    max-w-7xl
                    px-6
                "
      >
        <div
          className="
                        mb-20
                        text-center
                    "
        >
          <span
            className="
                            font-semibold
                            uppercase
                            tracking-[4px]
                            text-primary
                        "
          >
            Projetos
          </span>

          <h2
            className="
                            mt-4
                            text-5xl
                            font-bold
                            text-secondaryText
                        "
          >
            Aplicações Reais
          </h2>

          <p
            className="
                            mt-6
                            text-secondaryText/70
                        "
          >
            Projetos desenvolvidos com foco em arquitetura, qualidade de código
            e experiência do usuário.
          </p>
        </div>

        <div
          className="
                        grid
                        gap-8
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
