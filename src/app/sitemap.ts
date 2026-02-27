import { MetadataRoute } from "next";
import { getAllPosts, getAllTags, tagToSlug } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;
  const posts = getAllPosts();
  const tags = getAllTags();

  const postEntries = posts.map((post) => ({
    url: `${base}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const tagEntries = tags.map((tag) => ({
    url: `${base}/tags/${tagToSlug(tag)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/tags`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    ...postEntries,
    ...tagEntries,
  ];
}
