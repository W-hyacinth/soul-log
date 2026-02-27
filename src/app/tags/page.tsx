import { getAllTags, getPostsByTag } from "@/lib/posts";
import { Container } from "@/components/layout/Container";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
  description: "모든 태그 목록",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <Container>
      <section className="py-10">
        <h1 className="text-3xl font-bold tracking-tight text-notion-text mb-8">
          Tags
        </h1>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => {
            const count = getPostsByTag(tag).length;
            return (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-notion-bg-gray text-notion-text hover:bg-notion-bg-hover transition-colors text-sm"
              >
                <span>{tag}</span>
                <span className="text-notion-text-light">({count})</span>
              </Link>
            );
          })}
        </div>
        {tags.length === 0 && (
          <p className="py-12 text-center text-notion-text-light">
            태그가 없습니다.
          </p>
        )}
      </section>
    </Container>
  );
}
