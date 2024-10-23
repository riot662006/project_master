import ProjectCard from "./ProjectCard";

const ProjectList = () => {
    return (
        <div className="flex flex-wrap overflow-y-auto w-full max-h-full gap-4 max-sm:grid max-sm:grid-cols-1">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
        </div>
    )
}

export default ProjectList;