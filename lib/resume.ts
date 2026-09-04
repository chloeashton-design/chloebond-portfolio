export interface Role {
  role: string;
  company: string;
  years: string;
  blurb: string;
}

export const roles: Role[] = [
  {
    role: 'Senior Graphic Designer',
    company: 'Rewind',
    years: 'May 2023 — Aug 2026',
    blurb:
      'Owned brand design end to end, from creative brief to final delivery, across web, campaigns, events, social and presentations. Led a company-wide rebrand and website redesign, built a reusable component library that cut landing-page production time by roughly 85%, and art directed three designers alongside freelance and agency partners.',
  },
  {
    role: 'Graphic Designer',
    company: 'Rewind',
    years: 'Mar 2021 — May 2023',
    blurb:
      'Grew the role from campaign execution into brand and web ownership, earning promotion to Senior. Designed across digital campaigns, web, social and presentations, and created the early guidelines, templates, illustrations and icons that gave the brand a distinct visual voice.',
  },
  {
    role: 'Senior Graphic Designer',
    company: 'Ruckify',
    years: 'Nov 2020 — Feb 2021',
    blurb:
      'Led art direction and visual identity across digital and marketing touchpoints for an early-stage company, building cohesive typography, colour, iconography and layout systems — including a 60+ page ESG report.',
  },
  {
    role: 'Graphic Designer, Contract',
    company: 'Point Blank',
    years: 'Aug 2020 — Nov 2020',
    blurb:
      'Developed brand guides, campaign creative, social assets and pitch materials across multiple agency clients, working independently within a distributed remote team.',
  },
  {
    role: 'Graphic Designer',
    company: 'Tweed',
    years: 'Aug 2018 — May 2020',
    blurb:
      'Designed national B2C campaigns across digital, web, retail, social, email, events and print within a 40+ person internal agency, producing production-ready assets for launches, activations and retail experiences.',
  },
  {
    role: 'Graphic Designer',
    company: 'Aragona Agency',
    years: 'Jun 2017 — Aug 2018',
    blurb:
      'Designed digital and print brand collateral for technical B2B clients including Mitel, Solacom and Curtiss-Wright.',
  },
];

export const capabilities: string[] = [
  'Brand design & visual identity',
  'Art direction',
  'Design systems & component libraries',
  'Web & landing page design',
  'Campaign, event & social design',
  'Typography, colour & layout',
  'Accessible design',
  'Illustration & iconography',
  'Production-ready design for digital & print',
  'Cross-functional collaboration',
  'Mentorship',
];

export const tools: string[] = ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Claude', 'ChatGPT'];

export interface Education {
  program: string;
  school: string;
}

export const education: Education[] = [
  { program: 'Graphic Design, Advanced Diploma', school: 'Algonquin College · 2014—2017' },
  { program: 'Design Foundations, Ontario College Certificate', school: 'Algonquin College · 2013—2014' },
  { program: 'Design Leadership Certificate', school: 'BrainStation · 2023' },
  { program: 'UX Design Certificate', school: 'BrainStation · 2022' },
  { program: 'Social Media Marketing Certificate', school: 'Digital Marketing Institute · 2022' },
];
