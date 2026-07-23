
import ProjectBadge from "./ProjectBadge";

type Props = {

    project:Project;

}

export default function ProjectCard({

    project

}:Props){

    return(

        <article
            className="
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-card
                transition
                duration-300
                hover:-translate-y-2
                hover:border-primary
            "
        >

            <img

                src={project.image}

                alt={project.title}

                className="
                    h-52
                    w-full
                    object-cover
                "

            />

            <div className="space-y-5 p-6">

                <h3
                    className="
                        text-2xl
                        font-bold
                        text-secondaryText
                    "
                >

                    {project.title}

                </h3>

                <p
                    className="
                        leading-7
                        text-secondaryText/70
                    "
                >

                    {project.description}

                </p>

                <div
                    className="
                        flex
                        flex-wrap
                        gap-2
                    "
                >

                    {

                        project.technologies.map((technology)=>(

                            <ProjectBadge

                                key={technology}

                                name={technology}

                            />

                        ))

                    }

                </div>

                <a

                    href={project.github}

                    target="_blank"

                    className="
                        inline-flex
                        rounded-xl
                        bg-primary
                        px-6
                        py-3
                        font-semibold
                        text-primaryText
                        transition
                        hover:scale-105
                    "

                >

                    Ver Projeto

                </a>

            </div>

        </article>

    )

}