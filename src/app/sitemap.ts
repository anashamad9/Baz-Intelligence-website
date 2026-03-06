import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://bazintelligence.com").replace(
  /\/+$/,
  "",
);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: siteUrl,
          ar: `${siteUrl}/ar`,
        },
      },
    },
    {
      url: `${siteUrl}/ar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: siteUrl,
          ar: `${siteUrl}/ar`,
        },
      },
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: {
        languages: {
          en: `${siteUrl}/services`,
          ar: `${siteUrl}/ar/services`,
        },
      },
    },
    {
      url: `${siteUrl}/ar/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: {
        languages: {
          en: `${siteUrl}/services`,
          ar: `${siteUrl}/ar/services`,
        },
      },
    },
    {
      url: `${siteUrl}/articles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}/articles`,
          ar: `${siteUrl}/ar/articles`,
        },
      },
    },
    {
      url: `${siteUrl}/ar/articles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}/articles`,
          ar: `${siteUrl}/ar/articles`,
        },
      },
    },
  ];
}
