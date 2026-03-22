import { projectNpmImage } from "@/assets/img";

export const projects = [
  {
    id: 1,
    title: "React Utility Hooks Hub",
    description:
      "It's a NPM package that provides a collection of reusable React hooks for common utility functions, such as debouncing, throttling, and more. It simplifies the development process by offering easy-to-use hooks that enhance performance and functionality in React applications.",
    image: projectNpmImage,
    tech: ["React", "rollup", "JavaScript"],
    link: {
      gitHub:
        "https://github.com/somya-ranjan/NPM/tree/react-utility-hooks-hub",
      liveLink:
        "https://www.npmjs.com/package/react-utility-hooks-hub?activeTab=readme",
      iFrame:
        "https://www.npmjs.com/package/react-utility-hooks-hub?activeTab=readme",
    },
  },
  {
    id: 2,
    isComingSoon: true,
    title: "Cloud Kitchen App",
    description:
      "A comprehensive cloud kitchen management application that streamlines operations, enhances customer experience, and optimizes resource allocation. It provides real-time analytics, order management, and seamless integration with delivery platforms.",
    image: "/project-dashboard.svg",
    tech: ["React", "MUI", "Node.js"],
    link: {
      gitHub: "",
      liveLink: "",
      iFrame: "",
    },
  },
];
