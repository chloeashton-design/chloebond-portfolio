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
  /** One entry per paragraph. */
  intro: string[];
  client: string;
  year: string;
  role: string;
  scope: string;
  /** Omitted rather than guessed: the row only renders once a project has one. */
  tools?: string;
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
  /** The wide tile in its row of three. Its ratio sets that row's height. */
  tileLarge: boolean;
  /**
   * When set, this loop replaces the placeholder in both of the project's slots:
   * its tile on the home work grid, and the banner inside the project page.
   */
  hero?: HeroLoop;
  /**
   * A still hero, for projects whose lead artwork isn't motion. Fills the same
   * two slots as `hero`: the work-grid tile and the project page banner.
   */
  heroImage?: ProjectImage;
  /** When set, replaces the placeholder intro and metadata on the project page. */
  content?: ProjectContent;
  /** When set, replaces the placeholder image rows on the project page. */
  gallery?: ProjectGallery;
}

const TOTAL_PROJECTS = 9;

// Real project names. Anything unnamed falls back to "Project 0N".
const names: Record<number, string> = {
  2: 'Proton.ai',
  8: 'Hi. Society',
};

// URL slugs for named projects. Unlisted projects keep "project-0N".
// next.config.ts redirects the old numbered path so shared links keep working.
const slugs: Record<number, string> = {
  2: 'proton',
  8: 'hi-society',
};

const content: Record<number, ProjectContent> = {
  2: {
    intro: [
      'I’ve been a design partner to Proton.ai, an AI platform for distributors, since 2025. Working closely with their marketing team, I provide ongoing creative support across illustration, art direction and design consultation, website graphics, and employee merchandise for team offsites, celebrations, and everything in between.',
    ],
    client: 'Proton.ai',
    year: '2025-2026',
    role: 'Freelance graphic designer',
    scope: 'Art direction, illustration, graphic design',
  },
  8: {
    intro: [
      'Hi. Society is a leading cannabis education community for retailers and budtenders across Canada. I was brought in to elevate an existing agency-created identity and reposition the brand around a more polished, exclusive experience, one that reflected the credibility of an accredited course designed to help budtenders build professional expertise.',
      'I led the art direction and brand design, shaping the new visual direction and overall identity system, with illustration by my talented colleague Chelle Lorenzen.',
    ],
    client: 'Canopy Growth',
    year: '2020',
    role: 'Graphic Designer',
    scope: 'Art Direction, Brand Design',
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

// Still heroes, for projects whose lead artwork isn't motion.
const heroImages: Record<number, ProjectImage> = {
  8: {
    src: '/media/project-08/hero-hands-16x9.webp',
    alt: 'Three raised hands counting one, two, three against a black ground ringed with concentric circles, each hand printed in pink, teal and coral over a coloured disc.',
    // Cropped to 16:9 from the 1200x897 original, keeping the top of the frame
    // so the halo and fingertips stay clear and the forearms go instead.
    width: 1200,
    height: 675,
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
  8: [
    [
      {
        kind: 'video',
        src: '/media/project-08/brandguidelines',
        alt: 'The Hi. Society brand guidelines cycling through its pages, opening on a pink-to-teal gradient cover set beside a close-up of a mouth exhaling smoke.',
        ratio: '16/9',
        sources: ['mp4'],
        gifFallback: false,
        tint: '#0d0d0d', // the deck's near-black ground
      },
    ],
    [
      {
        src: '/media/project-08/businesscards.webp',
        alt: 'Black Hi. Society business cards laid out in a repeating diagonal grid, each carrying the wordmark and a pink-to-teal gradient sphere.',
        width: 1920,
        height: 813,
      },
    ],
    [
      {
        src: '/media/project-08/graphic1.webp',
        alt: 'Three raised hands counting one, two, three in pink, teal and coral, each over a coloured disc on a black ground ringed with concentric circles.',
        width: 1200,
        height: 897,
      },
      {
        src: '/media/project-08/graphic2.webp',
        alt: 'A teal glass pipe resting on a magenta halftone panel inside a black circle, over a repeating pattern of red lighters.',
        width: 1200,
        height: 890,
      },
      {
        src: '/media/project-08/graphic3.webp',
        alt: 'Pink and white cannabis leaves silhouetted against a black and teal sky with red suns and white sunbeams.',
        width: 1200,
        height: 901,
      },
    ],
    [
      {
        src: '/media/project-08/pins.webp',
        alt: 'Enamel pins on gradient Hi. Society backing cards — a cannabis leaf, a digital clock reading 4:20 and a bong — captioned "Passion comes in all vapes and sizes."',
        width: 1180,
        height: 1180,
      },
      {
        src: '/media/project-08/poster.webp',
        alt: 'A black poster pasted on a city wall reading WEED. KUSH. GANJA. BROCCOLI. CANNABIS. in teal, above the line "Whatever you call it, get to know it."',
        width: 714,
        height: 714,
      },
    ],
    [
      {
        src: '/media/project-08/courses.webp',
        alt: 'Three course cards from the Hi. Society learning platform — Cannabis around the world, Product training, and The fundamentals of recreational cannabis — each showing a duration and a start button.',
        width: 2000,
        height: 820,
      },
    ],
    [
      {
        src: '/media/project-08/icons.webp',
        alt: 'Eight Hi. Society icons in pink and teal on grey: an eye, two pills, a brain, a clock reading 4:20, a lighter, a cannabis leaf, a vape and a bong.',
        width: 1920,
        height: 1080,
      },
    ],
    [
      {
        src: '/media/project-08/social.webp',
        alt: 'The Hi. Society Instagram profile shown on a phone, its grid alternating brand graphics, illustrations and quote posts.',
        width: 1920,
        height: 1080,
      },
    ],
  ],
};

/**
 * Three projects per row, one of them wide. The wide slot walks across the
 * grid — first in row one, middle in row two, last in row three — so the
 * emphasis travels diagonally down the page.
 */
const LARGE_TILES = new Set([1, 5, 9]);

export const projects: Project[] = Array.from({ length: TOTAL_PROJECTS }, (_, i) => {
  const index = i + 1;
  return {
    slug: slugs[index] ?? `project-${String(index).padStart(2, '0')}`,
    index,
    title: names[index] ?? `Project ${String(index).padStart(2, '0')}`,
    tileLarge: LARGE_TILES.has(index),
    hero: heroes[index],
    heroImage: heroImages[index],
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
