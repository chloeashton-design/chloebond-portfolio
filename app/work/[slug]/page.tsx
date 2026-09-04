import { notFound } from 'next/navigation';
import { getAdjacentProject, getProject, projects } from '../../../lib/projects';
import CaseStudyTemplate from '../../../components/CaseStudyTemplate';
import VisualSequenceTemplate from '../../../components/VisualSequenceTemplate';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const nextProject = getAdjacentProject(project);

  if (project.type === 'case-study') {
    return <CaseStudyTemplate project={project} nextProject={nextProject} />;
  }
  return <VisualSequenceTemplate project={project} nextProject={nextProject} />;
}
