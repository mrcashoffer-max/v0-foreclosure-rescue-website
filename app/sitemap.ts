import type { MetadataRoute } from "next"
import { guides } from "@/lib/guides"
import { counties } from "@/lib/counties"
import { stories } from "@/lib/stories"
import { resources } from "@/lib/resources"

const baseUrl = "https://homerescuetx.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/options",
    "/guides",
    "/success-stories",
    "/resources",
    "/glossary",
    "/professionals",
    "/counties",
    "/about",
    "/faq",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }))

  const guideRoutes = guides.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const countyRoutes = counties.map((c) => ({
    url: `${baseUrl}/counties/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const storyRoutes = stories.map((s) => ({
    url: `${baseUrl}/success-stories/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const resourceRoutes = resources.map((r) => ({
    url: `${baseUrl}/resources/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [
    ...staticRoutes,
    ...guideRoutes,
    ...countyRoutes,
    ...storyRoutes,
    ...resourceRoutes,
  ]
}
