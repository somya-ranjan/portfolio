import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, OWNER_NAME } from "@/constants";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://somyaranjan.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = `${OWNER_NAME} Portfolio`;

export const SEO_TITLE = `${OWNER_NAME} | AI Frontend Engineer`;

export const SEO_DESCRIPTION =
  "Somyaranjan Sethy is an AI Frontend Engineer building React, Next.js and TypeScript systems with 65% performance gains across enterprise IAM, SaaS and e-commerce.";

export const SEO_KEYWORDS = [
  OWNER_NAME,
  "Somya Ranjan Sethy",
  "AI Frontend Engineer",
  "AI Full-Stack Engineer",
  "AI Full-Stack Developer",
  "Aspiring AI Full-Stack Engineer",
  "Full-Stack Engineer",
  "Full-Stack Developer",
  "Frontend Developer",
  "Frontend Engineer",
  "Senior Frontend Engineer",
  "React Developer",
  "React.js Developer",
  "React Engineer",
  "React TypeScript Developer",
  "Next.js Developer",
  "Next.js Engineer",
  "TypeScript Developer",
  "JavaScript Engineer",
  "JavaScript Developer",
  "Node.js Developer",
  "Node.js Engineer",
  "Full-Stack Frontend Engineer",
  "Product-Focused UI Engineer",
  "UI Engineer",
  "Software Engineer Portfolio",
  "portfolio",
  "enterprise IAM",
  "IAM Frontend Developer",
  "SaaS frontend",
  "SaaS Frontend Engineer",
  "e-commerce performance",
  "E-Commerce Frontend Developer",
  "Lighthouse optimization",
  "Web Performance Engineer",
  "Frontend Performance Optimization",
  "frontend architecture",
  "Frontend Architecture Consultant",
  "Enterprise Frontend Engineer",
  "REST API Integration",
  "Accessibility Engineer",
  "Web Accessibility",
  "Hire React Developer",
  "Hire Frontend Engineer",
  "Frontend Developer India",
  "Mercedes-Benz R&D India",
  "Capgemini",
  "TechneAI",
  "SoluLab",
];

export const PROFILE = {
  name: OWNER_NAME,
  alternateName: "Somya Ranjan",
  jobTitle: "AI Frontend Engineer",
  email: CONTACT_EMAIL,
  url: SITE_URL,
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  knowsAbout: [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Frontend Architecture",
    "Enterprise Access Management",
    "SaaS Platforms",
    "E-Commerce Performance",
    "Lighthouse Optimization",
    "Design Systems",
    "REST API Integration",
    "Accessibility",
  ],
};

const featuredProjects = [
  {
    name: "Access Management Web App",
    organization: "Mercedes-Benz Research & Development India",
    description:
      "Enterprise IAM frontend modules serving 50,000 users. Route-level code-splitting delivered a 65% page load boost with zero downtime.",
    keywords: ["React", "JavaScript", "IAM Compliance", "REST APIs"],
  },
  {
    name: "E-Commerce & SaaS Platforms",
    organization: "TechneAI Pvt. Ltd",
    description:
      "Webpack optimization program raising Lighthouse scores from 19% to 70% and cutting load times from 3.2s to 1.1s.",
    keywords: ["React.js", "Webpack", "SEO", "Lighthouse", "SaaS"],
  },
  {
    name: "Etabibo Healthcare Booking Platform",
    organization: "SoluLab Pvt. Ltd",
    description:
      "Multi-service booking interfaces handling 500,000 daily queries with client-side caching and paginated search.",
    keywords: ["React.js", "Healthcare", "Booking Platform", "API Integrations"],
  },
  {
    name: "React Utility Hooks Hub",
    organization: OWNER_NAME,
    description:
      "Open-source NPM library containing zero-dependency React hooks for debounce, throttle, and state synchronization.",
    keywords: ["React", "TypeScript", "NPM", "Open Source"],
  },
];

export function getStructuredData() {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const profilePageId = `${SITE_URL}/#profile-page`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: PROFILE.name,
        alternateName: PROFILE.alternateName,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        jobTitle: PROFILE.jobTitle,
        description: SEO_DESCRIPTION,
        email: `mailto:${PROFILE.email}`,
        sameAs: PROFILE.sameAs,
        knowsAbout: PROFILE.knowsAbout,
        worksFor: [
          {
            "@type": "Organization",
            name: "Mercedes-Benz Research & Development India",
          },
          {
            "@type": "Organization",
            name: "Capgemini",
          },
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Biju Patnaik University of Technology",
          alternateName: "BPUT",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: SEO_DESCRIPTION,
        inLanguage: "en",
        publisher: {
          "@id": personId,
        },
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: SITE_URL,
        name: SEO_TITLE,
        description: SEO_DESCRIPTION,
        inLanguage: "en",
        isPartOf: {
          "@id": websiteId,
        },
        mainEntity: {
          "@id": personId,
        },
        audience: [
          {
            "@type": "Audience",
            audienceType: "Hiring Managers and HR",
          },
          {
            "@type": "Audience",
            audienceType: "Founders and CTOs",
          },
          {
            "@type": "Audience",
            audienceType: "Tech Engineers and Peers",
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#featured-projects`,
        name: "Featured frontend engineering projects",
        itemListElement: featuredProjects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.name,
            creator: {
              "@id": personId,
            },
            contributor: {
              "@type": "Organization",
              name: project.organization,
            },
            description: project.description,
            keywords: project.keywords.join(", "),
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
        ],
      },
    ],
  };
}

export function toJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
