export type ProjectType = 'case-study' | 'visual-sequence';

export interface Project {
  slug: string;
  index: number;
  title: string;
  type: ProjectType;
  /** aspect ratio + layout used for this project's tile in the home work grid */
  tileRatio: '16/9' | '4/5';
  tileFull: boolean;
}

const pattern: Array<{ type: ProjectType; tileRatio: '16/9' | '4/5'; tileFull: boolean }> = [
  { type: 'case-study', tileRatio: '16/9', tileFull: true },
  { type: 'visual-sequence', tileRatio: '4/5', tileFull: false },
  { type: 'case-study', tileRatio: '4/5', tileFull: false },
];

export const projects: Project[] = Array.from({ length: 12 }, (_, i) => {
  const index = i + 1;
  const slot = pattern[i % pattern.length];
  const type: ProjectType = index % 2 === 1 ? 'case-study' : 'visual-sequence';
  return {
    slug: `project-${String(index).padStart(2, '0')}`,
    index,
    title: `Project ${String(index).padStart(2, '0')}`,
    type,
    tileRatio: slot.tileRatio,
    tileFull: slot.tileFull,
  };
});

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(current: Project): Project {
  const nextIndex = current.index % projects.length; // wraps 12 -> 0 -> project[0]
  return projects[nextIndex];
}

export const caseStudyProjects = projects.filter((p) => p.type === 'case-study');
