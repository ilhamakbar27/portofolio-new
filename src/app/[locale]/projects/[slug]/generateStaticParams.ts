import { projectsData } from "@/data/projects";

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}