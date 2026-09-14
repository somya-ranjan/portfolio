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
      "Engineered IAM frontend modules for 50,000 enterprise users. Implemented route code-splitting and API caching. Reduced page load times from 4.2s to 1.5s.",
    image: PROJECT_IAM,
    tech: ["React", "JavaScript", "IAM Compliance", "Git Submodules", "REST APIs"],
    link: {
      gitHub: "",
      liveLink: "",
      iFrame: "",
    },
    metrics: "65% boost | 4.2s → 1.5s Load Time",
  },
  {
    id: 2,
    category: "corporate",
    title: "E-Commerce & SaaS Platforms",
    company: "TechneAI Pvt. Ltd",
    description:
      "Rebuilt build pipelines with Webpack code-splitting and asset minification. Raised Lighthouse performance scores from 19% to 70%. Reduced load times from 3.2s to 1.1s.",
    image: PROJECT_SAAS_COMMERCE,
    tech: ["React.js", "Webpack", "Multithreading", "SEO/Lighthouse"],
    link: {
      gitHub: "",
      liveLink: "",
      iFrame: "",
    },
    metrics: "19% → 70% Lighthouse | 40% ↓ Bounce",
  },
  {
    id: 3,
    category: "corporate",
    title: "Ticketing & HRMS System",
    company: "TechneAI Pvt. Ltd",
    description:
      "Built internal ticketing and candidate onboarding workflows with React. Automated multi-step hiring approval pipelines. Cut operational processing delays by 40%.",
    image: PROJECT_HRMS,
    tech: ["React.js", "HRMS API", "Task Management"],
    link: {
      gitHub: "",
      liveLink: "",
      iFrame: "",
    },
    metrics: "-25% Dev Time | -40% Hiring Delays",
  },
  {
    id: 4,
    category: "corporate",
    title: "Mighty Jaxx NFT Trading Platform",
    company: "SoluLab Pvt. Ltd",
    description:
      "Engineered checkout and portfolio dashboards for digital collectibles. Optimized Redux transaction state and gas estimation calls. Decreased checkout abandonment by 35%.",
    image: PROJECT_NFT,
    tech: ["React.js", "Web3", "NFT Trading", "State Management"],
    link: {
      gitHub: "",
      liveLink: "",
      iFrame: "",
    },
    metrics: "+40% Volume | +25% Retention | 35% ↓ Abandonment",
  },
  {
    id: 5,
    category: "corporate",
    title: "Etabibo Healthcare Booking Platform",
    company: "SoluLab Pvt. Ltd",
    description:
      "Built multi-service booking interfaces handling 500,000 daily queries. Implemented client-side caching and paginated doctor search. Increased completed appointment bookings by 30%.",
    image: PROJECT_BOOKING,
    tech: ["React.js", "API Integrations", "Prescription Systems"],
    link: {
      gitHub: "",
      liveLink: "",
      iFrame: "",
    },
    metrics: "+30% Bookings | +25% Engagement | 100K+ Users",
  },
  {
    id: 6,
    category: "corporate",
    title: "SoluLab Headless CMS Platform",
    company: "SoluLab Pvt. Ltd",
    description:
      "Architected multi-tenant CMS dashboards with React and GraphQL. Shipped 15 reusable page templates with automated image optimization. Cut tenant onboarding cycles from 60 days to 18 days.",
    image: PROJECT_CMS,
    tech: ["React.js", "Headless CMS", "Google Analytics", "Lazy Loading"],
    link: {
      gitHub: "",
      liveLink: "",
      iFrame: "",
    },
    metrics: "99.8% Uptime | 60d → 18d Onboarding | 40% ↑ Growth",
  },
  {
    id: 7,
    category: "personal",
    title: "React Utility Hooks Hub",
    description:
      "Published open-source NPM library containing zero-dependency React hooks. Implemented debounce, throttle, and sync primitives with full TypeScript coverage. Built with Rollup for tree-shaking support.",
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
      "Engineered kitchen order dispatch dashboard using React and Node.js. Integrated live order tracking and third-party delivery webhooks.",
    image: PROJECT_DASHBOARD,
    tech: ["React", "MUI", "Node.js"],
    link: {
      gitHub: "",
      liveLink: "",
      iFrame: "",
    },
  },
];
