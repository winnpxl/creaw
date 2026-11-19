import type { MetadataRoute } from "next";
import { absolute, site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absolute("/sitemap.xml"),
    host: site.url,
  };
}
