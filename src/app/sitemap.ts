import type { MetadataRoute } from "next";
import { absolute } from "@/content/site";
import { caseStudyHref, showcase } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  // Bump when content changes (a fixed date keeps the build static).
  const lastModified = new Date("2026-11-19");
  return [
    { url: absolute("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: absolute("/work"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absolute("/pricing"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absolute("/about"), lastModified, changeFrequency: "yearly", priority: 0.7 },
    ...showcase.map((p) => ({
      url: absolute(caseStudyHref(p)),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
