import ProjectCard from "./ProjectCard";

const ProjectList = () => {
    return (
        <div className="flex flex-wrap overflow-y-auto w-full max-h-full gap-4">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
        </div>
    )
}

export default ProjectList;