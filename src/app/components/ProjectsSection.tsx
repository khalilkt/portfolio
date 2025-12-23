import Image from "next/image";
import { geistMono } from "../(app)/page";
import { HomePageProjectCms } from "@/lib/cms/types";

interface ProjectItemProps {
  project: HomePageProjectCms;
}
function ProjectItem({ project }: ProjectItemProps) {
  let parsedDate = project.startDate.split("-").at(0);
  if (project.endDate) {
    parsedDate += " - " + project.endDate.split("-").at(0);
  }

  return (
    <div className="relative">
      <Image
        src={project.thumbnailImage.url!}
        alt={project.thumbnailImage.alt}
        height={300}
        width={1000}
        className="w-full"
      />
      {project.name && (
        <h3 className="text-sm leading-4.5 mt-4">{project.name}</h3>
      )}
      {project.startDate && (
        <h5
          className={`${geistMono.className}  text-xs leading-4 text-secondary mt-1.5`}
        >
          {parsedDate}
        </h5>
      )}
      {project.description && (
        <p className="mt-3 text-gray text-sm leading-5.5">
          {project.description}
        </p>
      )}
    </div>
  );
}

export function ProjectsSection({
  projects,
}: {
  projects: HomePageProjectCms[];
}) {
  return (
    <section>
      <ul className="flex flex-col gap-y-12">
        {projects.map((p, index) => (
          <ProjectItem key={index} project={p} />
        ))}
      </ul>
    </section>
  );
}
