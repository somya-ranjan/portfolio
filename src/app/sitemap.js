import { SITE_URL } from "@/lib/seo";

export default function sitemap() {
  const lastModified = new Date("2026-07-05");

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/Somyaranjan_Sethy_Resume.pdf`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
