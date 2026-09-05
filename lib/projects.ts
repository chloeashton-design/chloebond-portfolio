export interface Project {
  slug: string;
  index: number;
  title: string;
  /** aspect ratio + layout used for this project's tile in the home work grid */
  tileRatio: '16/9' | '4/5';
  tileFull: boolean;
}

const TOTAL_PROJECTS = 8;

const pattern: Array<{ tileRatio: '16/9' | '4/5'; tileFull: boolean }> = [
  { tileRatio: '16/9', tileFull: true },
  { tileRatio: '4/5', tileFull: false },
  { tileRatio: '4/5', tileFull: false },
];

// Deliberate exceptions to the repeating 3-tile pattern. Projects 2 and 3 run
// landscape while staying side by side; project 8 closes the grid full-bleed.
const tileOverrides: Record<number, { tileRatio: '16/9' | '4/5'; tileFull: boolean }> = {
  2: { tileRatio: '16/9', tileFull: false },
  3: { tileRatio: '16/9', tileFull: false },
  8: { tileRatio: '16/9', tileFull: true },
};

export const projects: Project[] = Array.from({ length: TOTAL_PROJECTS }, (_, i) => {
  const index = i + 1;
  const slot = tileOverrides[index] ?? pattern[i % pattern.length];
  return {
    slug: `project-${String(index).padStart(2, '0')}`,
    index,
    title: `Project ${String(index).padStart(2, '0')}`,
    tileRatio: slot.tileRatio,
    tileFull: slot.tileFull,
  };
});

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(current: Project): Project {
  const nextIndex = current.index % projects.length; // wraps last project back to project[0]
  return projects[nextIndex];
}
