import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostMeta } from "@/types";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

// 태그 → URL slug 변환 (한글 포함 태그를 URL-safe 슬러그로)
export function tagToSlug(tag: string): string {
  const map: Record<string, string> = {
    "학습": "study",
    "비동기": "async",
    "모든 개발자를 위한 HTTP 웹 기본 지식": "http-web-basics",
  };
  if (map[tag]) return map[tag];
  // 매핑 없는 경우: 소문자 + 공백→하이픈 + 특수문자 제거
  return tag.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
}

// URL slug → 원래 태그명 역조회
export function slugToTag(slug: string, allTags: string[]): string {
  return allTags.find((t) => tagToSlug(t) === slug) ?? slug;
}

function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => /\.mdx?$/.test(file));
}

function parsePost(slug: string): Post | null {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);

  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? "Untitled",
    description: data.description ?? "",
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    tags: data.tags ?? [],
    cover: data.cover ?? null,
    readingTime: Math.ceil(stats.minutes),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const files = getPostFiles();

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      return parsePost(slug);
    })
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts.map(({ content: _, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | null {
  return parsePost(slug);
}

export function getAllSlugs(): string[] {
  return getPostFiles().map((file) => file.replace(/\.mdx?$/, ""));
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}
