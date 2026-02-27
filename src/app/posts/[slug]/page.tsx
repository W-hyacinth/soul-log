import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import { PostHeader } from "@/components/posts/PostHeader";
import { MdxRenderer } from "@/components/mdx/MdxRenderer";
import { Container } from "@/components/layout/Container";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      ...(post.cover && { images: [{ url: post.cover }] }),
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container>
      <article className="py-10">
        <PostHeader
          title={post.title}
          date={post.date}
          readingTime={post.readingTime}
          tags={post.tags}
        />
        <MdxRenderer source={post.content} />
      </article>
    </Container>
  );
}
