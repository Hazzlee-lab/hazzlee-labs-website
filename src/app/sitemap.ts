import type { MetadataRoute } from "next";
import { SERVICE_PAGES } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

const publicRoutes = [
  "",
  ...SERVICE_PAGES.map((service) => `/services/${service.slug}`),
  "/privacy",
];

// Keep this date meaningful: bump it when page content actually changes.
const LAST_CONTENT_UPDATE = new Date("2026-07-02");

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : route.startsWith("/services/") ? 0.8 : 0.5,
  }));
}
