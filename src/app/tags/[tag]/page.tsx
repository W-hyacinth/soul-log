import type { Metadata } from "next";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { Container } from "@/components/layout/Container";
import { PostList } from "@/components/posts/PostList";
import Link from "next/link";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);

  return {
    title: `#${decoded}`,
    description: `${decoded} 태그가 포함된 포스트 목록`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

  return (
    <Container>
      <section className="py-10">
        <div className="mb-6">
          <Link
            href="/"
            className="text-sm text-notion-text-light hover:text-notion-text transition-colors"
          >
            &larr; 전체 포스트
          </Link>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-notion-text mb-6">
          <span className="text-notion-text-light">#</span>{decoded}
        </h1>
        <p className="text-sm text-notion-text-light mb-8">
          {posts.length}개의 포스트
        </p>
        <PostList posts={posts} />
      </section>
    </Container>
  );
}
