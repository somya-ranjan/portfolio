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
      "Contributing to global IAM application serving enterprise compliance. Challenge: Handle millions of access transactions for 50K+ users with strict IAM governance. Solution: Built modular React/JavaScript frontend with shared UI components (Git submodules) under architecture lead guidance. Delivered 65% performance gain through intelligent code-splitting, lazy loading, and API orchestration. Result: Reduced page load from 4.2s → 1.5s, zero downtime. Team: Collaborated with 3-person frontend team + coordinated with backend/compliance while learning architectural patterns.",
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
      "Transformed performance across multiple e-commerce and SaaS products. Challenge: 19% Lighthouse score = high bounce. Solution: Spearheaded Webpack optimization, code-splitting, lazy loading, multithreading strategy. Led UI component library development to standardize across 2 products. Achieved: 70% Lighthouse score (SEO, Accessibility top tier), 3.2s → 1.1s load time, 40% reduction in user bounce. Team: Directed 4-person UI team + mentored junior developers on performance.",
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
      "Built integrated ticket + HRMS system for internal operations. Challenge: Manual processes causing 40% hiring delays + poor task visibility. Solution: Designed React UI for ticket triage, job application processing, candidate onboarding workflow. Used reusable form components + smart state management. Delivered: Reduced development time 25%, cut hiring time by 40%, automated 80% of manual workflows. Impact: Enabled team to onboard 3x faster, improved accuracy. Solo project with full ownership.",
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
      "Engineered premium NFT marketplace for luxury brand collectibles. Challenge: Complex UX for Web3 newcomers; trading volume plateaued. Solution: Redesigned trading flow, checkout experience, portfolio dashboard. Built modular React components (reusable across 15 pages), optimized Redux state for gas estimation + transactions. Results: +40% monthly trading volume, +25% user retention, cut checkout abandonment 35%, 50% faster feature delivery through reusability. Team: Worked with 1 product designer + 2 backend engineers.",
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
      "Built healthcare marketplace connecting patients with doctors, physiotherapists, ambulance services. Challenge: Low appointment conversion + fragmented service discovery. Solution: Designed multi-service booking interface with smart filtering, real-time availability, prescription management. Implemented smart caching + pagination (Handle 500K+ daily searches). Results: +30% appointments booked, +25% user engagement, +35% prescription fulfillment. Scaled to 100K+ active users. Team: Led UI for 6-person product team.",
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
      "Built enterprise headless CMS enabling clients (agencies, publishers) to manage multi-tenant content. Challenge: 60-day deployment cycles, clients facing 6s page loads. Solution: Architected React UI with GraphQL integration, lazy loading, image optimization. Built real-time analytics dashboard + 15+ content templates. Results: 30% faster client onboarding (60d → 18d), 20% speed improvement (6s → 4.8s), 99.8% uptime SLA maintained, 40% YoY user growth (100 → 140 clients). Team: Built full UI layer for 8-person platform team.",
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
