import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const publicRoutes = ["", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date();

  return publicRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: updatedAt,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.5,
  }));
}
