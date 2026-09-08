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
  /**
   * Which video files sit alongside src, in preference order. Defaults to
   * webm then mp4. Flat vector artwork sometimes encodes smaller as H.264 than
   * VP9, in which case shipping mp4 alone saves the visitor a download.
   */
  sources?: Array<'webm' | 'mp4'>;
  /** Whether a .gif sits alongside src, for browsers with no video at all. */
  gifFallback?: boolean;
}

/** Real copy for a project. Without an entry, the page keeps its placeholders. */
export interface ProjectContent {
  intro: string;
  client: string;
  year: string;
  role: string;
  scope: string;
}

/** One piece of project artwork, rendered at its own intrinsic ratio. */
export interface ProjectImage {
  kind?: 'image';
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** A silent looping clip sitting in the gallery, played like the hero loop. */
export interface ProjectVideo extends HeroLoop {
  kind: 'video';
  ratio: '16/9' | '4/5' | '1/1';
}

export type GalleryItem = ProjectImage | ProjectVideo;

/**
 * The media sequence below a project's overview. Each inner array is one row:
 * a single item runs full width, two sit side by side.
 */
export type ProjectGallery = GalleryItem[][];

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
  /** When set, replaces the placeholder image rows on the project page. */
  gallery?: ProjectGallery;
}

const TOTAL_PROJECTS = 8;

// Real project names. Anything unnamed falls back to "Project 0N".
const names: Record<number, string> = {
  2: 'Proton.ai',
};

// URL slugs for named projects. Unlisted projects keep "project-0N".
// next.config.ts redirects the old numbered path so shared links keep working.
const slugs: Record<number, string> = {
  2: 'proton',
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

// Dimensions are the supplied artwork's own, scaled down for web. Ratios are
// kept as designed except where a row needs matching shapes -- see the pin.
const galleries: Record<number, ProjectGallery> = {
  2: [
    [
      {
        src: '/media/project-02/proton-cards.webp',
        alt: 'Three illustrated Proton.ai note cards on a blue ground: "Just a note from us" with a delivery van and map pins, "Let\'s keep it rolling" with a forklift stacking boxes, and "Special delivery just for you" set at night outside a warehouse.',
        width: 1920,
        height: 1080,
      },
    ],
    // A masthead apiece, full width and stacked, running in the same order as
    // the mockup pair below: Playbook then Dispatch.
    [
      {
        src: '/media/project-02/proton-playbook-header.webp',
        alt: 'The Proton Playbook newsletter header: bold blue type beside a grinning lime delivery truck character holding a clipboard of plays, on a pale grid.',
        width: 1800,
        height: 750,
      },
    ],
    [
      {
        src: '/media/project-02/proton-dispatch-header.webp',
        alt: "The Distributor's Dispatch newsletter header: white type over a night-time blue scene of warehouses, forklifts, delivery trucks and a plane overhead.",
        width: 1800,
        height: 750,
      },
    ],
    [
      {
        src: '/media/project-02/proton-newsletter1.webp',
        alt: 'The Proton Playbook email newsletter, issue 14, headed by a lime illustration of a smiling character striding beside a yellow delivery truck.',
        width: 1600,
        height: 2000,
      },
      {
        src: '/media/project-02/proton-newsletter2.webp',
        alt: "The Distributor's Dispatch email newsletter, issue 07, headed by a blue night-time illustration of a warehouse loading dock and city skyline.",
        width: 1600,
        height: 2000,
      },
    ],
    [
      {
        kind: 'video',
        src: '/media/project-02/web-graphics',
        alt: 'A screen recording scrolling down the Proton.ai website, past the hero, product illustrations, feature sections and a customer quote.',
        ratio: '16/9',
        // mp4 only: this footage encodes smaller as H.264 than as VP9, so a
        // webm would just be a bigger file for the browser to prefer.
        sources: ['mp4'],
        gifFallback: false,
        posterTime: 2,
        tint: '#e9ecf6', // the site's pale grey chrome
      },
    ],
    [
      {
        src: '/media/project-02/proton-lisbon-offsite-tee.webp',
        alt: 'White t-shirt printed in blue with a Lisbon panel: azulejo tiles, the 25 de Abril bridge, Belém Tower, a tram, and the word LISBON.',
        width: 1600,
        height: 2000,
      },
      {
        src: '/media/project-02/proton-lisbon-offsite-tote.webp',
        alt: 'Canvas tote bag on a yellow ground, printed with a grid of blue azulejo tiles carrying company values: Customers First, One Team, Own Your Results, Think Big Start Small, Lead With Curiosity, Be Open.',
        width: 1600,
        height: 2000,
      },
    ],
    [
      {
        src: '/media/project-02/proton-pin-square.webp',
        alt: 'Enamel pin on a navy backing card reading "Build the dream with Proton". The pin is a row of keycaps spelling out "Eat. Sleep. Vibe code. Repeat."',
        // Squared off to match the mug beside it. Cropped from the 3262x3000
        // source rather than padded, since its lime ground is a soft gradient
        // that a flat fill would band against.
        width: 2000,
        height: 2000,
      },
      {
        src: '/media/project-02/proton-team-merch1.webp',
        alt: 'Black YETI travel mug on a lime ground, printed with CHILL MODE in chunky white type.',
        width: 1080,
        height: 1080,
      },
    ],
  ],
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
    slug: slugs[index] ?? `project-${String(index).padStart(2, '0')}`,
    index,
    title: names[index] ?? `Project ${String(index).padStart(2, '0')}`,
    tileRatio: slot.tileRatio,
    tileFull: slot.tileFull,
    hero: heroes[index],
    content: content[index],
    gallery: galleries[index],
  };
});

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(current: Project): Project {
  const nextIndex = current.index % projects.length; // wraps last project back to project[0]
  return projects[nextIndex];
}
