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
const names: Record<number, string> = {};

// URL slugs for named projects. Unlisted projects keep "project-0N".
// When a project takes a named slug, add a redirect in next.config.ts from its
// numbered path so any link shared while that URL was live still resolves.
const slugs: Record<number, string> = {};

const content: Record<number, ProjectContent> = {};

// Projects whose hero slot has real motion rather than a placeholder.
const heroes: Record<number, HeroLoop> = {};

// Still heroes, for projects whose lead artwork isn't motion.
const heroImages: Record<number, ProjectImage> = {};

// The media sequence below each project's overview. Dimensions are the
// supplied artwork's own, scaled down for web.
const galleries: Record<number, ProjectGallery> = {};

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
