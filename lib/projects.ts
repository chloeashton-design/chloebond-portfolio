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
  /** The clip's own shape. Defaults to 16/9; anything squarer is held rather than stretched. */
  ratio?: '16/9' | '5/4' | '4/5' | '1/1';
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
  /**
   * Runs to the edges of the page rather than sitting inside the gallery's
   * side margin, matching the hero banner's width. For a full-page screenshot
   * that wants every pixel of width. Only meaningful on a row of its own.
   */
  bleed?: boolean;
}

/** A silent looping clip sitting in the gallery, played like the hero loop. */
export interface ProjectVideo extends HeroLoop {
  kind: 'video';
  ratio: '16/9' | '5/4' | '4/5' | '1/1';
}

/**
 * A vector animation played from its own JSON export. Worth the separate kind:
 * the artwork is drawn as shapes, so it stays sharp at any width, and it weighs
 * a fraction of the same footage as video.
 */
export interface ProjectLottie {
  kind: 'lottie';
  /** Path to the animation JSON. */
  src: string;
  alt: string;
  /** The export's own dimensions, which set the frame's shape. */
  width: number;
  height: number;
  /** Frame shown under reduced motion. Pick one where the story has landed. */
  stillFrame: number;
  /**
   * The frame the loop restarts at. These exports all declare 1200 frames but
   * stop moving long before that, so left to run their full length they sit
   * motionless for most of every cycle and read as broken. Set this a beat
   * past the last keyframe: long enough to take in the finished state, short
   * enough that the restart still feels like a loop.
   */
  loopEnd?: number;
  /** Holding colour until the animation paints. */
  tint?: string;
}

/**
 * A whole icon set, laid out as one field. Its own kind because the point of a
 * set is its consistency, which only shows when every piece is on screen at
 * once -- so it gets a full-bleed panel rather than a row of pictures.
 */
export interface ProjectIcons {
  kind: 'icons';
  /** What the set is, for anyone who can't see the field. */
  label: string;
  /** Ground behind the icons, which are drawn on transparency. */
  background?: string;
  items: Array<{ src: string; alt: string }>;
}

export type GalleryItem = ProjectImage | ProjectVideo | ProjectLottie | ProjectIcons;

/** One row of the gallery: a single item runs full width, two sit side by side. */
export type GalleryRow = GalleryItem[];

/**
 * The media sequence below a project's overview: rows, with 'divider' wherever
 * a rule should separate one group of work from the next. A project covering
 * several campaigns reads far better broken up than run together.
 */
export type ProjectGallery = Array<GalleryRow | 'divider'>;

/**
 * A whole web page presented as one continuous scroll, with a live loop playing
 * in place of one of its sections.
 *
 * The slices are contiguous pieces of a single tall export, cut on rows of flat
 * background colour and stacked flush; `above` runs before the loop's slot and
 * `below` after it. The slot's geometry is expressed relative to the page width
 * so it stays locked to the artwork at every screen size.
 */
export interface SiteScroll {
  /** The page's own background, filling the slot's margin and any seam. */
  background: string;
  above: ProjectImage[];
  below: ProjectImage[];
  /** Without one, the slot shows a placeholder. */
  video?: HeroLoop;
  /** Side margin of the slot, as a percentage of the page width. */
  videoInset: string;
  /** The slot's shape, as a CSS aspect-ratio. */
  videoRatio: string;
  /** Corner radius of the slot, as a percentage of the page width. */
  videoRadius: string;
}

export interface Project {
  slug: string;
  index: number;
  title: string;
  /** The wide tile in its row of three. Its ratio sets that row's height. */
  tileLarge: boolean;
  /** The loop in this project's tile on the home work grid. */
  hero?: HeroLoop;
  /** A still tile, for a project whose lead artwork isn't motion. */
  heroImage?: ProjectImage;
  /**
   * The banner inside the project page. Deliberately a separate slot from the
   * grid tile above, so a project can lead with one image on the work grid and
   * a different one on its own page. With neither set, the page keeps its
   * placeholder banner.
   */
  pageHero?: HeroLoop;
  /** A still page banner, the counterpart to `pageHero`. */
  pageHeroImage?: ProjectImage;
  /** When set, replaces the placeholder intro and metadata on the project page. */
  content?: ProjectContent;
  /** When set, replaces the placeholder image rows on the project page. */
  gallery?: ProjectGallery;
  /** A full page shown as one continuous scroll, above any gallery rows. */
  siteScroll?: SiteScroll;
  /**
   * Work that exists but can't be published yet. The banner says so and the
   * page carries no imagery at all -- placeholder rows would suggest artwork
   * is merely outstanding, when it is being deliberately withheld.
   */
  comingSoon?: boolean;
}

const TOTAL_PROJECTS = 9;

// Real project names. Anything unnamed falls back to "Project 0N".
const names: Record<number, string> = {
  1: 'Rewind Website',
  2: 'Rewind Brand',
  3: 'Bonds Decor',
  4: 'Wild Fauna',
  5: 'Rückify ESG Report',
  6: 'Rückify Brand',
  7: 'Tweed Campaigns',
  8: 'Sole Sneaker Club',
  9: 'Rewind Hero Animations',
};

// URL slugs for named projects. Unlisted projects keep "project-0N".
// When a project takes a named slug, add a redirect in next.config.ts from its
// numbered path so any link shared while that URL was live still resolves.
const slugs: Record<number, string> = {};

const content: Record<number, ProjectContent> = {
  1: {
    intro: [
      'As Rewind evolved from a Shopify-focused backup tool into an enterprise business continuity platform, the website still reflected the company it had been. With four distinct audiences across eCommerce, Software Development, Accounting, and Productivity, the redesign needed to make Rewind’s new positioning feel clearer, more confident, and more relevant.',
      'I led the redesign end to end, owning both the design and the project plan behind it. I worked closely with our PMM and development agency, building the site as a flexible system rather than a collection of one-off pages.',
      'A key idea I proposed, and the executive team backed, was an adaptive homepage with five views: one general and one for each vertical. Visitors could switch audiences and see the messaging and featured tools update around their needs, making the experience immediately more relevant.',
      'The result was a more confident, scalable website that better matched Rewind’s enterprise positioning and gave each audience a clearer path into the product. The new system also made it easier for the team to evolve pages, messaging, and vertical-specific content over time.',
    ],
    client: 'Rewind',
    year: '2026',
    role: 'Senior Graphic Designer',
    scope: 'Art direction, web design, UX',
    tools: 'Figma, Claude Code, Claude Design, ChatGPT',
  },
  2: {
    intro: [
      'Rewind’s market had shifted. AI-driven workflows and automation made protecting business-critical SaaS apps a top priority for prospects, and we were no longer just a backup tool. We needed to become the SaaS resilience platform for enterprise companies, but our startup-era look and feel didn’t match the size of deals we wanted to close.',
      'I advocated for the redesign and gathered input from every essential stakeholder, including executives, on what the new Rewind should look like. From that input, I developed the creative direction: a darker palette, cleaner typography, and an ownable photography direction that moved away from playful startup illustrations toward something confident and polished, while staying true to Rewind’s essence. I pitched the direction to the executive team and got 100% alignment.',
      'To help the team adopt the new brand quickly, I built the brand guidelines as a live microsite in Claude instead of a static PDF, so internal and external partners could reference it directly. I also built a full design system in Claude Design that let the team self-serve slide decks, social content, and other production work without design input on every asset, freeing design time for creative thinking and strategy.',
      'The rebrand landed with full executive alignment and minimal rounds of revisions, which mattered given how many senior stakeholders had a stake in it. The live guidelines microsite and self-serve design system let the new brand scale across the org, internally and externally, without design becoming a bottleneck. It gave Rewind the confident, enterprise-ready look the business needed to compete for larger deals.',
    ],
    client: 'Rewind',
    year: '2026',
    role: 'Senior Graphic Designer',
    scope: 'Art direction, brand, strategy',
    tools: 'Figma, Illustrator, Photoshop, InDesign, Claude',
  },
  3: {
    intro: [
      'Bonds Decor is a local, family-owned home decor and paint retailer heading into their 100th anniversary in 2027. Their existing brand felt generic and modern, nothing like a business with a century of history behind it. They brought me in to rebuild it from the ground up ahead of their centennial celebration.',
      'I stripped back the modern look and rebuilt the identity around nostalgia and heritage: a new logo, colour palette, and typography grounded in a warm, vintage-inspired aesthetic. The direction draws on a century of craftsmanship and connection, aiming for something that feels established and enduring rather than trendy.',
      'Since paint is their primary product, I built the logo around a paintbrush with three strokes representing red, blue, and yellow, the three primary colours behind every other colour. I also designed a dedicated lockup for their 100th anniversary to show the flexibility of the new mark.',
      'The client loved the direction enough to build the rest of the business around it. The new identity now extends to a store sign, a truck wrap, and the design of their new store opening, all built around the art direction I set. I’m continuing on as an ongoing design consultant for their marketing team, rolling the brand out across their website, ad campaigns, email signatures, and signage.',
    ],
    client: 'Bonds Decor',
    year: '2026',
    role: 'Freelance Graphic Designer',
    scope: 'Art direction, brand, strategy',
    tools: 'Illustrator, Photoshop, InDesign, Claude, ChatGPT',
  },
  4: {
    intro: [
      'Wild Fauna is a forest and nature school in Ottawa’s east end that teaches kids through outdoor exploration and play. They came to me for a logo redesign since a full rebrand wasn’t in their budget. I believed in their mission enough to do the full rebrand anyway.',
      'I built a complete brand package: logo, colour palette, typography, doodles and icons, and real examples of the brand in use.',
      'I also helped them define brand pillars, giving them a clear point of view for how they talk about Wild Fauna and a strategy for how they show up in the world, plus ongoing support to help them carry it forward.',
      'The client loved it immediately and started rolling the new logo into their Facebook profile and cover photos right away, with a full announcement planned for the following month. In their words: “It does not feel like enough for the beautiful work you created and how perfectly you captured our vision.” They’ve since asked to stay connected for future work.',
    ],
    client: 'Wild Fauna',
    year: '2026',
    role: 'Freelance Graphic Designer',
    scope: 'Art direction, brand, strategy',
    tools: 'Illustrator, Photoshop, InDesign, Claude, ChatGPT',
  },
  5: {
    intro: [
      'Rückify was an online peer-to-peer marketplace for renting anything, built around the sharing economy. Ahead of a major acquisition, the team needed an in-depth ESG report that could double as a pitch deck, making the case for Rückify’s mission, vision, and social, economic, and governance potential to investors.',
      'My role was to build a clean, data-driven design system that reflected Rückify’s brand while keeping the report clear and credible for investors. I led creative direction and execution across the full report: layout and typesetting for more than 60 pages, data visualization and infographics to simplify complex information, and image treatments and colour systems to keep everything consistent.',
      'I worked closely with our Senior Content Marketing Manager and an external content team from PwC to build the report from the ground up, aligning content, design, and strategy into one cohesive story. We ran multiple rounds of review with executive stakeholders, refining both narrative and visuals as we went.',
      'Shortly after the report went out, Rückify closed an additional $7M+ capital raise. I can’t say the report alone drove that, but it helped position the company clearly enough for investors to see where their money should go. Internally, it landed just as well: the executive team and employees got genuinely excited about where Rückify was headed, giving the company a shared vision and a real morale boost.',
    ],
    client: 'Rückify',
    year: '2021',
    role: 'Senior Graphic Designer',
    scope: 'Art direction, editorial, layout',
    tools: 'InDesign, Illustrator, Photoshop',
  },
  6: {
    intro: [
      'Rückify was growing fast and had only ever had a contractor handle the logo and basic foundational design work. They brought me onto the marketing team to actually evolve the brand and bring the look and feel up to match where the company was headed.',
      'As a lean team, I had a lot of creative control and was the main point of contact for all things brand and creative. I built out brand guidelines, custom iconography, and image treatments, and set the tone for the brand’s overall creative direction, both the look and feel and the copy.',
      'I designed email templates covering rental booking confirmations, welcome emails, and trending items, and designed in-store signage for partner retailers offering rentable gear, like ski equipment, through Rückify.',
      'The brand evolved into a more trusted, legitimate-looking rental marketplace, which led to more sign-ups and bookings.',
    ],
    client: 'Rückify',
    year: '2021',
    role: 'Senior Graphic Designer',
    scope: 'Art direction, brand, strategy',
    tools: 'Figma, Illustrator, Photoshop, InDesign',
  },
  7: {
    intro: [
      'Tweed needed a series of retail campaigns that could work across both digital and print, from social content to in-store signage across Canada. I worked on three: Holiday, Valentine’s Day, and a campaign celebrating Tweed’s TerraCycle partnership reaching one million pieces of packaging recycled. Each needed to feel approachable, celebratory, and distinctly Tweed while holding together across a wide range of formats.',
      'I worked closely with our art director and photography studio across all three campaigns, helping develop concepts, style props, support the shoots, and retouch the final imagery. From there, I designed the full campaign systems across social, retail signage, and in-store applications.',
      'For Holiday, cannabis became part of the seasonal visual language, appearing as a gift bow and mistletoe across store windows nationwide. Valentine’s Day paired Tweed’s cannabis-infused milk chocolate with a bud bouquet, while the TerraCycle campaign used the one-million-piece milestone as the creative centrepiece to spotlight the brand’s environmental commitment.',
      'The campaigns rolled out across retail and digital channels, supporting product launches, seasonal moments, and brand initiatives at a national scale. They also gave me hands-on experience carrying a campaign from concept and shoot through to final execution across print and digital, a foundation that shaped how I approached campaign work from then on.',
    ],
    client: 'Tweed (Canopy Growth)',
    year: '2019',
    role: 'Graphic Designer',
    scope: 'Art direction, campaign, retail design, photo retouching',
    tools: 'Illustrator, Photoshop, InDesign',
  },
  8: {
    intro: [
      'Sole Sneaker Club is a digital fashion NFT project raising funds to provide new shoes to underprivileged youth. They approached me to build a youthful, nostalgic, playful brand identity for the project. NFTs were still a new concept to a lot of people, so I wanted the identity to feel relevant without feeling unfamiliar.',
      'To ground the identity in something familiar, I pulled from the Y2K fashion era that was trending at the time, referencing brands like Von Dutch, Juicy Couture, Phat Farm, Ed Hardy, and Paul Frank. I developed the creative strategy, logo, and custom illustration work that carried that nostalgic, playful feel across the brand, including merch designs for their first printed collection.',
      'The client was thrilled with the brand identity and merch designs. The first merch collection sold out in three days.',
    ],
    client: 'Sole Sneaker Club',
    year: '2023',
    role: 'Freelance graphic designer',
    scope: 'Art direction, brand, illustration',
    tools: 'Illustrator, Photoshop, InDesign',
  },
  9: {
    intro: [
      'Rewind’s hero graphics were static product UI screenshots, which didn’t land well with our less technical audiences, like Shopify store owners and accountants using QuickBooks Online. The product itself felt complex, and I proposed we create graphics that actually showed what Rewind does instead of just showing the interface.',
      'I took the initiative to move to an animated approach, since it let us visualize the real value simply: Rewind takes your data, backs it up, and makes it recoverable. I designed the animations and storyboarded how the movement needed to work, then partnered with our in-house motion designer, Felix Pennell, to bring them to life.',
      'The result was a consistent hero animation treatment that made Rewind’s capabilities easy to understand at a glance. We A/B tested the new animations against the old static graphics, and the animations won.',
    ],
    client: 'Rewind',
    year: '2023',
    role: 'Senior Graphic Designer',
    scope: 'Art direction, animation, illustration',
    tools: 'Illustrator, After Effects',
  },
};

// Projects whose hero slot has real motion rather than a placeholder.
const heroes: Record<number, HeroLoop> = {
  1: {
    src: '/media/project-01/rewind-site',
    alt: 'The redesigned Rewind homepage on a monitor in a warm orange-lit room — “Protecting the SaaS data your business runs on” — with a ticker of integration logos gliding along beneath the headline.',
    // One pass of the ticker, its tail cross-faded into its head so the loop
    // has no seam. Nothing else in the frame moves.
    sources: ['mp4'],
    gifFallback: false,
    tint: '#c05a1d', // the wall's orange
  },
  2: {
    src: '/media/project-02/rewind-mark',
    alt: 'The Rewind mark — a chrome chevron of two curved blades — turning slowly on a dark navy ground ruled with a faint grid, catching the light as it rotates.',
    ratio: '5/4',
    // The loop opens on the mark face-on, so the poster is frame 0 and the
    // clip picks up exactly where the still leaves off.
    sources: ['mp4'], // encoded from a GIF; H.264 came in at an eighth of the size
    gifFallback: false,
    tint: '#1b2232', // the navy ground
  },
  9: {
    src: '/media/project-09/shopify-backups',
    alt: 'An animated Rewind hero for Shopify: a product card flashes “Oops! It looks like this product was deleted,” then the Vault restores it and a checklist of products, themes and collections ticks green.',
    // The action is over by 10 s and the source then holds for another 16, so
    // the loop is cut at 13 with its tail faded to the lavender ground: the
    // wrap reads as the animation starting over, not a jump.
    posterTime: 12, // the restored state, everything ticked
    sources: ['mp4'],
    gifFallback: false,
    tint: '#e5e9fa',
  },
};

// Still heroes, for projects whose lead artwork isn't motion.
const heroImages: Record<number, ProjectImage> = {
  4: {
    src: '/media/project-04/wild-fauna-5x4.webp',
    alt: 'Three young children and an adult tend a vegetable garden thick with tomatoes and greens, the photograph set on a lime ground beside the Wild Fauna monogram and hand-drawn flower and butterfly doodles.',
    width: 1080,
    height: 864,
  },
  3: {
    src: '/media/project-03/bonds-decor-tee.webp',
    alt: 'A navy pocket tee, the Bonds Decor script logo printed on the pocket in cream above a paintbrush trailing yellow, blue and red stripes.',
    width: 1174,
    height: 1328,
  },
  5: {
    src: '/media/project-05/ruckify-esg-cover.webp',
    alt: 'The cover of the Rückify 2020 Sustainability Impact Report: “Creating a Sustainable Alternative to Buying” in coral type on a white panel, over a photograph of an evergreen forest under a cloudy sky.',
    width: 1920,
    height: 1080,
  },
  6: {
    // Renamed rather than overwritten, so no CDN holds the portrait crop at the old URL.
    src: '/media/project-06/ruckify-brand-5x4.webp',
    alt: 'A white enamel pin of the Rückify ü smiley, its orange letter between two teal dots, fastened to the chest pocket of a light denim jacket.',
    // Held at 1080 rather than the source's 1238: the tile never draws wider
    // than 846, and the denim weave makes every extra pixel expensive.
    width: 1080,
    height: 864,
  },
  7: {
    src: '/media/project-07/tweed-campaigns.webp',
    alt: 'The Tweed script wordmark in white, set over a close-up of a brown tweed jacket worn with a mustard tee.',
    width: 894,
    height: 1118,
  },
  8: {
    // Renamed rather than overwritten, so no CDN holds the portrait crop at the old URL.
    src: '/media/project-08/sole-sneaker-club-5x4.webp',
    alt: 'White high-top sneakers and cuffed jeans shot from below against a pale blue sky, the Sole Sneaker Club logo centred over them in cyan and pink bubble type on clouds, under a gold halo.',
    width: 1350,
    height: 1080,
  },
};

// The media sequence below each project's overview. Dimensions are the
// supplied artwork's own, scaled down for web.
/**
 * The category set built for the marketplace: what could be rented, and the
 * machinery around renting it. Listed as names rather than fifty objects, since
 * every one resolves to the same shape of file.
 */
const RUCKIFY_ICONS = [
  'Analytics', 'Availability', 'Backyard', 'Bike', 'Books', 'Cooking', 'Customer service',
  'Damage protection', 'Delivery', 'Electronics', 'Equipment', 'Fashion', 'Fitness',
  'Fraud detection', 'Handcraft', 'Happy', 'Heavy equipment', 'Invoice', 'Kids and baby',
  'Marketing', 'Marketplace', 'Medical', 'Member', 'Movie', 'Moving and storage', 'Music',
  'Office and house', 'Outdoors', 'Paddle board', 'Party and event', 'Payment', 'Pets',
  'Phone', 'Photography', 'Protection', 'RuckBucks', 'Running and exercise', 'RV and towables',
  'Secure payments', 'Security', 'Snowflake', 'Spaces', 'Sports', 'Theft protection', 'Tools',
  'Toys and games', 'Travel', 'Vehicles', 'Video games', 'Watercraft',
];

const galleries: Record<number, ProjectGallery> = {
  6: [
    [
      {
        kind: 'video',
        src: '/media/project-06/ruckify-guidelines-loop',
        alt: 'The Rückify brand guidelines turning through their pages — logo construction, colour, typography, iconography and photography.',
        ratio: '16/9',
        // Filed as -loop so its poster can't collide with the guidelines still
        // in the row below, which shares the name.
        gifFallback: false,
        tint: '#efefef',
      },
    ],
    [
      {
        src: '/media/project-06/ruckify-brandguidelines.webp',
        alt: 'Spreads from the guidelines laid out in a grid, covering layout, colour, iconography and photography.',
        width: 1920,
        height: 1399,
      },
    ],
    [
      {
        src: '/media/project-06/ruckify-imagetreatment1.webp',
        alt: 'A shop owner with a tablet outside a teal door, a Rückify listing card for a sewing machine overlaid on the photograph.',
        width: 1200,
        height: 1200,
      },
      {
        src: '/media/project-06/ruckify-imagetreatment2.webp',
        alt: 'The same owner holding a “Welcome, we are open” sign, framed by the coral U and teal dots of the brand’s image treatment.',
        width: 1148,
        height: 1148,
      },
      {
        src: '/media/project-06/ruckify-imagetreatment3.webp',
        alt: 'Two people looking at a phone, with rental request cards for weights, skates and an iPad floating alongside them.',
        width: 1622,
        height: 1178,
      },
    ],
    [
      {
        src: '/media/project-06/ruckify-pin.webp',
        alt: 'A white enamel pin of the Rückify ü smiley fastened to the pocket of a denim jacket.',
        width: 1400,
        height: 722,
      },
    ],
    [
      {
        src: '/media/project-06/ruckify-emails.webp',
        alt: 'Three email templates on phones: trending rentals, a welcome to the community, and a booking confirmation.',
        width: 1920,
        height: 1080,
      },
    ],
    [
      {
        src: '/media/project-06/ruckify-businesscards.webp',
        alt: 'Business cards scattered face up and face down, the wordmark and ü monogram in coral and teal on white.',
        width: 2308,
        height: 1188,
      },
    ],
    [
      {
        src: '/media/project-06/ruckify-ad1.webp',
        alt: 'Two member ads — “Meet Joseph.” and “Meet Sarah.” — each pairing a portrait with the coral U device.',
        width: 2310,
        height: 1188,
      },
    ],
    [
      {
        src: '/media/project-06/ruckify-ad2.webp',
        alt: 'Two listing ads under “Rent anything from anyone.”, one for a ladder and one for a movie night bundle.',
        width: 2314,
        height: 1192,
      },
    ],
    [
      {
        kind: 'icons',
        label: `The Rückify icon set: ${RUCKIFY_ICONS.length} category and service icons drawn as one monoline system`,
        background: '#efefec',
        items: RUCKIFY_ICONS.map((name) => ({
          src: `/media/project-06/icons/${name
            .toLowerCase()
            .replace(/ and /g, '-')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')}.webp`,
          alt: name,
        })),
      },
    ],
  ],
  // Three campaigns, ruled off from each other: Holiday, Valentine's, TerraCycle.
  7: [
    [
      {
        src: '/media/project-07/tweed-holiday-retail.webp',
        alt: 'A Tweed storefront at dusk, its windows lit and dressed with the Tweed the Season campaign in pale green.',
        width: 2000,
        height: 1333,
      },
    ],
    [
      {
        src: '/media/project-07/tweed-holiday-gift.webp',
        alt: 'A gift wrapped in sage paper, tied with ribbon and finished with a cannabis bud in place of a bow, its tag reading “Hi.”',
        width: 1122,
        height: 1112,
      },
      {
        src: '/media/project-07/tweed-holiday-mistletoe.webp',
        alt: 'A cannabis bud hung on a ribbon like mistletoe against a sage ground.',
        width: 860,
        height: 1110,
      },
      {
        src: '/media/project-07/tweed-holiday-pipe.webp',
        alt: 'A repeating pattern of pale ceramic pipes laid out in rows on sage.',
        width: 844,
        height: 564,
      },
    ],
    [
      {
        src: '/media/project-07/tweed-holiday-banner.webp',
        alt: 'The campaign banner: “’Tweed the Season.” set beside the bud-topped gift on a sage ground.',
        width: 1840,
        height: 612,
      },
    ],
    'divider',
    [
      {
        src: '/media/project-07/tweed-valentines-chocolate.webp',
        alt: 'A box of Tweed cannabis-infused milk chocolate standing on a wooden table against a pink curtain.',
        width: 1080,
        height: 1080,
      },
      {
        src: '/media/project-07/tweed-valentines-flowers.webp',
        alt: 'A bouquet of cannabis buds and leaves arranged like flowers on the same wooden table.',
        width: 1080,
        height: 1080,
      },
    ],
    [
      {
        src: '/media/project-07/tweed-valentines-combo.webp',
        alt: 'The pairing shot: the bud bouquet beside the chocolate carton, lit against the pink curtain.',
        width: 1080,
        height: 1620,
      },
      {
        kind: 'video',
        src: '/media/project-07/tweed-valentines-loop',
        alt: 'The Valentine’s campaign animating — the bud bouquet and the box of infused chocolate coming together on the pink set.',
        ratio: '5/4',
        sources: ['mp4'],
        gifFallback: false,
        tint: '#fbb3c2',
      },
    ],
    'divider',
    [
      {
        src: '/media/project-07/tweed-terracycle-poster.webp',
        alt: 'The TerraCycle poster: “1,000,000. Big number. Bigger impact.” in white over hands cradling packaging, under a recycling mark.',
        width: 1080,
        height: 1669,
      },
      {
        src: '/media/project-07/tweed-terracycle-retail.webp',
        alt: 'The same milestone artwork installed full height in a Tweed store, beside the counter and product wall.',
        width: 2000,
        height: 1333,
      },
    ],
    [
      {
        kind: 'video',
        src: '/media/project-07/tweed-terracycle-loop',
        alt: 'The TerraCycle milestone animating, the one-million count building on an olive ground.',
        ratio: '5/4',
        sources: ['mp4'],
        gifFallback: false,
        tint: '#c9cb9f',
      },
    ],
  ],
  // Four hero animations, one per row, ruled off from each other.
  9: [
    [
      {
        kind: 'lottie',
        src: '/media/project-09/github.json',
        alt: 'A GitHub repository throws a 404 critical error, then the Vault restores it: the code file returns and repositories, issues and projects each tick green under “GitHub data has been restored”.',
        width: 632,
        height: 356,
        stillFrame: 880,
        loopEnd: 896,
        tint: '#f4f1fb',
      },
    ],
    'divider',
    [
      {
        kind: 'lottie',
        src: '/media/project-09/microsoft.json',
        alt: 'A Microsoft 365 file list sits empty until the Vault restores it, folders filling back in as SharePoint, OneDrive and Teams tick green under “Your Microsoft 365 data is restored”.',
        width: 632,
        height: 356,
        stillFrame: 510,
        loopEnd: 524,
        tint: '#f4f1fb',
      },
    ],
    'divider',
    [
      {
        kind: 'lottie',
        src: '/media/project-09/quickbooks.json',
        alt: 'QuickBooks reports “Oops! We can’t seem to locate those files”, then the Vault restores them: charts and tables redraw and reports, expenses and attachments tick green.',
        width: 632,
        height: 356,
        stillFrame: 880,
        loopEnd: 896,
        tint: '#f4f1fb',
      },
    ],
    'divider',
    [
      {
        kind: 'lottie',
        src: '/media/project-09/trello.json',
        alt: 'A Trello board full of warning triangles is restored by the Vault, its cards returning as boards, cards and attachments tick green under “Your Trello data is restored”.',
        width: 632,
        height: 356,
        stillFrame: 510,
        loopEnd: 524,
        tint: '#f4f1fb',
      },
    ],
  ],
  8: [
    [
      {
        src: '/media/project-08/ssc-logo.webp',
        alt: 'The Sole Sneaker Club logo: bubble letters in cyan and pink on a cloud, crowned with a gold halo.',
        width: 1920,
        height: 812,
      },
    ],
    [
      {
        src: '/media/project-08/ssc-hoodie1.webp',
        alt: 'A grid of hoodies in black, orange, purple, mint, pink and green, each carrying a different Sole Sneaker Club graphic.',
        width: 1080,
        height: 1080,
      },
      {
        src: '/media/project-08/ssc-hoodie2.webp',
        alt: 'Two “Good Vibes Only” tees, white on cyan and black on pink, printed with the club mascot.',
        width: 1080,
        height: 1080,
      },
    ],
    [
      {
        src: '/media/project-08/ssc-social.webp',
        alt: 'The social grid: sneaker photography, mascot illustrations and quote posts in the club’s cyan, pink and yellow.',
        width: 1920,
        height: 1246,
      },
    ],
    [
      {
        src: '/media/project-08/ssc-mascot.webp',
        alt: 'The mascot — a pink unicorn with a blue mane, in sneakers and flashing a peace sign — surrounded by stars and rainbows.',
        width: 1920,
        height: 1080,
      },
    ],
  ],
  3: [
    [
      {
        src: '/media/project-03/bonds-tee.webp',
        alt: 'A navy pocket tee with the Bonds Decor script logo printed on the pocket in cream above a paintbrush trailing yellow, blue and red stripes.',
        width: 901,
        height: 1126,
      },
      {
        src: '/media/project-03/bonds-loyaltycard.webp',
        alt: 'Bonds Decor loyalty cards on navy: one illustrated with nine paint cans reading “Grab eight paint cans and get the ninth paint can free”, the other carrying the logo and the words Loyalty Program.',
        width: 896,
        height: 1120,
      },
    ],
    [
      {
        src: '/media/project-03/bonds-centennial-logo.webp',
        alt: 'The centennial lockup on cream: the Bonds script above the paintbrush and its three stripes, set beside “100 Years of Business”.',
        width: 1920,
        height: 1080,
      },
    ],
    [
      {
        src: '/media/project-03/bonds-store.webp',
        alt: 'The new store interior, the Bonds Decor logo painted large in cream across a deep navy wall above the polished concrete floor.',
        width: 1448,
        height: 814,
      },
    ],
    [
      {
        src: '/media/project-03/bonds-mascot.webp',
        alt: 'A line-drawn mascot in navy on cream: a smiling driver in a flat cap at the wheel of a pickup loaded with a wooden chair and open paint cans.',
        width: 1920,
        height: 1080,
      },
    ],
    [
      {
        src: '/media/project-03/bonds-paint.webp',
        alt: 'Six paintbrushes on navy, each loaded with a different colour — green, teal, orange, red, blue and yellow — over swatch cards of the same shades.',
        width: 735,
        height: 1102,
      },
      {
        src: '/media/project-03/bonds-truck.webp',
        alt: 'The delivery truck wrapped in navy, its box panel carrying the Bonds Decor logo under the line “Making houses into homes, since 1927”.',
        width: 1774,
        height: 887,
      },
    ],
  ],
};

// Banners inside the project pages, a separate slot from the work-grid tiles
// above so a project can lead with different artwork in each place. A project
// with no entry here keeps its placeholder banner.
const pageHeroes: Record<number, HeroLoop> = {
  // Rewind Website is the exception: it opens on the same loop its tile shows.
  // Referenced rather than restated, so the two can't drift apart.
  1: heroes[1],
  // Rewind Hero Animations opens on its tile's loop too, for the same reason.
  9: heroes[9],
  8: {
    src: '/media/project-08/ssc-guidelines',
    alt: 'The Sole Sneaker Club brand guidelines flicking through their pages — cover, welcome, mood board, logo and mark, mascot, colour palette, typefaces, hoodies, tees, caps, social, and a closing thanks.',
    // Thirteen slides at half a second each. Both formats are shipped here,
    // unusually: hard cuts between flat, gradient-heavy pages are the one thing
    // VP9 encodes smaller than H.264, by a quarter.
    gifFallback: false,
    tint: '#fb6195', // the hot pink the pages sit on
  },
};
const pageHeroImages: Record<number, ProjectImage> = {
  6: {
    src: '/media/project-06/ruckify-hero.webp',
    alt: 'A woodworker in his shop, with Rückify listing cards overlaid offering his workbench, mitre saw and garage space for rent.',
    width: 1920,
    height: 1080,
  },
  7: {
    src: '/media/project-07/tweed-hero.webp',
    alt: 'The Tweed script wordmark in white over a close-up of a brown houndstooth jacket worn with a mustard tee.',
    width: 1920,
    height: 1080,
  },
  3: {
    src: '/media/project-03/bonds-logo.webp',
    alt: 'The Bonds Decor logo on deep navy: “Bonds” in cream script above a paintbrush trailing yellow, blue and red stripes into the word DECOR.',
    width: 1920,
    height: 1080,
  },
};

// Projects whose work can't be shown yet. Rewind Brand stays under wraps until
// the brand itself launches.
const COMING_SOON = new Set([2]);

// Full pages shown as one continuous scroll below the overview.
const siteScrolls: Record<number, SiteScroll> = {
  1: {
    // The Rewind homepage's own ground, #DEDED4.
    background: '#dedad4',
    above: [
      {
        src: '/media/project-01/rewind-site-top.webp',
        alt: 'The top of the redesigned Rewind homepage: a dark navigation bar carrying the logo, menus for integrations, solutions, resources, company and pricing, and buttons to book a demo or start a free trial.',
        width: 2880,
        height: 347,
      },
    ],
    below: [
      {
        src: '/media/project-01/rewind-site-body-1.webp',
        alt: 'Statistics and positioning down the page: 86TB recovered, 7.1PB stored, 112B files protected and 25,000+ organisations, then “The platform is protected. Your data is not.” over cards explaining the shared responsibility model and proof of recovery.',
        width: 2880,
        height: 4499,
      },
      {
        src: '/media/project-01/rewind-site-body-2.webp',
        alt: 'The vertical switcher in use — software development, eCommerce, accounting and productivity — over a product screen, followed by a grid of integrations including Jira, Confluence, GitLab, Shopify and Mailchimp.',
        width: 2880,
        height: 4496,
      },
      {
        src: '/media/project-01/rewind-site-body-3.webp',
        alt: 'A comparison table setting Rewind against native tools, DIY scripts and other vendors across recovery, retention and compliance, above a row of security certifications.',
        width: 2880,
        height: 2634,
      },
      {
        src: '/media/project-01/rewind-site-body-4.webp',
        alt: 'Per-app pricing cards, a row of resource articles on SaaS resilience, and a closing panel reading “Deploy AI boldly. Recover fast.” above the site footer.',
        width: 2880,
        height: 3631,
      },
    ],
    video: {
      src: '/media/project-01/rewind-hero',
      alt: 'The Rewind homepage cycling through its five audiences — all integrations, software development, eCommerce, accounting and productivity — the headline, theme and row of integration logos changing with each.',
      // The recording carries its own navigation bar, which the slice directly
      // above already shows, so the top 82px are cropped away and the loop
      // begins at the hero itself.
      sources: ['mp4'],
      gifFallback: false,
      tint: '#191d2a', // the dark hero ground the loop opens on
    },
    // Measured off the export: the hero panel sits 80px in from each edge of a
    // 3040px page and is rounded by 35px. The slot takes the cropped
    // recording's own 1440x812 rather than the placeholder's 2880x1528, which
    // is fractionally wider -- a difference of 48px on screen, against losing
    // 7% of the animation off the top and bottom.
    videoInset: '2.6316%',
    videoRatio: '1440 / 812',
    videoRadius: '1.151%',
  },
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
    pageHero: pageHeroes[index],
    pageHeroImage: pageHeroImages[index],
    content: content[index],
    gallery: galleries[index],
    siteScroll: siteScrolls[index],
    comingSoon: COMING_SOON.has(index) || undefined,
  };
});

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(current: Project): Project {
  const nextIndex = current.index % projects.length; // wraps last project back to project[0]
  return projects[nextIndex];
}
