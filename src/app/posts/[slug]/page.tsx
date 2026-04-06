import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/constants";
import { PostHeader } from "@/components/posts/PostHeader";
import { MdxRenderer } from "@/components/mdx/MdxRenderer";
import { Container } from "@/components/layout/Container";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

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

  const url = `${SITE_CONFIG.url}/posts/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      ...(post.cover && { images: [{ url: post.cover }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
    },
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
    },
    url: `${SITE_CONFIG.url}/posts/${slug}`,
    keywords: post.tags,
  };

  return (
    <Container>
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
