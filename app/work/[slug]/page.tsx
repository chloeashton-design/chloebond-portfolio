import { notFound } from 'next/navigation';
import { getAdjacentProject, getProject, projects } from '../../../lib/projects';
import ProjectTemplate from '../../../components/ProjectTemplate';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectTemplate project={project} nextProject={getAdjacentProject(project)} />;
}
