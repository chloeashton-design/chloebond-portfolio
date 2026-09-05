/** A looping motion piece standing in for a project's hero still. */
export interface HeroLoop {
  /** Basename of the asset set, minus extension. Expects .webm/.mp4/.gif alongside a -poster.webp. */
  src: string;
  /** Describes the motion for anyone who can't see it. */
  alt: string;
  /**
   * Timestamp (seconds) the poster frame was captured at. Under reduced motion the
   * video is parked here so the frozen frame matches the poster instead of
   * snapping to whatever happens to be at 0s.
   */
  posterTime?: number;
}

export interface Project {
  slug: string;
  index: number;
  title: string;
  /** aspect ratio + layout used for this project's tile in the home work grid */
  tileRatio: '16/9' | '4/5';
  tileFull: boolean;
  /** When set, the project page hero plays this loop instead of a placeholder. */
  hero?: HeroLoop;
}

const TOTAL_PROJECTS = 8;

// Projects whose hero slot has real artwork rather than a placeholder.
const heroes: Record<number, HeroLoop> = {
  2: {
    src: '/media/project-02/street-loop',
    alt: 'A lime delivery truck rolls up to a blue warehouse loading bay, settles on its springs with a puff of exhaust, then pulls away down the street.',
    // Mid-idle, truck parked at the bay. The loop's 0s frame is an empty street.
    posterTime: 3,
  },
};

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
    hero: heroes[index],
  };
});

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(current: Project): Project {
  const nextIndex = current.index % projects.length; // wraps last project back to project[0]
  return projects[nextIndex];
}
