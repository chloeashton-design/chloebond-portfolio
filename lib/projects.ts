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
  /** Holding colour shown before the poster paints. Pick it out of the artwork. */
  tint?: string;
}

/** Real copy for a project. Without an entry, the page keeps its placeholders. */
export interface ProjectContent {
  intro: string;
  client: string;
  year: string;
  role: string;
  scope: string;
}

export interface Project {
  slug: string;
  index: number;
  title: string;
  /** aspect ratio + layout used for this project's tile in the home work grid */
  tileRatio: '16/9' | '4/5';
  tileFull: boolean;
  /**
   * When set, this loop replaces the placeholder in both of the project's slots:
   * its tile on the home work grid, and the banner inside the project page.
   */
  hero?: HeroLoop;
  /** When set, replaces the placeholder intro and metadata on the project page. */
  content?: ProjectContent;
}

const TOTAL_PROJECTS = 8;

// Real project names. Anything unnamed falls back to "Project 0N".
const names: Record<number, string> = {
  2: 'Proton.ai',
};

const content: Record<number, ProjectContent> = {
  2: {
    intro:
      'I’ve been a design partner to Proton.ai, an AI platform for distributors, since 2025. Working closely with their marketing team, I provide ongoing creative support across illustration, art direction and design consultation, website graphics, and employee merchandise for team offsites, celebrations, and everything in between.',
    client: 'Proton.ai',
    year: '2025-2026',
    role: 'Freelance graphic designer',
    scope: 'Art direction, illustration, graphic design',
  },
};

// Projects whose hero slot has real artwork rather than a placeholder.
const heroes: Record<number, HeroLoop> = {
  2: {
    src: '/media/project-02/street-loop',
    alt: 'A lime delivery truck rolls up to a blue warehouse loading bay, settles on its springs with a puff of exhaust, then pulls away down the street.',
    // Mid-idle, truck parked at the bay. The loop's 0s frame is an empty street.
    posterTime: 3,
    tint: '#3736ff', // the plate's sky blue
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
    title: names[index] ?? `Project ${String(index).padStart(2, '0')}`,
    tileRatio: slot.tileRatio,
    tileFull: slot.tileFull,
    hero: heroes[index],
    content: content[index],
  };
});

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(current: Project): Project {
  const nextIndex = current.index % projects.length; // wraps last project back to project[0]
  return projects[nextIndex];
}
