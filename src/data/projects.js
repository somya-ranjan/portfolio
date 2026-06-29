import {
  PROJECT_IAM,
  PROJECT_SAAS_COMMERCE,
  PROJECT_HRMS,
  PROJECT_NFT,
  PROJECT_BOOKING,
  PROJECT_CMS,
  PROJECT_NPM,
  PROJECT_DASHBOARD,
} from "@/assets/img";

export const projects = [
  {
    id: 1,
    category: "corporate",
    title: "Access Management Web App",
    company: "Mercedes-Benz Research & Development India",
    description:
      "Developing a global access management web application aligned with IAM governance standards and enterprise compliance. Boosted performance by 65% through optimized rendering, efficient API integration, and Git submodules for shared UI. Improved accessibility and scalability with modular architecture and lazy loading.",
    image: PROJECT_IAM,
    tech: ["React", "TypeScript", "IAM Compliance", "Git Submodules", "REST APIs"],
    link: {
      gitHub: "",
      liveLink: "",
      iFrame: "",
    },
    metrics: "65% performance boost",
  },
  {
    id: 2,
    category: "corporate",
    title: "E-Commerce & SaaS Platforms",
    company: "TechneAI Pvt. Ltd",
    description:
      "Engineered and deployed advanced applications for e-commerce and SaaS platforms. Boosted application performance from 19% to 70% by applying code splitting, Webpack optimization, lazy loading, and multithreading. Directed UI component development and library integration, achieving top Lighthouse scores for accessibility and SEO.",
    image: PROJECT_SAAS_COMMERCE,
    tech: ["React.js", "Webpack", "Multithreading", "SEO/Lighthouse"],
    link: {
      gitHub: "",
      liveLink: "",
      iFrame: "",
    },
    metrics: "19% to 70% boost",
  },
  {
    id: 3,
    category: "corporate",
    title: "Ticketing & HRMS System",
    company: "TechneAI Pvt. Ltd",
    description:
      "Developed a ticketing system with HRMS features, cutting development time by 25% and streamlining task management. Integrated job application processing and candidate onboarding, increasing overall operational efficiency.",
    image: PROJECT_HRMS,
    tech: ["React.js", "HRMS API", "Task Management"],
    link: {
      gitHub: "",
      liveLink: "",
      iFrame: "",
    },
    metrics: "-25% Dev Time",
  },
  {
    id: 4,
    category: "corporate",
    title: "Mighty Jaxx NFT Trading",
    company: "SoluLab Pvt. Ltd",
    description:
      "Engineered a premium NFT trading platform, increasing monthly trading volume by 40% through streamlined UI and business function improvements. Shortened development cycles by 25% through refined component design and modular functionality.",
    image: PROJECT_NFT,
    tech: ["React.js", "Web3", "NFT Trading", "State Management"],
    link: {
      gitHub: "",
      liveLink: "",
      iFrame: "",
    },
    metrics: "+40% Trading Volume",
  },
  {
    id: 5,
    category: "corporate",
    title: "Etabibo Appointment Booking",
    company: "SoluLab Pvt. Ltd",
    description:
      "Built a comprehensive booking platform for Medical Professionals, resulting in a 30% increase in appointments. Expanded services to include ambulance, physiotherapists, and nursemaids, enhancing user engagement by 25%. Implemented prescription uploading and medicine delivery, driving a 35% increase in prescription fulfillment.",
    image: PROJECT_BOOKING,
    tech: ["React.js", "API Integrations", "Prescription Systems"],
    link: {
      gitHub: "",
      liveLink: "",
      iFrame: "",
    },
    metrics: "+30% Appointments",
  },
  {
    id: 6,
    category: "corporate",
    title: "SL Lab Headless CMS",
    company: "SoluLab Pvt. Ltd",
    description:
      "Developed a headless CMS for 30% faster onboarding and 15% quicker page loads. Integrated UI, REST APIs, and Google Analytics, achieving a 20% speed boost. Maintained 99.8% system uptime and drove 40% user base growth.",
    image: PROJECT_CMS,
    tech: ["React.js", "Headless CMS", "Google Analytics", "Lazy Loading"],
    link: {
      gitHub: "",
      liveLink: "",
      iFrame: "",
    },
    metrics: "99.8% Uptime",
  },
  {
    id: 7,
    category: "personal",
    title: "React Utility Hooks Hub",
    description:
      "A production-ready NPM package providing a collection of reusable React hooks for common utility patterns such as debouncing, throttling, and state synchronization. Optimized for minimal bundle size and tree-shaking support.",
    image: PROJECT_NPM,
    tech: ["React", "Rollup", "TypeScript", "NPM"],
    link: {
      gitHub: "https://github.com/somya-ranjan/NPM/tree/react-utility-hooks-hub",
      liveLink: "https://www.npmjs.com/package/react-utility-hooks-hub?activeTab=readme",
      iFrame: "https://www.npmjs.com/package/react-utility-hooks-hub?activeTab=readme",
    },
  },
  {
    id: 8,
    category: "personal",
    isComingSoon: true,
    title: "Cloud Kitchen App",
    description:
      "A comprehensive cloud kitchen management application that streamlines operations, enhances customer experience, and optimizes resource allocation with real-time analytics, order management, and delivery system integrations.",
    image: PROJECT_DASHBOARD,
    tech: ["React", "MUI", "Node.js"],
    link: {
      gitHub: "",
      liveLink: "",
      iFrame: "",
    },
  },
];
