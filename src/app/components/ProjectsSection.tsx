import Image from "next/image";
import { geistMono } from "../(app)/page";
import { HomePageProjectCms } from "@/lib/cms/types";
import { getProjectRelatedBlogSlug } from "@/lib/cms/cms";

interface ProjectItemProps {
  project: HomePageProjectCms & { blogSlug: string | null };
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
        className="w-full h-91.25 object-cover object-top"
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
          {project.description} ({project.blogSlug ?? "No related blog"})
        </p>
      )}
    </div>
  );
}

export async function ProjectsSection({
  projects,
}: {
  projects: HomePageProjectCms[];
}) {
  // Fetch blog slugs for each project
  const projectsWithBlogSlugs = await Promise.all(
    projects.map(async (project) => {
      const blogSlug = (await getProjectRelatedBlogSlug(project.id)) ?? null;
      return { ...project, blogSlug };
    }),
  );
  return (
    <section>
      <ul className="flex flex-col gap-y-12">
        {projectsWithBlogSlugs.map((p, index) => (
          <ProjectItem key={index} project={p} />
        ))}
      </ul>
    </section>
  );
}
